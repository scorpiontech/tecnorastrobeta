import { motion } from "framer-motion";
import { Shield, Car, AlertTriangle, Phone, ArrowLeft, Check, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const faixasPreco = [
  { valorVeiculo: "Veículos até R$ 10.000,00", preco: "90" },
  { valorVeiculo: "Veículos até R$ 20.000,00", preco: "100" },
  { valorVeiculo: "Veículos até R$ 30.000,00", preco: "110" },
  { valorVeiculo: "Veículos até R$ 40.000,00", preco: "120" },
];

const beneficios = [
  "Rastreamento 24h em tempo real",
  "Bloqueio remoto do veículo",
  "Assistência completa em casos de roubo ou furto",
  "Proteção extra para seu patrimônio",
  "Suporte prioritário 24/7",
  "App exclusivo para monitoramento",
];

const RastreamentoGarantido = () => {
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
              to="/planos"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar para planos
            </Link>

            {/* Hero Section */}
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 bg-destructive/20 text-destructive px-4 py-2 rounded-full mb-6"
              >
                <AlertTriangle className="w-4 h-4" />
                <span className="text-sm font-medium">Atenção, Motoristas!</span>
              </motion.div>
              
              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                Rastreamento <span className="text-gradient-gold">Garantido</span>
              </h1>
              <p className="text-xl md:text-2xl text-primary font-semibold mb-4">
                Segurança Total + Garantia de Assistência Completa!
              </p>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Em casos de roubo ou furto, a TecnoRastro traz proteção extra para você!
              </p>
            </div>

            {/* Super Novidade Banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gradient-gold text-background text-center py-4 rounded-xl mb-12"
            >
              <span className="text-xl md:text-2xl font-bold">SUPER NOVIDADE!</span>
            </motion.div>

            {/* Tabela de Preços */}
            <div className="max-w-4xl mx-auto mb-12">
              <h2 className="text-2xl font-bold text-center text-foreground mb-8">
                Escolha a faixa do seu veículo
              </h2>
              
              <div className="grid gap-4">
                {faixasPreco.map((faixa, index) => (
                  <motion.div
                    key={faixa.valorVeiculo}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex flex-col md:flex-row items-center justify-between bg-card border border-border rounded-xl p-6 hover:border-primary transition-colors"
                  >
                    <div className="flex items-center gap-4 mb-4 md:mb-0">
                      <div className="bg-primary/20 p-3 rounded-lg">
                        <Car className="w-6 h-6 text-primary" />
                      </div>
                      <span className="text-foreground font-medium">{faixa.valorVeiculo}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">→</span>
                      <span className="text-2xl font-bold text-gradient-gold">
                        R$ {faixa.preco},00
                      </span>
                      <span className="text-muted-foreground">/mês</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Taxa de Adesão */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-card border-2 border-primary rounded-2xl p-8 max-w-2xl mx-auto mb-12 text-center"
            >
              <h3 className="text-xl font-bold text-foreground mb-2">Taxa de Adesão Única</h3>
              <div className="text-4xl font-bold text-gradient-gold mb-2">R$ 150,00</div>
              <p className="text-muted-foreground">
                (inclui instalação e ativação do programa garantido)
              </p>
            </motion.div>

            {/* Benefícios */}
            <div className="max-w-3xl mx-auto mb-12">
              <h2 className="text-2xl font-bold text-center text-foreground mb-8">
                O que está incluso
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {beneficios.map((beneficio, index) => (
                  <motion.div
                    key={beneficio}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                    className="flex items-center gap-3 bg-card border border-border rounded-lg p-4"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-foreground">{beneficio}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="text-center"
            >
              <h3 className="text-xl font-bold text-foreground mb-4">
                Fale agora com nossa equipe:
              </h3>
              <a
                href="tel:+5591991465654"
                className="inline-flex items-center gap-3 text-3xl md:text-4xl font-bold text-gradient-gold hover:opacity-80 transition-opacity mb-6"
              >
                <Phone className="w-8 h-8 text-primary" />
                (91) 99146-5654
              </a>
              <p className="text-muted-foreground mb-8">
                Tecnologia, segurança e tranquilidade no seu dia a dia!
              </p>
              <Button variant="hero" size="lg" asChild>
                <Link to="/pre-cadastro">Fazer Pré-Cadastro</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RastreamentoGarantido;
