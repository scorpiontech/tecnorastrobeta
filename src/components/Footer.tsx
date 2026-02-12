import { MapPin, Instagram, Facebook, Linkedin, Youtube } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: "Início", href: "/", isRoute: true },
    { name: "Serviços", href: "/#servicos", anchor: "servicos" },
    { name: "Como Funciona", href: "/#como-funciona", anchor: "como-funciona" },
    { name: "Por Que Escolher", href: "/#porque", anchor: "porque" },
    { name: "Planos", href: "/planos", isRoute: true },
    { name: "Contato", href: "/#contato", anchor: "contato" },
  ];

  const handleAnchorClick = (e: React.MouseEvent, anchor: string) => {
    e.preventDefault();
    if (location.pathname === "/") {
      const element = document.getElementById(anchor);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(anchor);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  return (
    <footer className="py-16 bg-background border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <a href="#" className="flex items-center gap-2 mb-4">
              <MapPin className="w-8 h-8 text-primary" />
              <span className="text-2xl font-display font-bold">
                <span className="text-foreground">Tecno</span>
                <span className="text-gradient-gold">rastro</span>
              </span>
            </a>
            <p className="text-muted-foreground leading-relaxed max-w-md mb-6">
              Líder em rastreamento veicular no Brasil. Protegemos seu patrimônio com a tecnologia mais avançada do mercado.
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Linkedin, Youtube].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4 text-foreground">Links Rápidos</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  {link.isRoute ? (
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      onClick={(e) => handleAnchorClick(e, link.anchor!)}
                      className="text-muted-foreground hover:text-primary transition-colors duration-300 cursor-pointer"
                    >
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold mb-4 text-foreground">Legal</h4>
            <ul className="space-y-3">
              {[
                { name: "Política de Privacidade", href: "/politica-de-privacidade" },
                { name: "Termos de Uso", href: "/termos-de-uso" },
                { name: "LGPD", href: "/lgpd" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {currentYear} Tecnorastro. Todos os direitos reservados.
          </p>
          <p className="text-muted-foreground text-sm">
            Desenvolvido por{" "}
            <a
              href="https://gtechsolucoesti.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Gtech Soluções Tecnológicas
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
