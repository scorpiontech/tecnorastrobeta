import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";
import type { Attachment } from "https://deno.land/x/denomailer@1.6.0/config/mail/attachments.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface PreCadastroData {
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
  arquivo?: {
    name: string;
    type: string;
    data: string; // base64
  };
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: PreCadastroData = await req.json();

    const formatVinculo = (vinculo: string): string => {
      const vinculos: Record<string, string> = {
        marido: "Marido",
        esposa: "Esposa",
        pai: "Pai",
        mae: "Mãe",
        filho: "Filho(a)",
        outros: "Outros",
      };
      return vinculos[vinculo] || vinculo;
    };

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

    const htmlContent = `
      <html>
        <body style="font-family: Arial, sans-serif; background-color: #0a0a0a; color: #ffffff; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #1a1a1a; border-radius: 10px; padding: 30px; border: 1px solid #d4af37;">
            <h1 style="color: #d4af37; text-align: center; border-bottom: 2px solid #d4af37; padding-bottom: 15px;">
              Novo Pré-Cadastro - Tecnorastro
            </h1>
            
            <h2 style="color: #d4af37; margin-top: 25px;">Dados Pessoais</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px; border-bottom: 1px solid #333; color: #888;">Nome Completo:</td><td style="padding: 8px; border-bottom: 1px solid #333;">${data.nomeCompleto}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #333; color: #888;">Email:</td><td style="padding: 8px; border-bottom: 1px solid #333;">${data.email}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #333; color: #888;">Telefone:</td><td style="padding: 8px; border-bottom: 1px solid #333;">${data.telefone}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #333; color: #888;">CPF/CNPJ:</td><td style="padding: 8px; border-bottom: 1px solid #333;">${data.cpfCnpj}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #333; color: #888;">RG:</td><td style="padding: 8px; border-bottom: 1px solid #333;">${data.rg}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #333; color: #888;">Data de Nascimento:</td><td style="padding: 8px; border-bottom: 1px solid #333;">${data.dataNascimento}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #333; color: #888;">Nome da Mãe:</td><td style="padding: 8px; border-bottom: 1px solid #333;">${data.nomeMae}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #333; color: #888;">Nome do Pai:</td><td style="padding: 8px; border-bottom: 1px solid #333;">${data.nomePai || "Não informado"}</td></tr>
            </table>
            
            <h2 style="color: #d4af37; margin-top: 25px;">Contato de Emergência</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px; border-bottom: 1px solid #333; color: #888;">Nome:</td><td style="padding: 8px; border-bottom: 1px solid #333;">${data.nomeContatoEmergencia}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #333; color: #888;">Telefone:</td><td style="padding: 8px; border-bottom: 1px solid #333;">${data.contatoEmergencia}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #333; color: #888;">Vínculo com Titular:</td><td style="padding: 8px; border-bottom: 1px solid #333;">${formatVinculo(data.vinculoTitular)}</td></tr>
            </table>
            
            <h2 style="color: #d4af37; margin-top: 25px;">Endereço</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px; border-bottom: 1px solid #333; color: #888;">CEP:</td><td style="padding: 8px; border-bottom: 1px solid #333;">${data.cep}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #333; color: #888;">Endereço:</td><td style="padding: 8px; border-bottom: 1px solid #333;">${data.endereco}, ${data.numeroCasa}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #333; color: #888;">Bairro:</td><td style="padding: 8px; border-bottom: 1px solid #333;">${data.bairro}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #333; color: #888;">Complemento:</td><td style="padding: 8px; border-bottom: 1px solid #333;">${data.complemento || "Não informado"}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #333; color: #888;">Cidade/Estado:</td><td style="padding: 8px; border-bottom: 1px solid #333;">${data.cidade} - ${data.estado}</td></tr>
            </table>
            
            <h2 style="color: #d4af37; margin-top: 25px;">Informações de Pagamento</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px; border-bottom: 1px solid #333; color: #888;">Dia de Vencimento:</td><td style="padding: 8px; border-bottom: 1px solid #333;">Dia ${data.diaVencimento}</td></tr>
            </table>
            
            <p style="margin-top: 30px; padding: 15px; background-color: #2a2a2a; border-radius: 5px; font-size: 12px; color: #888;">
              Este pré-cadastro foi enviado através do site da Tecnorastro. O cliente aceitou os termos da LGPD.
              ${data.arquivo ? `<br><br><strong>Documento anexado:</strong> ${data.arquivo.name}` : ""}
            </p>
          </div>
        </body>
      </html>
    `;

    const attachments: Attachment[] = [];
    
    // Add attachment if provided
    if (data.arquivo) {
      const binaryData = Uint8Array.from(atob(data.arquivo.data), c => c.charCodeAt(0));
      attachments.push({
        filename: data.arquivo.name,
        content: binaryData,
        contentType: data.arquivo.type,
        encoding: "binary",
      });
    }

    await client.send({
      from: Deno.env.get("SMTP_USER")!,
      to: "contato@tecnorastro.net.br",
      subject: `Novo Pré-Cadastro: ${data.nomeCompleto}`,
      html: htmlContent,
      attachments: attachments.length > 0 ? attachments : undefined,
    });
    
    await client.close();

    console.log("Email sent successfully to contato@tecnorastro.net.br");

    return new Response(
      JSON.stringify({ success: true, message: "Pré-cadastro enviado com sucesso!" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: unknown) {
    console.error("Error sending email:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
