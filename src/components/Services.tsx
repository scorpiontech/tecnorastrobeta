import { motion } from "framer-motion";
import { MapPin, Bell, Lock, Smartphone, BarChart3, Headphones } from "lucide-react";

const services = [
  {
    icon: MapPin,
    title: "Rastreamento em Tempo Real",
    description: "Acompanhe a localização exata do seu veículo a qualquer momento pelo app ou web.",
  },
  {
    icon: Bell,
    title: "Alertas Inteligentes",
    description: "Receba notificações instantâneas de movimentações suspeitas, excesso de velocidade e mais.",
  },
  {
    icon: Lock,
    title: "Bloqueio Remoto",
    description: "Bloqueie ou desbloqueie seu veículo remotamente em caso de emergência.",
  },
  {
    icon: Smartphone,
    title: "App Exclusivo",
    description: "Aplicativo intuitivo para iOS e Android com todas as funcionalidades na palma da mão.",
  },
  {
    icon: BarChart3,
    title: "Relatórios Detalhados",
    description: "Histórico completo de rotas, paradas, velocidade e comportamento do motorista.",
  },
  {
    icon: Headphones,
    title: "Suporte 24/7",
    description: "Equipe especializada disponível 24 horas para atendimento e emergências.",
  },
];

const Services = () => {
  return (
    <section id="servicos" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-card via-background to-card" />
      
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
            Nossos Serviços
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            Tecnologia de{" "}
            <span className="text-gradient-gold">Ponta</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Soluções completas de rastreamento veicular para proteger o que é mais importante para você.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-500 hover:shadow-gold"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                <service.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
