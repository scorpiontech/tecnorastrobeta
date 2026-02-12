import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PoliticaPrivacidade = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-28 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-8">
            Política de Privacidade
          </h1>
          <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
            <p className="text-sm">Última atualização: {new Date().toLocaleDateString("pt-BR")}</p>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-foreground">1. Introdução</h2>
              <p>A Tecnorastro ("nós", "nosso" ou "empresa") está comprometida em proteger a privacidade dos usuários de nossos serviços. Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos suas informações pessoais quando você utiliza nosso site e serviços de rastreamento veicular.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-foreground">2. Dados que Coletamos</h2>
              <p>Podemos coletar os seguintes tipos de informações:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Dados de identificação:</strong> nome completo, CPF/CNPJ, RG, endereço, telefone e e-mail.</li>
                <li><strong>Dados do veículo:</strong> placa, modelo, ano, chassi e RENAVAM.</li>
                <li><strong>Dados de localização:</strong> coordenadas GPS do veículo rastreado.</li>
                <li><strong>Dados de navegação:</strong> endereço IP, tipo de navegador, páginas visitadas e tempo de acesso.</li>
                <li><strong>Dados de comunicação:</strong> mensagens enviadas através de nossos formulários de contato.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-foreground">3. Como Utilizamos seus Dados</h2>
              <p>Utilizamos suas informações para:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Prestar e melhorar nossos serviços de rastreamento veicular.</li>
                <li>Entrar em contato com você sobre nossos serviços.</li>
                <li>Enviar notificações relacionadas ao rastreamento do seu veículo.</li>
                <li>Cumprir obrigações legais e regulatórias.</li>
                <li>Prevenir fraudes e garantir a segurança dos nossos serviços.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-foreground">4. Compartilhamento de Dados</h2>
              <p>Não vendemos suas informações pessoais. Podemos compartilhar seus dados com:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Parceiros de tecnologia necessários para a prestação do serviço de rastreamento.</li>
                <li>Autoridades policiais, quando solicitado por ordem judicial ou para auxiliar em casos de roubo/furto.</li>
                <li>Órgãos reguladores, quando exigido por lei.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-foreground">5. Armazenamento e Segurança</h2>
              <p>Seus dados são armazenados em servidores seguros com criptografia de ponta a ponta. Adotamos medidas técnicas e organizacionais adequadas para proteger suas informações contra acesso não autorizado, perda, destruição ou alteração.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-foreground">6. Retenção de Dados</h2>
              <p>Mantemos seus dados pessoais pelo tempo necessário para cumprir as finalidades descritas nesta política, ou conforme exigido por lei. Dados de localização do veículo são armazenados por até 90 dias, salvo disposição contratual diferente.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-foreground">7. Seus Direitos</h2>
              <p>Você tem direito a:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Acessar seus dados pessoais.</li>
                <li>Corrigir dados incompletos ou desatualizados.</li>
                <li>Solicitar a exclusão dos seus dados.</li>
                <li>Revogar o consentimento para o tratamento de dados.</li>
                <li>Solicitar a portabilidade dos seus dados.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-foreground">8. Cookies</h2>
              <p>Nosso site utiliza cookies para melhorar a experiência de navegação. Cookies são pequenos arquivos armazenados no seu dispositivo que nos ajudam a lembrar suas preferências e entender como você interage com nosso site.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-foreground">9. Contato</h2>
              <p>Para exercer seus direitos ou esclarecer dúvidas sobre esta política, entre em contato conosco através da seção de contato em nosso site ou pelo telefone (91) 99146-5654.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PoliticaPrivacidade;
