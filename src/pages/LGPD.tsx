import Header from "@/components/Header";
import Footer from "@/components/Footer";

const LGPD = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-28 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-8">
            LGPD – Lei Geral de Proteção de Dados
          </h1>
          <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
            <p className="text-sm">Última atualização: {new Date().toLocaleDateString("pt-BR")}</p>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-foreground">1. Compromisso com a LGPD</h2>
              <p>A Tecnorastro está em conformidade com a Lei nº 13.709/2018 (Lei Geral de Proteção de Dados Pessoais – LGPD). Este documento detalha como tratamos os dados pessoais dos nossos clientes e usuários, garantindo transparência e segurança em todas as operações.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-foreground">2. Controlador de Dados</h2>
              <p>A Tecnorastro atua como controladora dos dados pessoais coletados, sendo responsável pelas decisões referentes ao tratamento de dados pessoais. Para questões relacionadas à proteção de dados, entre em contato pelo telefone (91) 99146-5654.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-foreground">3. Bases Legais para o Tratamento</h2>
              <p>O tratamento de dados pessoais pela Tecnorastro está fundamentado nas seguintes bases legais previstas na LGPD:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Execução de contrato:</strong> para a prestação dos serviços de rastreamento veicular contratados.</li>
                <li><strong>Consentimento:</strong> para envio de comunicações de marketing e newsletters.</li>
                <li><strong>Interesse legítimo:</strong> para melhoria dos serviços e prevenção de fraudes.</li>
                <li><strong>Cumprimento de obrigação legal:</strong> para atender exigências de órgãos reguladores e autoridades.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-foreground">4. Direitos do Titular dos Dados</h2>
              <p>Conforme a LGPD, você tem os seguintes direitos em relação aos seus dados pessoais:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Confirmação e acesso:</strong> confirmar a existência de tratamento e acessar seus dados.</li>
                <li><strong>Correção:</strong> solicitar a correção de dados incompletos, inexatos ou desatualizados.</li>
                <li><strong>Anonimização, bloqueio ou eliminação:</strong> de dados desnecessários ou excessivos.</li>
                <li><strong>Portabilidade:</strong> solicitar a transferência dos seus dados a outro fornecedor.</li>
                <li><strong>Eliminação:</strong> solicitar a exclusão dos dados tratados com base no consentimento.</li>
                <li><strong>Informação:</strong> ser informado sobre as entidades com as quais seus dados são compartilhados.</li>
                <li><strong>Revogação do consentimento:</strong> retirar o consentimento a qualquer momento.</li>
                <li><strong>Oposição:</strong> opor-se ao tratamento realizado com fundamento em outras bases legais, em caso de descumprimento da LGPD.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-foreground">5. Como Exercer seus Direitos</h2>
              <p>Para exercer qualquer um dos direitos acima, você pode:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Enviar uma solicitação através do formulário de contato em nosso site.</li>
                <li>Entrar em contato pelo telefone (91) 99146-5654.</li>
              </ul>
              <p>Responderemos às solicitações em até 15 dias úteis, conforme previsto na legislação.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-foreground">6. Medidas de Segurança</h2>
              <p>Implementamos medidas técnicas e administrativas aptas a proteger os dados pessoais, incluindo:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Criptografia de dados em trânsito e em repouso.</li>
                <li>Controle de acesso baseado em perfis e permissões.</li>
                <li>Monitoramento contínuo de segurança.</li>
                <li>Treinamento periódico da equipe sobre proteção de dados.</li>
                <li>Plano de resposta a incidentes de segurança.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-foreground">7. Transferência Internacional de Dados</h2>
              <p>Seus dados podem ser armazenados em servidores localizados fora do Brasil. Nestes casos, garantimos que a transferência é realizada para países que proporcionem grau de proteção adequado ou mediante cláusulas contratuais específicas, conforme exigido pela LGPD.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-foreground">8. Incidentes de Segurança</h2>
              <p>Em caso de incidente de segurança que possa acarretar risco ou dano relevante aos titulares de dados, a Tecnorastro comunicará à Autoridade Nacional de Proteção de Dados (ANPD) e aos titulares afetados, em prazo razoável, conforme determina a LGPD.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-foreground">9. Autoridade Nacional de Proteção de Dados</h2>
              <p>Se você acredita que o tratamento dos seus dados pessoais viola a LGPD, você tem o direito de apresentar reclamação à Autoridade Nacional de Proteção de Dados (ANPD) através do site <a href="https://www.gov.br/anpd" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.gov.br/anpd</a>.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-foreground">10. Atualizações</h2>
              <p>Esta política pode ser atualizada periodicamente para refletir mudanças nas nossas práticas de tratamento de dados ou alterações na legislação aplicável. Recomendamos a revisão periódica deste documento.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LGPD;
