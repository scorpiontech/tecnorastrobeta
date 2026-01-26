import { motion } from "framer-motion";
import { Check, Star, Shield, Zap, ArrowLeft, Bike, Car, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const planos = [
  {
    nome: "Moto",
    preco: "55",
    periodo: "/mês",
    descricao: "Rastreamento completo para sua moto",
    popular: false,
    icon: Bike,
    recursos: [
      "Rastreamento em tempo real 24h",
      "Histórico de 30 dias",
      "Alertas de velocidade",
      "Cerca virtual",
      "Suporte técnico",
      "App para celular",
    ],
  },
  {
    nome: "Carro",
    preco: "60",
    periodo: "/mês",
    descricao: "Proteção completa para seu veículo",
    popular: true,
    icon: Car,
    recursos: [
      "Rastreamento em tempo real 24h",
      "Histórico de 90 dias",
      "Alertas de velocidade",
      "Cerca virtual ilimitada",
      "Suporte prioritário 24h",
      "App para celular",
      "Bloqueio remoto",
      "Relatórios mensais",
    ],
  },
  {
    nome: "Combo",
    preco: "100",
    periodo: "/mês",
    descricao: "Moto + Carro com desconto especial",
    popular: false,
    icon: Package,
    recursos: [
      "Rastreamento em tempo real 24h",
      "Histórico de 90 dias",
      "Alertas personalizados",
      "Cerca virtual ilimitada",
      "Suporte VIP 24h",
      "App para celular",
      "Bloqueio remoto",
      "Relatórios detalhados",
      "2 veículos inclusos",
      "Economia de R$ 15/mês",
    ],
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
                <span className="text-sm font-medium">Rastreamento 24h</span>
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
              {planos.map((plano, index) => {
                const IconComponent = plano.icon;
                return (
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
                        <IconComponent className="w-6 h-6 text-primary" />
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
                );
              })}
            </div>

            {/* Rastreamento Garantido Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-12 max-w-4xl mx-auto"
            >
              <div className="bg-gradient-to-r from-destructive/20 via-primary/20 to-destructive/20 border-2 border-primary rounded-2xl p-8 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-gold"></div>
                
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="inline-flex items-center gap-2 bg-destructive/20 text-destructive px-4 py-2 rounded-full mb-6"
                >
                  <Shield className="w-4 h-4" />
                  <span className="text-sm font-medium">Super Novidade!</span>
                </motion.div>

                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Rastreamento <span className="text-gradient-gold">Garantido</span>
                </h2>
                <p className="text-primary font-semibold text-lg mb-2">
                  Segurança Total + Garantia de Assistência Completa!
                </p>
                <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                  Em casos de roubo ou furto, a TecnoRastro traz proteção extra para você!
                  Planos a partir de R$ 90,00/mês.
                </p>
                
                <Button variant="hero" size="lg" asChild>
                  <Link to="/rastreamento-garantido">Conhecer Plano Garantido</Link>
                </Button>
              </div>
            </motion.div>

            {/* Todos os planos incluem */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
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
                    <span className="text-foreground">Rastreamento em tempo real</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">Cercas virtuais</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">Alertas de movimentação</span>
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
