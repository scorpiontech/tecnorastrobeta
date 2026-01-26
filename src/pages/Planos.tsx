import { motion } from "framer-motion";
import { Check, Star, Shield, Zap, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const planos = [
  {
    nome: "Básico",
    preco: "49",
    periodo: "/mês",
    descricao: "Ideal para quem busca segurança essencial",
    popular: false,
    recursos: [
      "Rastreamento em tempo real",
      "Histórico de 30 dias",
      "Alertas de velocidade",
      "Cerca virtual (1 área)",
      "Suporte por email",
      "App para celular",
    ],
    naoInclui: [
      "Bloqueio remoto",
      "Assistência 24h",
      "Seguro contra roubo",
    ],
  },
  {
    nome: "Profissional",
    preco: "89",
    periodo: "/mês",
    descricao: "Proteção completa para seu veículo",
    popular: true,
    recursos: [
      "Rastreamento em tempo real",
      "Histórico de 90 dias",
      "Alertas de velocidade",
      "Cerca virtual (5 áreas)",
      "Suporte prioritário 24h",
      "App para celular",
      "Bloqueio remoto",
      "Assistência 24h",
      "Relatórios mensais",
    ],
    naoInclui: [
      "Seguro contra roubo",
    ],
  },
  {
    nome: "Premium",
    preco: "149",
    periodo: "/mês",
    descricao: "Máxima proteção e tranquilidade",
    popular: false,
    recursos: [
      "Rastreamento em tempo real",
      "Histórico ilimitado",
      "Alertas personalizados",
      "Cerca virtual ilimitada",
      "Suporte VIP 24h",
      "App para celular",
      "Bloqueio remoto",
      "Assistência 24h premium",
      "Relatórios detalhados",
      "Seguro contra roubo",
      "Guincho incluso",
      "Gerente de conta dedicado",
    ],
    naoInclui: [],
  },
];

const Planos = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
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

            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6"
              >
                <Star className="w-4 h-4" />
                <span className="text-sm font-medium">Escolha o melhor plano para você</span>
              </motion.div>
              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                Planos e <span className="text-gradient-gold">Preços</span>
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Proteja seu veículo com a tecnologia mais avançada do mercado.
                Escolha o plano ideal para suas necessidades.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {planos.map((plano, index) => (
                <motion.div
                  key={plano.nome}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className={`relative rounded-2xl p-8 ${
                    plano.popular
                      ? "bg-gradient-to-b from-primary/20 to-background border-2 border-primary shadow-gold-lg"
                      : "bg-card border border-border"
                  }`}
                >
                  {plano.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="bg-gradient-gold text-background px-4 py-1 rounded-full text-sm font-bold">
                        Mais Popular
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-8">
                    <div className={`inline-flex p-3 rounded-xl mb-4 ${
                      plano.popular ? "bg-primary/20" : "bg-muted"
                    }`}>
                      {plano.nome === "Básico" && <Shield className="w-6 h-6 text-primary" />}
                      {plano.nome === "Profissional" && <Zap className="w-6 h-6 text-primary" />}
                      {plano.nome === "Premium" && <Star className="w-6 h-6 text-primary" />}
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">{plano.nome}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{plano.descricao}</p>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-muted-foreground">R$</span>
                      <span className="text-5xl font-bold text-gradient-gold">{plano.preco}</span>
                      <span className="text-muted-foreground">{plano.periodo}</span>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    {plano.recursos.map((recurso) => (
                      <div key={recurso} className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                          <Check className="w-3 h-3 text-primary" />
                        </div>
                        <span className="text-foreground text-sm">{recurso}</span>
                      </div>
                    ))}
                    {plano.naoInclui.map((recurso) => (
                      <div key={recurso} className="flex items-center gap-3 opacity-50">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-muted flex items-center justify-center">
                          <span className="text-xs text-muted-foreground">✕</span>
                        </div>
                        <span className="text-muted-foreground text-sm line-through">{recurso}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    variant={plano.popular ? "hero" : "outline"}
                    size="lg"
                    className="w-full"
                    asChild
                  >
                    <Link to="/pre-cadastro">Contratar Agora</Link>
                  </Button>
                </motion.div>
              ))}
            </div>

            {/* Todos os planos incluem */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-16 text-center"
            >
              <div className="bg-card border border-border rounded-2xl p-8 max-w-4xl mx-auto">
                <h3 className="text-xl font-bold text-primary mb-8">
                  Todos os planos incluem:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">Instalação gratuita</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">App iOS e Android</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">Suporte técnico 24/7</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">Histórico de 90 dias</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">Cercas virtuais ilimitadas</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">Relatórios mensais</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Planos;
