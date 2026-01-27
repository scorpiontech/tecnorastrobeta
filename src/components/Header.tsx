import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "./ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
      // Already on home, just scroll
      const element = document.getElementById(anchor);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Navigate to home then scroll
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" className="flex items-center">
              <img src={logo} alt="Tecnorastro" className="h-14 w-auto" />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link, index) => (
              link.isRoute ? (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ) : (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleAnchorClick(e, link.anchor!)}
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium cursor-pointer"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {link.name}
                </motion.a>
              )
            ))}
          </nav>

          {/* CTA Button */}
          <motion.div
            className="hidden lg:flex items-center gap-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <a href="tel:+5591991465654" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
              <Phone className="w-4 h-4" />
              <span className="text-sm">(91) 99146-5654</span>
            </a>
            <Button variant="hero" size="default" asChild>
              <Link to="/pre-cadastro">Pré-Cadastro</Link>
            </Button>
          </motion.div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-foreground p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              className="lg:hidden py-6 border-t border-border"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  link.isRoute ? (
                    <Link
                      key={link.name}
                      to={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <a
                      key={link.name}
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium py-2 cursor-pointer"
                      onClick={(e) => {
                        handleAnchorClick(e, link.anchor!);
                        setIsMenuOpen(false);
                      }}
                    >
                      {link.name}
                    </a>
                  )
                ))}
                <Button variant="hero" size="lg" className="mt-4" asChild>
                  <Link to="/pre-cadastro" onClick={() => setIsMenuOpen(false)}>Pré-Cadastro</Link>
                </Button>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
