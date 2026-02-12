import Header from "@/components/Header";
import Footer from "@/components/Footer";

const TermosDeUso = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-28 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-8">
            Termos de Uso
          </h1>
          <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
            <p className="text-sm">Última atualização: {new Date().toLocaleDateString("pt-BR")}</p>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-foreground">1. Aceitação dos Termos</h2>
              <p>Ao acessar e utilizar o site e os serviços da Tecnorastro, você concorda com estes Termos de Uso. Caso não concorde com alguma disposição, solicitamos que não utilize nossos serviços.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-foreground">2. Descrição dos Serviços</h2>
              <p>A Tecnorastro oferece serviços de rastreamento veicular, incluindo:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Monitoramento em tempo real da localização do veículo via GPS.</li>
                <li>Alertas de movimentação, velocidade e cercas virtuais.</li>
                <li>Histórico de trajetos e relatórios de utilização.</li>
                <li>Bloqueio remoto do veículo (conforme plano contratado).</li>
                <li>Suporte técnico para instalação e manutenção dos equipamentos.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-foreground">3. Cadastro e Conta</h2>
              <p>Para utilizar nossos serviços, é necessário realizar um cadastro fornecendo informações verdadeiras e atualizadas. Você é responsável por manter a confidencialidade das suas credenciais de acesso e por todas as atividades realizadas em sua conta.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-foreground">4. Obrigações do Usuário</h2>
              <p>O usuário compromete-se a:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Fornecer informações verídicas e atualizadas.</li>
                <li>Utilizar os serviços apenas para fins lícitos.</li>
                <li>Não tentar acessar sistemas ou dados de outros usuários.</li>
                <li>Manter o equipamento de rastreamento em boas condições.</li>
                <li>Comunicar imediatamente qualquer uso não autorizado da sua conta.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-foreground">5. Propriedade Intelectual</h2>
              <p>Todo o conteúdo do site, incluindo textos, imagens, logotipos, marcas e software, é de propriedade exclusiva da Tecnorastro ou de seus licenciadores, protegido pelas leis de propriedade intelectual brasileiras e internacionais.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-foreground">6. Limitação de Responsabilidade</h2>
              <p>A Tecnorastro não se responsabiliza por:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Falhas de sinal GPS causadas por interferências externas ou condições climáticas.</li>
                <li>Indisponibilidade temporária dos serviços por manutenção programada.</li>
                <li>Danos decorrentes do uso indevido dos serviços pelo usuário.</li>
                <li>Perdas ou danos indiretos resultantes da utilização dos serviços.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-foreground">7. Pagamento e Cancelamento</h2>
              <p>Os valores e condições de pagamento são definidos no plano contratado. O cancelamento deve ser solicitado com antecedência mínima de 30 dias. Em caso de inadimplência, a Tecnorastro reserva-se o direito de suspender os serviços.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-foreground">8. Alterações nos Termos</h2>
              <p>A Tecnorastro pode atualizar estes Termos de Uso a qualquer momento. As alterações serão comunicadas através do site e entrarão em vigor na data de publicação. O uso continuado dos serviços após as alterações constitui aceitação dos novos termos.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-foreground">9. Foro</h2>
              <p>Fica eleito o foro da comarca de Belém/PA para dirimir quaisquer questões oriundas destes Termos de Uso, com renúncia de qualquer outro, por mais privilegiado que seja.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-foreground">10. Contato</h2>
              <p>Para dúvidas ou solicitações relacionadas a estes Termos de Uso, entre em contato conosco através da seção de contato em nosso site ou pelo telefone (91) 99146-5654.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermosDeUso;
