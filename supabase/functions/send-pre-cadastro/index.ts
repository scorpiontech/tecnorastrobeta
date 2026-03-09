import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const escapeHtml = (text: string): string => {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

interface ArquivoData {
  name: string;
  type: string;
  data: string;
}

interface PreCadastroData {
  plano: string;
  faixaValorVeiculo?: string;
  nomeCompleto: string;
  email: string;
  telefone: string;
  nomeContatoEmergencia: string;
  contatoEmergencia: string;
  vinculoTitular: string;
  cpfCnpj: string;
  rg: string;
  dataNascimento: string;
  nomeMae: string;
  nomePai?: string;
  cep: string;
  endereco: string;
  numeroCasa: string;
  bairro: string;
  complemento?: string;
  cidade: string;
  estado: string;
  diaVencimento: string;
  vendedor: string;
  veioPorIndicacao: string;
  quemIndicou?: string;
  // Support both single (legacy) and multiple files
  arquivo?: ArquivoData;
  arquivos?: ArquivoData[];
}

const formatVinculo = (vinculo: string): string => {
  const vinculos: Record<string, string> = {
    marido: "Marido", esposa: "Esposa", pai: "Pai",
    mae: "Mãe", filho: "Filho(a)", outros: "Outros",
  };
  return vinculos[vinculo] || vinculo;
};

const formatPlano = (plano: string): string => {
  const planos: Record<string, string> = {
    moto: "Moto - R$ 55,00/mês", carro: "Carro - R$ 60,00/mês",
    combo: "Combo - R$ 100,00/mês", "rastreamento-garantido": "Rastreamento Garantido",
  };
  return planos[plano] || plano;
};

const formatFaixaValor = (faixa: string): string => {
  const faixas: Record<string, string> = {
    "ate-10000": "Veículos até R$ 10.000,00 - R$ 90,00/mês",
    "ate-20000": "Veículos até R$ 20.000,00 - R$ 100,00/mês",
    "ate-30000": "Veículos até R$ 30.000,00 - R$ 110,00/mês",
    "ate-40000": "Veículos até R$ 40.000,00 - R$ 120,00/mês",
  };
  return faixas[faixa] || faixa;
};

const buildEmailHtml = (data: PreCadastroData, anexoInfo: string): string => {
  const planoInfo = data.plano === "rastreamento-garantido" && data.faixaValorVeiculo
    ? `<tr><td style="padding: 8px; border-bottom: 1px solid #333; color: #888;">Faixa de Valor do Veículo:</td><td style="padding: 8px; border-bottom: 1px solid #333;">${formatFaixaValor(data.faixaValorVeiculo)}</td></tr>`
    : "";
  const taxaAdesao = data.plano === "rastreamento-garantido"
    ? `<tr><td style="padding: 8px; border-bottom: 1px solid #333; color: #888;">Taxa de Adesão:</td><td style="padding: 8px; border-bottom: 1px solid #333;">R$ 150,00</td></tr>`
    : "";
  const indicacaoInfo = data.veioPorIndicacao === "sim" && data.quemIndicou
    ? `<tr><td style="padding: 8px; border-bottom: 1px solid #333; color: #888;">Quem indicou:</td><td style="padding: 8px; border-bottom: 1px solid #333;">${escapeHtml(data.quemIndicou)}</td></tr>`
    : "";

  return [
    `<html><body style="font-family: Arial, sans-serif; background-color: #0a0a0a; color: #ffffff; padding: 20px;">`,
    `<div style="max-width: 600px; margin: 0 auto; background-color: #1a1a1a; border-radius: 10px; padding: 30px; border: 1px solid #d4af37;">`,
    `<h1 style="color: #d4af37; text-align: center; border-bottom: 2px solid #d4af37; padding-bottom: 15px;">Novo Pré-Cadastro - Tecnorastro</h1>`,
    `<h2 style="color: #d4af37; margin-top: 25px;">Plano Escolhido</h2>`,
    `<table style="width: 100%; border-collapse: collapse;">`,
    `<tr><td style="padding: 8px; border-bottom: 1px solid #333; color: #888;">Plano:</td><td style="padding: 8px; border-bottom: 1px solid #333; font-weight: bold; color: #d4af37;">${formatPlano(data.plano)}</td></tr>`,
    planoInfo, taxaAdesao,
    `</table>`,
    `<h2 style="color: #d4af37; margin-top: 25px;">Dados Pessoais</h2>`,
    `<table style="width: 100%; border-collapse: collapse;">`,
    `<tr><td style="padding: 8px; border-bottom: 1px solid #333; color: #888;">Nome Completo:</td><td style="padding: 8px; border-bottom: 1px solid #333;">${escapeHtml(data.nomeCompleto)}</td></tr>`,
    `<tr><td style="padding: 8px; border-bottom: 1px solid #333; color: #888;">Email:</td><td style="padding: 8px; border-bottom: 1px solid #333;">${escapeHtml(data.email)}</td></tr>`,
    `<tr><td style="padding: 8px; border-bottom: 1px solid #333; color: #888;">Telefone:</td><td style="padding: 8px; border-bottom: 1px solid #333;">${escapeHtml(data.telefone)}</td></tr>`,
    `<tr><td style="padding: 8px; border-bottom: 1px solid #333; color: #888;">CPF/CNPJ:</td><td style="padding: 8px; border-bottom: 1px solid #333;">${escapeHtml(data.cpfCnpj)}</td></tr>`,
    `<tr><td style="padding: 8px; border-bottom: 1px solid #333; color: #888;">RG:</td><td style="padding: 8px; border-bottom: 1px solid #333;">${escapeHtml(data.rg)}</td></tr>`,
    `<tr><td style="padding: 8px; border-bottom: 1px solid #333; color: #888;">Data de Nascimento:</td><td style="padding: 8px; border-bottom: 1px solid #333;">${escapeHtml(data.dataNascimento)}</td></tr>`,
    `<tr><td style="padding: 8px; border-bottom: 1px solid #333; color: #888;">Nome da Mãe:</td><td style="padding: 8px; border-bottom: 1px solid #333;">${escapeHtml(data.nomeMae)}</td></tr>`,
    `<tr><td style="padding: 8px; border-bottom: 1px solid #333; color: #888;">Nome do Pai:</td><td style="padding: 8px; border-bottom: 1px solid #333;">${data.nomePai ? escapeHtml(data.nomePai) : "Não informado"}</td></tr>`,
    `</table>`,
    `<h2 style="color: #d4af37; margin-top: 25px;">Contato de Emergência</h2>`,
    `<table style="width: 100%; border-collapse: collapse;">`,
    `<tr><td style="padding: 8px; border-bottom: 1px solid #333; color: #888;">Nome:</td><td style="padding: 8px; border-bottom: 1px solid #333;">${escapeHtml(data.nomeContatoEmergencia)}</td></tr>`,
    `<tr><td style="padding: 8px; border-bottom: 1px solid #333; color: #888;">Telefone:</td><td style="padding: 8px; border-bottom: 1px solid #333;">${escapeHtml(data.contatoEmergencia)}</td></tr>`,
    `<tr><td style="padding: 8px; border-bottom: 1px solid #333; color: #888;">Vínculo com Titular:</td><td style="padding: 8px; border-bottom: 1px solid #333;">${formatVinculo(data.vinculoTitular)}</td></tr>`,
    `</table>`,
    `<h2 style="color: #d4af37; margin-top: 25px;">Endereço</h2>`,
    `<table style="width: 100%; border-collapse: collapse;">`,
    `<tr><td style="padding: 8px; border-bottom: 1px solid #333; color: #888;">CEP:</td><td style="padding: 8px; border-bottom: 1px solid #333;">${escapeHtml(data.cep)}</td></tr>`,
    `<tr><td style="padding: 8px; border-bottom: 1px solid #333; color: #888;">Endereço:</td><td style="padding: 8px; border-bottom: 1px solid #333;">${escapeHtml(data.endereco)}, ${escapeHtml(data.numeroCasa)}</td></tr>`,
    `<tr><td style="padding: 8px; border-bottom: 1px solid #333; color: #888;">Bairro:</td><td style="padding: 8px; border-bottom: 1px solid #333;">${escapeHtml(data.bairro)}</td></tr>`,
    `<tr><td style="padding: 8px; border-bottom: 1px solid #333; color: #888;">Complemento:</td><td style="padding: 8px; border-bottom: 1px solid #333;">${data.complemento ? escapeHtml(data.complemento) : "Não informado"}</td></tr>`,
    `<tr><td style="padding: 8px; border-bottom: 1px solid #333; color: #888;">Cidade/Estado:</td><td style="padding: 8px; border-bottom: 1px solid #333;">${escapeHtml(data.cidade)} - ${escapeHtml(data.estado)}</td></tr>`,
    `</table>`,
    `<h2 style="color: #d4af37; margin-top: 25px;">Informações de Pagamento e Vendas</h2>`,
    `<table style="width: 100%; border-collapse: collapse;">`,
    `<tr><td style="padding: 8px; border-bottom: 1px solid #333; color: #888;">Dia de Vencimento:</td><td style="padding: 8px; border-bottom: 1px solid #333;">Dia ${escapeHtml(data.diaVencimento)}</td></tr>`,
    `<tr><td style="padding: 8px; border-bottom: 1px solid #333; color: #888;">Vendedor:</td><td style="padding: 8px; border-bottom: 1px solid #333;">${escapeHtml(data.vendedor)}</td></tr>`,
    `</table>`,
    `<h2 style="color: #d4af37; margin-top: 25px;">Indicação</h2>`,
    `<table style="width: 100%; border-collapse: collapse;">`,
    `<tr><td style="padding: 8px; border-bottom: 1px solid #333; color: #888;">Veio por indicação:</td><td style="padding: 8px; border-bottom: 1px solid #333;">${data.veioPorIndicacao === "sim" ? "Sim" : "Não"}</td></tr>`,
    indicacaoInfo,
    `</table>`,
    `<p style="margin-top: 30px; padding: 15px; background-color: #2a2a2a; border-radius: 5px; font-size: 12px; color: #888;">Este pré-cadastro foi enviado através do site da Tecnorastro. O cliente aceitou os termos da LGPD.${anexoInfo}</p>`,
    `</div></body></html>`
  ].join("");
};

const uploadFile = async (
  supabase: ReturnType<typeof createClient>,
  arquivo: ArquivoData
): Promise<string> => {
  try {
    const binaryData = Uint8Array.from(atob(arquivo.data), c => c.charCodeAt(0));
    const timestamp = Date.now();
    const safeName = arquivo.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const filePath = `${timestamp}_${safeName}`;

    const { error: uploadError } = await supabase.storage
      .from("pre-cadastro-docs")
      .upload(filePath, binaryData, {
        contentType: arquivo.type,
        upsert: false,
      });

    if (uploadError) {
      console.error("Storage upload error:", uploadError);
      return `<br>• ${escapeHtml(arquivo.name)} (falha no upload)`;
    }

    const { data: urlData } = await supabase.storage
      .from("pre-cadastro-docs")
      .createSignedUrl(filePath, 60 * 60 * 24 * 30); // 30 days

    if (urlData?.signedUrl) {
      return `<br>• <a href="${urlData.signedUrl}" style="color: #d4af37;">${escapeHtml(arquivo.name)}</a>`;
    }
    return `<br>• ${escapeHtml(arquivo.name)} (salvo: ${escapeHtml(filePath)})`;
  } catch (err) {
    console.error("Upload error for", arquivo.name, err);
    return `<br>• ${escapeHtml(arquivo.name)} (erro ao salvar)`;
  }
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: PreCadastroData = await req.json();

    let anexoInfo = "";

    // Normalize: support both single arquivo (legacy) and multiple arquivos
    const files: ArquivoData[] = [];
    if (data.arquivos && data.arquivos.length > 0) {
      files.push(...data.arquivos);
    } else if (data.arquivo) {
      files.push(data.arquivo);
    }

    if (files.length > 0) {
      const supabase = createClient(
        Deno.env.get("SUPABASE_URL")!,
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
      );

      const results = await Promise.all(files.map(f => uploadFile(supabase, f)));
      anexoInfo = `<br><br><strong>Documentos anexados (${files.length}):</strong>${results.join("")}`;
    }

    // Free memory
    delete data.arquivo;
    delete data.arquivos;

    const htmlContent = buildEmailHtml(data, anexoInfo);

    const client = new SMTPClient({
      connection: {
        hostname: Deno.env.get("SMTP_HOST")!,
        port: parseInt(Deno.env.get("SMTP_PORT")!, 10),
        tls: true,
        auth: {
          username: Deno.env.get("SMTP_USER")!,
          password: Deno.env.get("SMTP_PASSWORD")!,
        },
      },
    });

    await client.send({
      from: Deno.env.get("SMTP_USER")!,
      to: "contato@tecnorastro.net.br",
      subject: `Novo Pré-Cadastro: ${escapeHtml(data.nomeCompleto)}`,
      html: htmlContent,
    });

    await client.close();

    console.log("Email sent successfully to contato@tecnorastro.net.br");

    return new Response(
      JSON.stringify({ success: true, message: "Pré-cadastro enviado com sucesso!" }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: unknown) {
    console.error("Error sending email:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
