import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Upload, ArrowLeft, FileText, Image, X } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Função para validar CPF
const validateCPF = (cpf: string): boolean => {
  const numbers = cpf.replace(/\D/g, "");
  if (numbers.length !== 11) return false;
  if (/^(\d)\1+$/.test(numbers)) return false;
  
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(numbers[i]) * (10 - i);
  }
  let remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(numbers[9])) return false;
  
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(numbers[i]) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(numbers[10])) return false;
  
  return true;
};

// Função para validar CNPJ
const validateCNPJ = (cnpj: string): boolean => {
  const numbers = cnpj.replace(/\D/g, "");
  if (numbers.length !== 14) return false;
  if (/^(\d)\1+$/.test(numbers)) return false;
  
  const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(numbers[i]) * weights1[i];
  }
  let remainder = sum % 11;
  const digit1 = remainder < 2 ? 0 : 11 - remainder;
  if (digit1 !== parseInt(numbers[12])) return false;
  
  sum = 0;
  for (let i = 0; i < 13; i++) {
    sum += parseInt(numbers[i]) * weights2[i];
  }
  remainder = sum % 11;
  const digit2 = remainder < 2 ? 0 : 11 - remainder;
  if (digit2 !== parseInt(numbers[13])) return false;
  
  return true;
};

const planos = [
  { value: "moto", label: "Moto - R$ 55,00/mês" },
  { value: "carro", label: "Carro - R$ 60,00/mês" },
  { value: "combo", label: "Combo - R$ 100,00/mês" },
  { value: "rastreamento-garantido", label: "Rastreamento Garantido" },
];

const faixasValorVeiculo = [
  { value: "ate-10000", label: "Veículos até R$ 10.000,00 - R$ 90,00/mês" },
  { value: "ate-20000", label: "Veículos até R$ 20.000,00 - R$ 100,00/mês" },
  { value: "ate-30000", label: "Veículos até R$ 30.000,00 - R$ 110,00/mês" },
  { value: "ate-40000", label: "Veículos até R$ 40.000,00 - R$ 120,00/mês" },
];

const formSchema = z.object({
  plano: z.string().min(1, "Selecione um plano"),
  faixaValorVeiculo: z.string().optional(),
  nomeCompleto: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("Email inválido"),
  telefone: z.string().min(14, "Telefone inválido"),
  nomeContatoEmergencia: z.string().min(3, "Nome do contato é obrigatório"),
  contatoEmergencia: z.string().min(14, "Contato de emergência inválido"),
  vinculoTitular: z.string().min(1, "Selecione o vínculo com o titular"),
  cpfCnpj: z.string().refine((val) => {
    const numbers = val.replace(/\D/g, "");
    if (numbers.length === 11) return validateCPF(val);
    if (numbers.length === 14) return validateCNPJ(val);
    return false;
  }, "CPF ou CNPJ inválido"),
  rg: z.string().min(5, "RG inválido"),
  dataNascimento: z.string().min(1, "Data de nascimento é obrigatória"),
  nomeMae: z.string().min(3, "Nome da mãe deve ter pelo menos 3 caracteres"),
  nomePai: z.string().optional(),
  cep: z.string().min(9, "CEP inválido"),
  endereco: z.string().min(5, "Endereço inválido"),
  numeroCasa: z.string().min(1, "Número é obrigatório"),
  bairro: z.string().min(2, "Bairro inválido"),
  complemento: z.string().optional(),
  cidade: z.string().min(2, "Cidade inválida"),
  estado: z.string().min(2, "Estado inválido"),
  diaVencimento: z.string().min(1, "Selecione o dia de vencimento"),
  vendedor: z.string().min(1, "Selecione o vendedor"),
  veioPorIndicacao: z.enum(["sim", "nao"], { required_error: "Selecione uma opção" }),
  quemIndicou: z.string().optional(),
  aceiteLgpd: z.boolean().refine((val) => val === true, {
    message: "Você deve aceitar os termos da LGPD",
  }),
}).refine((data) => {
  if (data.veioPorIndicacao === "sim" && (!data.quemIndicou || data.quemIndicou.trim().length < 3)) {
    return false;
  }
  return true;
}, {
  message: "Informe quem indicou (mínimo 3 caracteres)",
  path: ["quemIndicou"],
}).refine((data) => {
  if (data.plano === "rastreamento-garantido" && !data.faixaValorVeiculo) {
    return false;
  }
  return true;
}, {
  message: "Selecione a faixa de valor do veículo",
  path: ["faixaValorVeiculo"],
});

type FormData = z.infer<typeof formSchema>;

const PreCadastro = () => {
  const { toast } = useToast();
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [buscandoCep, setBuscandoCep] = useState(false);
  const [enviando, setEnviando] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      plano: "",
      faixaValorVeiculo: "",
      nomeCompleto: "",
      email: "",
      telefone: "",
      nomeContatoEmergencia: "",
      contatoEmergencia: "",
      vinculoTitular: "",
      cpfCnpj: "",
      rg: "",
      dataNascimento: "",
      nomeMae: "",
      nomePai: "",
      cep: "",
      endereco: "",
      numeroCasa: "",
      bairro: "",
      complemento: "",
      cidade: "",
      estado: "",
      diaVencimento: "",
      vendedor: "",
      veioPorIndicacao: undefined,
      quemIndicou: "",
      aceiteLgpd: false,
    },
  });

  const veioPorIndicacao = form.watch("veioPorIndicacao");
  const planoSelecionado = form.watch("plano");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = ["application/pdf", "image/jpeg", "image/jpg", "image/png"];
      if (!validTypes.includes(file.type)) {
        toast({
          title: "Arquivo inválido",
          description: "Por favor, envie apenas arquivos PDF ou JPEG/PNG.",
          variant: "destructive",
        });
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Arquivo muito grande",
          description: "O arquivo deve ter no máximo 5MB.",
          variant: "destructive",
        });
        return;
      }
      setArquivo(file);
    }
  };

  const removeFile = () => {
    setArquivo(null);
  };

  const onSubmit = async (data: FormData) => {
    if (!arquivo) {
      toast({
        title: "Arquivo obrigatório",
        description: "Por favor, anexe um documento (PDF ou imagem).",
        variant: "destructive",
      });
      return;
    }

    setEnviando(true);

    try {
      // Convert file to base64
      const fileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            const result = reader.result as string;
            // Remove the data URL prefix (e.g., "data:application/pdf;base64,")
            const base64 = result.split(',')[1];
            resolve(base64);
          };
          reader.onerror = reject;
        });
      };

      const arquivoBase64 = await fileToBase64(arquivo);

      const payload = {
        ...data,
        arquivo: {
          name: arquivo.name,
          type: arquivo.type,
          data: arquivoBase64,
        },
      };

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 seconds timeout

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-pre-cadastro`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "apikey": import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          },
          body: JSON.stringify(payload),
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);

      let result;
      try {
        result = await response.json();
      } catch {
        throw new Error("Erro de comunicação com o servidor. Tente novamente.");
      }

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Erro ao enviar pré-cadastro");
      }

      toast({
        title: "Pré-cadastro enviado!",
        description: "Entraremos em contato em breve para confirmar seus dados.",
      });

      form.reset();
      setArquivo(null);
    } catch (error) {
      console.error("Error submitting form:", error);
      let errorMessage = "Tente novamente mais tarde.";
      if (error instanceof Error) {
        if (error.name === "AbortError") {
          errorMessage = "A conexão expirou. Verifique sua internet e tente novamente.";
        } else {
          errorMessage = error.message;
        }
      }
      toast({
        title: "Erro ao enviar",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setEnviando(false);
    }
  };

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    if (digits.length <= 2) return digits.length ? `(${digits}` : "";
    if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  };

  const formatCpfCnpj = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 11) {
      // CPF: 000.000.000-00
      if (numbers.length <= 3) return numbers;
      if (numbers.length <= 6) return `${numbers.slice(0, 3)}.${numbers.slice(3)}`;
      if (numbers.length <= 9) return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6)}`;
      return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9)}`;
    }
    // CNPJ: 00.000.000/0000-00
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 5) return `${numbers.slice(0, 2)}.${numbers.slice(2)}`;
    if (numbers.length <= 8) return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5)}`;
    if (numbers.length <= 12) return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5, 8)}/${numbers.slice(8)}`;
    return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5, 8)}/${numbers.slice(8, 12)}-${numbers.slice(12, 14)}`;
  };

  const formatCep = (value: string) => {
    const numbers = value.replace(/\D/g, "").slice(0, 8);
    if (numbers.length <= 5) return numbers;
    return `${numbers.slice(0, 5)}-${numbers.slice(5)}`;
  };

  const buscarCep = async (cep: string) => {
    const numbers = cep.replace(/\D/g, "");
    if (numbers.length !== 8) return;

    setBuscandoCep(true);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${numbers}/json/`);
      const data = await response.json();

      if (data.erro) {
        toast({
          title: "CEP não encontrado",
          description: "Verifique o CEP digitado e tente novamente.",
          variant: "destructive",
        });
        return;
      }

      form.setValue("endereco", data.logradouro || "");
      form.setValue("bairro", data.bairro || "");
      form.setValue("cidade", data.localidade || "");
      form.setValue("estado", data.uf || "");

      toast({
        title: "Endereço encontrado!",
        description: "Os campos foram preenchidos automaticamente.",
      });
    } catch (error) {
      toast({
        title: "Erro ao buscar CEP",
        description: "Não foi possível buscar o endereço. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setBuscandoCep(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar para o início
            </Link>

            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Pré-<span className="text-primary">Cadastro</span>
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Preencha o formulário abaixo para iniciar seu cadastro. Nossa equipe
                entrará em contato para finalizar o processo.
              </p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 bg-card border border-border rounded-2xl p-6 md:p-8"
              >
                {/* Seleção de Plano */}
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-foreground border-b border-border pb-2">
                    Escolha seu Plano
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="plano"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Plano *</FormLabel>
                          <Select 
                            onValueChange={(value) => {
                              field.onChange(value);
                              if (value !== "rastreamento-garantido") {
                                form.setValue("faixaValorVeiculo", "");
                              }
                            }} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione o plano desejado" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {planos.map((plano) => (
                                <SelectItem key={plano.value} value={plano.value}>
                                  {plano.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {planoSelecionado === "rastreamento-garantido" && (
                      <FormField
                        control={form.control}
                        name="faixaValorVeiculo"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Faixa de Valor do Veículo *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecione a faixa de valor" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {faixasValorVeiculo.map((faixa) => (
                                  <SelectItem key={faixa.value} value={faixa.value}>
                                    {faixa.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </div>

                  {planoSelecionado === "rastreamento-garantido" && (
                    <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
                      <p className="text-sm text-foreground">
                        <strong className="text-primary">Taxa de adesão única:</strong> R$ 150,00 (inclui instalação e ativação do programa garantido)
                      </p>
                    </div>
                  )}
                </div>

                {/* Dados Pessoais */}
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-foreground border-b border-border pb-2">
                    Dados Pessoais
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="nomeCompleto"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Nome Completo *</FormLabel>
                          <FormControl>
                            <Input placeholder="Digite seu nome completo" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email *</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="seu@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="telefone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telefone *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="(00) 00000-0000"
                              {...field}
                              onChange={(e) => field.onChange(formatPhone(e.target.value))}
                              maxLength={15}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="nomeContatoEmergencia"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome do Contato de Emergência *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Nome completo"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="contatoEmergencia"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telefone de Emergência *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="(00) 00000-0000"
                              {...field}
                              onChange={(e) => field.onChange(formatPhone(e.target.value))}
                              maxLength={15}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="vinculoTitular"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Vínculo com Titular *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione o vínculo" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="marido">Marido</SelectItem>
                              <SelectItem value="esposa">Esposa</SelectItem>
                              <SelectItem value="pai">Pai</SelectItem>
                              <SelectItem value="mae">Mãe</SelectItem>
                              <SelectItem value="filho">Filho(a)</SelectItem>
                              <SelectItem value="outros">Outros</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="cpfCnpj"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CPF ou CNPJ *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="000.000.000-00"
                              {...field}
                              onChange={(e) => field.onChange(formatCpfCnpj(e.target.value))}
                              maxLength={18}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="rg"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>RG *</FormLabel>
                          <FormControl>
                            <Input placeholder="Digite seu RG" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="dataNascimento"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Data de Nascimento *</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="nomeMae"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome da Mãe *</FormLabel>
                          <FormControl>
                            <Input placeholder="Nome completo da mãe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="nomePai"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome do Pai</FormLabel>
                          <FormControl>
                            <Input placeholder="Nome completo do pai (opcional)" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Endereço */}
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-foreground border-b border-border pb-2">
                    Endereço
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="cep"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CEP *</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                placeholder="00000-000"
                                {...field}
                                onChange={(e) => {
                                  const formatted = formatCep(e.target.value);
                                  field.onChange(formatted);
                                  if (formatted.replace(/\D/g, "").length === 8) {
                                    buscarCep(formatted);
                                  }
                                }}
                                maxLength={9}
                                disabled={buscandoCep}
                              />
                              {buscandoCep && (
                                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                                </div>
                              )}
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="endereco"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Endereço *</FormLabel>
                          <FormControl>
                            <Input placeholder="Rua, Avenida, etc." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="numeroCasa"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Número *</FormLabel>
                          <FormControl>
                            <Input placeholder="Nº" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="bairro"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bairro *</FormLabel>
                          <FormControl>
                            <Input placeholder="Bairro" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="complemento"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Complemento</FormLabel>
                          <FormControl>
                            <Input placeholder="Apto, Bloco, etc. (opcional)" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="cidade"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cidade *</FormLabel>
                          <FormControl>
                            <Input placeholder="Cidade" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="estado"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Estado *</FormLabel>
                          <FormControl>
                            <Input placeholder="UF" {...field} maxLength={2} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Anexo e Vencimento */}
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-foreground border-b border-border pb-2">
                    Documentos e Pagamento
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Anexar Documento do Veículo (PDF ou Imagem) *</Label>
                      <div className="relative">
                        {!arquivo ? (
                          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-colors bg-background">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                              <p className="text-sm text-muted-foreground">
                                <span className="font-semibold text-primary">Clique para enviar</span> ou arraste
                              </p>
                              <p className="text-xs text-muted-foreground">PDF, JPEG ou PNG (máx. 5MB)</p>
                            </div>
                            <input
                              type="file"
                              className="hidden"
                              accept=".pdf,.jpg,.jpeg,.png"
                              onChange={handleFileChange}
                            />
                          </label>
                        ) : (
                          <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-background">
                            <div className="flex items-center gap-3">
                              {arquivo.type === "application/pdf" ? (
                                <FileText className="w-8 h-8 text-primary" />
                              ) : (
                                <Image className="w-8 h-8 text-primary" />
                              )}
                              <div>
                                <p className="text-sm font-medium text-foreground truncate max-w-[200px]">
                                  {arquivo.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {(arquivo.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={removeFile}
                              className="p-1 hover:bg-muted rounded-full transition-colors"
                            >
                              <X className="w-5 h-5 text-muted-foreground hover:text-destructive" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    <FormField
                      control={form.control}
                      name="diaVencimento"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Dia de Vencimento *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione o dia de vencimento" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="05">Dia 05</SelectItem>
                              <SelectItem value="10">Dia 10</SelectItem>
                              <SelectItem value="20">Dia 20</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="vendedor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Vendedor *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione o vendedor" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Alex Coutinho">Alex Coutinho</SelectItem>
                              <SelectItem value="Tiago de Aquino">Tiago de Aquino</SelectItem>
                              <SelectItem value="Wenicios Santos">Wenicios Santos</SelectItem>
                              <SelectItem value="Ingridy Silva">Ingridy Silva</SelectItem>
                              <SelectItem value="Luiz Felipe">Luiz Felipe</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Indicação */}
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-foreground border-b border-border pb-2">
                    Indicação
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="veioPorIndicacao"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Você veio por indicação? *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione uma opção" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="sim">Sim</SelectItem>
                              <SelectItem value="nao">Não</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {veioPorIndicacao === "sim" && (
                      <FormField
                        control={form.control}
                        name="quemIndicou"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Quem indicou? *</FormLabel>
                            <FormControl>
                              <Input placeholder="Nome completo de quem indicou" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </div>
                </div>

                {/* Termo LGPD */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-foreground border-b border-border pb-2">
                    Termos e Condições
                  </h2>
                  <FormField
                    control={form.control}
                    name="aceiteLgpd"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-lg border border-border p-4 bg-background">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm font-normal cursor-pointer">
                            Eu li e concordo com a{" "}
                            <span className="text-primary font-semibold">
                              Política de Privacidade
                            </span>{" "}
                            e autorizo a Tecnorastro a coletar, armazenar e processar
                            meus dados pessoais conforme a Lei Geral de Proteção de
                            Dados (LGPD - Lei nº 13.709/2018). Autorizo também o
                            compartilhamento dos meus dados com parceiros e
                            prestadores de serviços necessários para a execução do
                            serviço de rastreamento veicular.
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" variant="hero" size="lg" className="w-full" disabled={enviando}>
                  {enviando ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Enviando...
                    </span>
                  ) : (
                    "Enviar Pré-Cadastro"
                  )}
                </Button>
              </form>
            </Form>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PreCadastro;
