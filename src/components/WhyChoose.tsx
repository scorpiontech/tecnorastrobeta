import { motion } from "framer-motion";
import { Award, Clock, Users, TrendingUp } from "lucide-react";

const reasons = [
  {
    icon: Award,
    title: "Líder em Tecnologia",
    description: "Utilizamos os rastreadores mais avançados do mercado com precisão GPS de até 2 metros.",
    stat: "#1",
    statLabel: "em qualidade",
  },
  {
    icon: Clock,
    title: "Resposta Imediata",
    description: "Tempo médio de resposta de 5 segundos para atualizações de localização em tempo real.",
    stat: "5s",
    statLabel: "tempo de resposta",
  },
  {
    icon: Users,
    title: "Clientes Satisfeitos",
    description: "Mais de 10 mil veículos monitorados com índice de satisfação acima de 98%.",
    stat: "98%",
    statLabel: "satisfação",
  },
  {
    icon: TrendingUp,
    title: "Economia Garantida",
    description: "Reduza custos com combustível, manutenção e seguro ao monitorar sua frota.",
    stat: "30%",
    statLabel: "economia média",
  },
];

const WhyChoose = () => {
  return (
    <section id="porque" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background" />
      
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
            Por Que a Tecnorastro
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            Confiança e{" "}
            <span className="text-gradient-gold">Excelência</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Mais de uma década protegendo veículos e frotas em todo o Brasil.
          </p>
        </motion.div>

        {/* Reasons Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-500"
            >
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-gold flex items-center justify-center shadow-gold flex-shrink-0">
                  <reason.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2 text-foreground">{reason.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">{reason.description}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-gradient-gold">{reason.stat}</span>
                    <span className="text-sm text-muted-foreground">{reason.statLabel}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
