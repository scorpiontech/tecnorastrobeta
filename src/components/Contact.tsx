import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Send, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
const contactSchema = z.object({
  name: z.string().trim().min(3, "Nome deve ter pelo menos 3 caracteres").max(100, "Nome muito longo"),
  email: z.string().trim().email("E-mail inválido").max(255, "E-mail muito longo"),
  phone: z.string().min(14, "Telefone inválido").max(15, "Telefone inválido"),
  message: z.string().trim().min(10, "Mensagem deve ter pelo menos 10 caracteres").max(1000, "Mensagem muito longa")
});
type FormErrors = Partial<Record<keyof z.infer<typeof contactSchema>, string>>;
const Contact = () => {
  const {
    toast
  } = useToast();
  const [enviando, setEnviando] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    if (digits.length <= 2) return digits.length ? `(${digits}` : "";
    if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  };
  const validateField = useCallback((field: keyof typeof formData, value: string) => {
    try {
      contactSchema.shape[field].parse(value);
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    } catch (err) {
      if (err instanceof z.ZodError) {
        setErrors(prev => ({
          ...prev,
          [field]: err.errors[0]?.message
        }));
      }
    }
  }, []);
  const handleChange = (field: keyof typeof formData, value: string) => {
    const newValue = field === "phone" ? formatPhone(value) : value;
    setFormData(prev => ({
      ...prev,
      [field]: newValue
    }));
    if (touched[field]) {
      validateField(field, newValue);
    }
  };
  const handleBlur = (field: keyof typeof formData) => {
    setTouched(prev => ({
      ...prev,
      [field]: true
    }));
    validateField(field, formData[field]);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: FormErrors = {};
      result.error.errors.forEach(err => {
        const field = err.path[0] as keyof FormErrors;
        if (!fieldErrors[field]) fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      setTouched({
        name: true,
        email: true,
        phone: true,
        message: true
      });
      return;
    }
    setEnviando(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`
        },
        body: JSON.stringify(formData)
      });
      const result = await response.json();
      if (result.success) {
        toast({
          title: "Mensagem enviada!",
          description: "Entraremos em contato em breve."
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: ""
        });
        setErrors({});
        setTouched({});
      } else {
        throw new Error(result.error || "Erro ao enviar mensagem");
      }
    } catch (error) {
      console.error("Erro ao enviar:", error);
      toast({
        title: "Erro ao enviar",
        description: "Tente novamente mais tarde.",
        variant: "destructive"
      });
    } finally {
      setEnviando(false);
    }
  };
  return <section id="contato" className="py-24 relative">
      <div className="absolute inset-0 bg-card" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.6
      }} className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Contato
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            Fale{" "}
            <span className="text-gradient-gold">Conosco</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Estamos prontos para proteger seu veículo. Entre em contato e solicite um orçamento.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div initial={{
          opacity: 0,
          x: -30
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }}>
            <h3 className="text-2xl font-bold mb-8">Informações de Contato</h3>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Endereço</h4>
                  <p className="text-muted-foreground">Travessa Primeiro de Maio, 1723 - Nova Olinda
Castanhal - PA, 68743-040<br />
                    São Paulo - SP, 01000-000
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Telefone</h4>
                  <p className="text-muted-foreground">(91) 99146-5654
(91) 99146-5654 (WhatsApp)<br />
                    (11) 99999-9999 (WhatsApp)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">E-mail</h4>
                  <p className="text-muted-foreground">
                    contato@tecnorastro.net.br<br />
                    suporte@tecnorastro.net.br
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 p-6 rounded-2xl bg-background border border-border">
              <h4 className="font-semibold mb-2">Horário de Atendimento</h4>
              <p className="text-muted-foreground text-sm mb-4">
                Segunda a Sexta: 08h às 18h<br />
                Sábados: 08h às 12h
              </p>
              <p className="text-primary text-sm font-medium">
                🔒 Central de Monitoramento: 24 horas
              </p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div initial={{
          opacity: 0,
          x: 30
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }}>
            <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-background border border-border">
              <h3 className="text-2xl font-bold mb-6">Solicite um Orçamento</h3>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Nome Completo
                  </label>
                  <input type="text" id="name" value={formData.name} onChange={e => handleChange("name", e.target.value)} onBlur={() => handleBlur("name")} className={`w-full px-4 py-3 rounded-lg bg-card border ${errors.name && touched.name ? "border-destructive" : "border-border"} focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground`} placeholder="Seu nome" required />
                  {errors.name && touched.name && <p className="text-destructive text-sm mt-1">{errors.name}</p>}
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      E-mail
                    </label>
                    <input type="email" id="email" value={formData.email} onChange={e => handleChange("email", e.target.value)} onBlur={() => handleBlur("email")} className={`w-full px-4 py-3 rounded-lg bg-card border ${errors.email && touched.email ? "border-destructive" : "border-border"} focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground`} placeholder="seu@email.com" required />
                    {errors.email && touched.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                      Telefone
                    </label>
                    <input type="tel" id="phone" value={formData.phone} onChange={e => handleChange("phone", e.target.value)} onBlur={() => handleBlur("phone")} className={`w-full px-4 py-3 rounded-lg bg-card border ${errors.phone && touched.phone ? "border-destructive" : "border-border"} focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground`} placeholder="(00) 00000-0000" required />
                    {errors.phone && touched.phone && <p className="text-destructive text-sm mt-1">{errors.phone}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Mensagem
                  </label>
                  <textarea id="message" rows={4} value={formData.message} onChange={e => handleChange("message", e.target.value)} onBlur={() => handleBlur("message")} className={`w-full px-4 py-3 rounded-lg bg-card border ${errors.message && touched.message ? "border-destructive" : "border-border"} focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none text-foreground`} placeholder="Descreva sua necessidade..." required />
                  {errors.message && touched.message && <p className="text-destructive text-sm mt-1">{errors.message}</p>}
                </div>

                <Button type="submit" variant="hero" size="lg" className="w-full" disabled={enviando}>
                  {enviando ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Send className="w-5 h-5 mr-2" />}
                  {enviando ? "Enviando..." : "Enviar Mensagem"}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>;
};
export default Contact;