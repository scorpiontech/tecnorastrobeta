import { motion } from "framer-motion";
import { CircleCheck } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Contato Inicial",
    description: "Entre em contato conosco para conhecer as melhores opções de rastreamento para seu veículo ou frota.",
  },
  {
    number: "02",
    title: "Instalação Profissional",
    description: "Nossa equipe técnica realiza a instalação do rastreador de forma rápida e discreta em seu veículo.",
  },
  {
    number: "03",
    title: "Configuração do Sistema",
    description: "Configuramos o sistema de acordo com suas necessidades: alertas, cercas virtuais e parâmetros.",
  },
  {
    number: "04",
    title: "Monitoramento Ativo",
    description: "Acompanhe tudo em tempo real pelo app ou painel web, com suporte 24 horas à sua disposição.",
  },
];

const HowItWorks = () => {
  return (
    <section id="como-funciona" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Como Funciona
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            Simples e{" "}
            <span className="text-gradient-gold">Eficiente</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Em poucos passos, você tem seu veículo protegido com a melhor tecnologia do mercado.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative flex gap-6 pb-12 last:pb-0"
            >
              {/* Timeline Line */}
              {index < steps.length - 1 && (
                <div className="absolute left-7 top-16 w-0.5 h-full bg-gradient-to-b from-primary to-primary/20" />
              )}
              
              {/* Step Number */}
              <div className="flex-shrink-0 w-14 h-14 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold">
                <span className="text-primary-foreground font-bold">{step.number}</span>
              </div>
              
              {/* Content */}
              <div className="flex-1 pt-1">
                <h3 className="text-xl font-bold mb-2 text-foreground">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Benefits List */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 p-8 rounded-2xl bg-card border border-border max-w-3xl mx-auto"
        >
          <h3 className="text-xl font-bold mb-6 text-center">
            Todos os planos incluem:
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              "Instalação gratuita",
              "App iOS e Android",
              "Suporte técnico 24/7",
              "Histórico de 90 dias",
              "Cercas virtuais ilimitadas",
              "Relatórios mensais",
            ].map((benefit) => (
              <div key={benefit} className="flex items-center gap-3">
                <CircleCheck className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">{benefit}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
