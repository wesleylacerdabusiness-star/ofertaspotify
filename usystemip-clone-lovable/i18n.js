// Browser-local review language. Choice values, saved answers and user notes
// remain untouched; only the presentation is translated.
const LANGUAGE_KEY = 'spotify_feedback_preview_language';
let language = 'en-US';
try { if (localStorage.getItem(LANGUAGE_KEY) === 'pt-BR') language = 'pt-BR'; } catch {}
const textSources = new WeakMap();
const attributeSources = new WeakMap();
const valueSources = new WeakMap();

const dictionary = {
  'Guest listener': 'Ouvinte visitante',
  'Cash App, PayPal, Venmo, Zelle, ACH or Spotify gift card.': 'Cash App, PayPal, Venmo, Zelle, ACH ou cartão-presente Spotify.',
  'About this balance': 'Sobre este saldo',
  'Back to my wallet': 'Voltar à minha carteira',
  'Back to my balance': 'Voltar ao meu saldo',
  'Your review session is finished.': 'Sua sessão de avaliações foi concluída.',
  'Start a new session': 'Começar uma nova sessão',
  'Start a new session?': 'Começar uma nova sessão?',
  'Reset my session': 'Reiniciar minha sessão',
  'They stay in this browser. Reset my session removes the stored answers.': 'Elas ficam neste navegador. Reiniciar minha sessão remove as respostas salvas.',
  'Your reviews, comments, sound preference, and preview choices stay in this browser only. Do not enter personal or financial information. Reset my session clears the saved session. Hosting may process basic service logs.': 'Suas avaliações, comentários, preferência de som e escolhas da prévia ficam somente neste navegador. Não informe dados pessoais ou financeiros. Reiniciar minha sessão apaga a sessão salva. A hospedagem pode processar registros básicos de funcionamento.',
  'Listen and confirm the track above.': 'Ouça e confirme a música acima.',
  'Choose your answer.': 'Escolha sua resposta.',
  'Add at least 3 words.': 'Escreva ao menos 3 palavras.',
  'Ready to send': 'Pronto para enviar',
  'One review at a time': 'Uma avaliação por vez',
  'Your next review is ready.': 'Sua próxima avaliação está pronta.',
  'Continue my review': 'Continuar minha avaliação',
  'Back to home': 'Voltar ao início',
  'Back': 'Voltar',
  'Close': 'Fechar',
  'Mute reward sounds': 'Silenciar sons de recompensa',
  'Enable reward sounds': 'Ativar sons de recompensa',
  'Credit history': 'Histórico de créditos',
  'Credit History': 'Histórico de créditos',
  'App navigation': 'Navegação do aplicativo',
  'Home': 'Início',
  'Reviews': 'Avaliações',
  'Wallet': 'Carteira',
  'Activity': 'Atividade',
  'Profile': 'Perfil',
  'Privacy': 'Privacidade',
  'Reviews completed': 'Avaliações concluídas',
  'MUSIC & APP FEEDBACK': 'OPINIÃO SOBRE MÚSICA E APLICATIVO',
  'Complete 6 reviews.': 'Complete 6 avaliações.',
  'Preview': 'Prévia',
  'PREVIEW': 'PRÉVIA',
  'Preview only': 'Somente prévia',
  'Listen, rate the music, and share your app experience.': 'Ouça, avalie a música e conte sua experiência com o aplicativo.',
  'View my balance': 'Ver meu saldo',
  'Continue reviewing': 'Continuar avaliando',
  'Start reviewing': 'Começar a avaliar',
  'Your session activity': 'Atividade da sua sessão',
  'Each honest review adds': 'Cada avaliação sincera adiciona',
  'Music impressions': 'Impressões sobre músicas',
  'App experience': 'Experiência com o aplicativo',
  'Complete': 'Concluído',
  'In progress': 'Em andamento',
  'How the balance builds': 'Como o saldo é formado',
  'Six answers. One complete review session.': 'Seis respostas. Uma sessão completa de avaliações.',
  'Original instrumental · 18 sec': 'Instrumental original · 18 segundos',
  'Play original music sample': 'Reproduzir trecho musical original',
  'Pause original music sample': 'Pausar trecho musical original',
  'Made for your mood': 'Feito para o seu momento',
  'All': 'Tudo',
  'Music': 'Música',
  'Podcasts': 'Podcasts',
  'DAILY': 'DO DIA A DIA',
  'ROTATION': 'EM ROTAÇÃO',
  'YOUR': 'SUAS',
  'DISCOVERIES': 'DESCOBERTAS',
  'Your listening, your way': 'Suas músicas, do seu jeito',
  'Something new to discover': 'Algo novo para descobrir',
  'Choose a rating from one to five': 'Escolha uma nota de um a cinco',
  'out of five': 'de cinco',
  'Choose one answer': 'Escolha uma resposta',
  'All 6 reviews complete!': 'As 6 avaliações foram concluídas!',
  'Continue to wallet': 'Continuar para a carteira',
  'Review my answers': 'Revisar minhas respostas',
  'Music Reviews': 'Avaliações musicais',
  'MUSIC REVIEW': 'AVALIAÇÃO MUSICAL',
  'APP EXPERIENCE': 'EXPERIÊNCIA COM O APLICATIVO',
  'Listen. Rate. Share.': 'Ouça. Avalie. Compartilhe.',
  'How is your listening experience?': 'Como é sua experiência ao ouvir música?',
  'Listen to unlock your review': 'Ouça para liberar sua avaliação',
  'Play the 18-second sample above to the end.': 'Reproduza o trecho de 18 segundos acima até o final.',
  'Tell us why': 'Conte o motivo',
  '— at least 3 words': '— pelo menos 3 palavras',
  'What did you notice?': 'O que você percebeu?',
  'Credit already added': 'Crédito já adicionado',
  'Save review': 'Salvar avaliação',
  'Submit review': 'Enviar avaliação',
  'Next review': 'Próxima avaliação',
  'Your reviews are saved on this device only.': 'Suas avaliações ficam salvas somente neste dispositivo.',
  'History': 'Histórico',
  'Claim Rewards': 'Resgatar recompensas',
  'Withdraw funds': 'Sacar saldo',
  'Bank transfer': 'Transferência bancária',
  'Bank transfer (ACH)': 'Transferência bancária (ACH)',
  'Gift card': 'Cartão-presente',
  'Cash Out': 'Sacar',
  'Continue my reviews →': 'Continuar minhas avaliações →',
  'Explore the gift card preview': 'Explorar a prévia do cartão-presente',
  'Choose a payout method': 'Escolha uma forma de pagamento',
  'Gift card redemption preview': 'Prévia de resgate por cartão-presente',
  'Bank account transfer preview': 'Prévia de transferência bancária',
  'Cash App payout preview': 'Prévia de pagamento por Cash App',
  'PayPal payout preview': 'Prévia de pagamento por PayPal',
  'Venmo payout preview': 'Prévia de pagamento por Venmo',
  'Zelle payout preview': 'Prévia de pagamento por Zelle',
  'Your payout details': 'Seus dados de pagamento',
  'Account holder': 'Titular da conta',
  'Example account holder': 'Titular de exemplo',
  'Gift card delivery': 'Entrega do cartão-presente',
  'Bank account': 'Conta bancária',
  'No gift card will be issued': 'Nenhum cartão-presente será emitido',
  'No real bank account connected': 'Nenhuma conta bancária real conectada',
  'Preview amount': 'Valor da prévia',
  'Continue': 'Continuar',
  'Finish your reviews first': 'Primeiro, conclua suas avaliações',
  'Continue reviews': 'Continuar avaliações',
  'Your Session': 'Sua sessão',
  'Withdrawal Confirmation': 'Confirmação de saque',
  'Your reward preview': 'Sua prévia de recompensa',
  'Reviews complete': 'Avaliações concluídas',
  '6 honest answers added to your session.': '6 respostas sinceras adicionadas à sua sessão.',
  'Method selected': 'Método selecionado',
  'Ready to preview': 'Pronto para visualizar',
  'No payment or gift card will be issued.': 'Nenhum pagamento ou cartão-presente será emitido.',
  'Payment Details': 'Detalhes do pagamento',
  'Method': 'Método',
  'Real funds available': 'Dinheiro real disponível',
  'Continue preview': 'Continuar a prévia',
  'This confirms a UI preview, not a withdrawal request.': 'Isto confirma uma prévia da interface, não uma solicitação de saque.',
  'Confirmation': 'Confirmação',
  'UI PREVIEW · NO PAYMENT OR ACCOUNT CONNECTION': 'PRÉVIA DA INTERFACE · SEM PAGAMENTO OU CONEXÃO DE CONTA',
  'Your listening session': 'Sua sessão de avaliações',
  'is ready for the next step.': 'está pronta para a próxima etapa.',
  'Preview the reward experience for your completed reviews.': 'Visualize a experiência de recompensa das suas avaliações concluídas.',
  'Preview ready.': 'Prévia pronta.',
  'Activate the preview to continue.': 'Ative a prévia para continuar.',
  'YES, CONTINUE MY PREVIEW': 'SIM, CONTINUAR MINHA PRÉVIA',
  'ACTIVATE MY PREVIEW': 'ATIVAR MINHA PRÉVIA',
  'Reward Preview': 'Prévia de recompensa',
  'Choose your reward format': 'Escolha o formato da recompensa',
  'Keep your listening going.': 'Continue no seu ritmo.',
  'Select the reward route you would like to preview.': 'Selecione a forma de recompensa que deseja visualizar.',
  'Your session is complete': 'Sua sessão está concluída',
  'All six reviews are saved.': 'As seis avaliações estão salvas.',
  'Your balance, all together': 'Todo o seu saldo reunido',
  'Six reviews. One total.': 'Seis avaliações. Um total.',
  'Confirm the reward preview': 'Confirme a prévia da recompensa',
  'Everything in one place.': 'Tudo em um só lugar.',
  'Your preview is complete': 'Sua prévia está concluída',
  'Thanks for sharing your opinion.': 'Obrigado por compartilhar sua opinião.',
  'Gift card preview': 'Prévia de cartão-presente',
  'Bank transfer preview': 'Prévia de transferência bancária',
  'Music feedback': 'Opinião sobre músicas',
  '3 reviews complete': '3 avaliações concluídas',
  'Your opinions': 'Suas opiniões',
  'Saved on this device': 'Salvas neste dispositivo',
  '6 reviews × $400 =': '6 avaliações × $400 =',
  'Reward route': 'Forma da recompensa',
  '6 reviews completed': '6 avaliações concluídas',
  'PREVIEW COMPLETE': 'PRÉVIA CONCLUÍDA',
  'REWARD PREVIEW': 'PRÉVIA DE RECOMPENSA',
  'COMPLETE THE PREVIEW': 'CONCLUIR A PRÉVIA',
  'YES, CONTINUE': 'SIM, CONTINUAR',
  'VIEW MY REVIEWS': 'VER MINHAS AVALIAÇÕES',
  'Your review activity': 'Sua atividade de avaliações',
  'Edit review': 'Editar avaliação',
  'No reviews yet. Your first opinion starts here.': 'Ainda não há avaliações. Sua primeira opinião começa aqui.',
  'No account or sign-in required.': 'Não é necessário criar uma conta ou entrar.',
  'Storage': 'Armazenamento',
  'This browser only': 'Somente neste navegador',
  'Your reviews are still here.': 'Suas avaliações continuam aqui.',
  'You can pick up where you left off.': 'Você pode continuar de onde parou.',
  'CONTINUE MY SESSION': 'CONTINUAR MINHA SESSÃO',
  'Is this an official Spotify offer?': 'Esta é uma oferta oficial do Spotify?',
  'Will I receive $2,400?': 'Vou receber $2,400?',
  'Are real financial details needed?': 'São necessários dados financeiros reais?',
  'Where do my answers go?': 'Para onde vão minhas respostas?',
  'Does the rating change the credit?': 'A nota altera o crédito?',
  'Help & Details': 'Ajuda e detalhes',
  'Page not found': 'Página não encontrada',
  'Your next review': 'Sua próxima avaliação',
  'starts here.': 'começa aqui.',
  'Explore six reviews and a': 'Explore seis avaliações e um',
  ', with music and app feedback.': ', com opiniões sobre músicas e o aplicativo.',
  'Unable to play the sample. Please try again.': 'Não foi possível reproduzir o trecho. Tente novamente.',
  'Sample complete. Your music review is unlocked.': 'Trecho concluído. Sua avaliação musical foi liberada.',
  'Review completed!': 'Avaliação concluída!',
  'Add at least 3 words to your review.': 'Adicione pelo menos 3 palavras à avaliação.',
  'Review updated. No duplicate credit added.': 'Avaliação atualizada. Nenhum crédito duplicado foi adicionado.',
  'Choose an answer before continuing.': 'Escolha uma resposta antes de continuar.',
  'Keep my session': 'Manter minha sessão',
  'Got it': 'Entendi',
  'Reward sounds on.': 'Sons de recompensa ativados.',
  'Reward sounds off.': 'Sons de recompensa silenciados.',
  'First impression': 'Primeira impressão',
  'How does this track make you feel?': 'O que você sente ao ouvir esta música?',
  'Listen to the original sample, then give your honest first impression.': 'Ouça o trecho original e conte sua primeira impressão com sinceridade.',
  'Listen to the track, then give your honest first impression.': 'Ouça a música e conte sua primeira impressão com sinceridade.',
  'Not for me': 'Não faz meu estilo',
  'Love it': 'Adorei',
  'Playlist potential': 'Potencial para sua playlist',
  'Would this make your playlist?': 'Esta música entraria na sua playlist?',
  'Picture the music you actually come back to. Would this track have a place?': 'Pense nas músicas que você sempre volta a ouvir. Esta teria espaço na sua playlist?',
  'Definitely — I would save it': 'Com certeza — eu salvaria',
  'Maybe, for the right mood': 'Talvez, para o momento certo',
  'Not this time': 'Desta vez, não',
  'What stands out': 'O que se destaca',
  'What stands out to you most?': 'O que mais chama sua atenção?',
  'There is no right answer. Tell us what caught your ear.': 'Não existe resposta certa. Conte o que chamou sua atenção ao ouvir.',
  'The melody': 'A melodia',
  'The rhythm': 'O ritmo',
  'The production': 'A produção',
  'Nothing in particular': 'Nada em particular',
  'Listening habits': 'Hábitos de escuta',
  'How often do you use Spotify?': 'Com que frequência você usa o Spotify?',
  'Your everyday experience is the point. Choose what fits you best.': 'Queremos saber da sua experiência no dia a dia. Escolha a opção que mais combina com você.',
  'Every day': 'Todos os dias',
  'A few times a week': 'Algumas vezes por semana',
  'Occasionally': 'De vez em quando',
  'I do not use Spotify': 'Não uso o Spotify',
  'Music discovery': 'Descoberta musical',
  'How are Spotify’s recommendations?': 'Como são as recomendações do Spotify?',
  'Think about the songs, artists, and playlists recommended to you.': 'Pense nas músicas, artistas e playlists recomendados para você.',
  'Needs work': 'Pode melhorar',
  'Excellent': 'Excelente',
  'Not enough experience to rate': 'Não tenho experiência suficiente para avaliar',
  'A better experience': 'Uma experiência melhor',
  'What would you improve first?': 'O que você melhoraria primeiro?',
  'If you could change one part of the Spotify experience, where would you start?': 'Se pudesse mudar uma parte da experiência no Spotify, por onde começaria?',
  'Discovering new music': 'Descobrir novas músicas',
  'Search and navigation': 'Busca e navegação',
  'Creating and organizing playlists': 'Criar e organizar playlists',
  'Playback and audio controls': 'Reprodução e controles de áudio',
  'No preference / I do not use Spotify': 'Sem preferência / não uso o Spotify',
  'Choose a song': 'Escolha uma música',
  'Music for every mood': 'Música para todos os momentos',
  'Pop': 'Pop',
  'Electronic': 'Eletrônica',
  'Classics': 'Clássicos',
  'Nostalgia': 'Nostalgia',
  'Everyday favorites': 'Favoritas do dia a dia',
  'Listen in the official Spotify player, then confirm to continue.': 'Ouça no player oficial do Spotify e confirme para continuar.',
  'Open in Spotify': 'Abrir no Spotify',
  'I listened to this track': 'Ouvi esta música',
  'Change song': 'Trocar música',
  'Spotify player unavailable? Open the song in Spotify, then return here.': 'O player do Spotify não está disponível? Abra a música no Spotify e volte aqui.',
  'Official Spotify player': 'Player oficial do Spotify',
  'Selected track': 'Música selecionada',
  'Listening confirmed': 'Escuta confirmada',
  'Choose your language': 'Escolha seu idioma',
  'English (US)': 'Inglês (EUA)',
  'Português (Brasil)': 'Português (Brasil)',
  'Language': 'Idioma',
  'Select language': 'Selecionar idioma',
  'Country / language': 'País / idioma',
  'Listening confirmed. Your review is unlocked.': 'Escuta confirmada. Sua avaliação foi liberada.',
  'Confirm you listened to unlock your review.': 'Confirme que ouviu a música para liberar sua avaliação.',
  'Listen to a song before reviewing.': 'Ouça uma música antes de avaliar.',
  'Listen first, then share your opinion.': 'Primeiro ouça, depois compartilhe sua opinião.',
  'Song selection': 'Seleção de música',
  'Choose another song': 'Escolher outra música',
  'Choose another track': 'Escolher outra música',
  'Choose this track': 'Escolher esta música',
  'I have listened to the selected track.': 'Ouvi a música selecionada.',
  'Your music choice is saved with this review.': 'Sua escolha musical fica salva com esta avaliação.',
  'Listen to the selected track, then give your honest first impression.': 'Ouça a música selecionada e conte sua primeira impressão com sinceridade.',
  'Payment method': 'Forma de pagamento',
  'Payment preview': 'Prévia de pagamento',
  'Payout preview': 'Prévia de pagamento',
  'No real account connected': 'Nenhuma conta real conectada',
  'Payout destination': 'Destino do pagamento',
  'Payout account': 'Conta de pagamento',
  'No real payout account connected': 'Nenhuma conta de pagamento real conectada',
  'Music is available through official Spotify players and links; this is not a sponsored Spotify program.': 'As músicas estão disponíveis em players e links oficiais do Spotify; este não é um programa patrocinado pelo Spotify.',
  'Music & App Reviews': 'Avaliações de músicas e do aplicativo',
  'Skip to content': 'Ir para o conteúdo',
  'JavaScript is required to use this website. Payment processing is not connected to this website.': 'É necessário ativar o JavaScript para usar este site. O processamento de pagamentos não está conectado.',
  'Spotify review program home': 'Início do programa de avaliações do Spotify',
  'Spotify reviews': 'Avaliações do Spotify',
  'Claim Rewards — Spotify reviews': 'Resgatar recompensas — avaliações do Spotify',
  'About this program': 'Sobre este programa',
  'Independent review program. Not operated, funded, or endorsed by Spotify.': 'Programa independente de avaliações. Não é operado, financiado nem endossado pelo Spotify.',
  'Balance': 'Saldo',
  '$2,400 after 6 reviews': '$2,400 após 6 avaliações',
  '$2,400 session balance': 'saldo da sessão de $2,400',
  'to your review balance.': 'ao seu saldo de avaliações.',
  'View program details': 'Ver detalhes do programa',
  'Music app screen': 'Tela do aplicativo de música',
  'Featured playlist': 'Playlist em destaque',
  'Music app interface for your review.': 'Interface do aplicativo de música para sua avaliação.',
  'Your review balance is': 'Seu saldo de avaliações é',
  'Review balance': 'Saldo de avaliações',
  'review credit': 'crédito da avaliação',
  'Honest feedback, any rating.': 'Opiniões sinceras, qualquer nota.',
  'Your balance': 'Seu saldo',
  'Choose an example method to explore the redemption screens. No real money will be sent.': 'Escolha um método de exemplo para explorar as telas de resgate. Nenhum dinheiro real será enviado.',
  'How the program works': 'Como o programa funciona',
  'These options do not currently connect to a financial account or issue a payment.': 'Estas opções não conectam uma conta financeira nem emitem pagamentos no momento.',
  'Example details only. No email, login, or banking information is collected.': 'Apenas dados de exemplo. Nenhum e-mail, login ou dado bancário é coletado.',
  'PAYMENTS NOT CONNECTED': 'PAGAMENTOS NÃO CONECTADOS',
  'Review amount': 'Valor das avaliações',
  'Your feedback and review credits are ready to review.': 'Suas opiniões e seus créditos de avaliação estão prontos para conferência.',
  'All six reviews are included in your balance.': 'As seis avaliações estão incluídas no seu saldo.',
  'Check the selected route and review amount below.': 'Confira abaixo a forma selecionada e o valor das avaliações.',
  'I understand that no payment will be sent through this website at this time.': 'Entendo que nenhum pagamento será enviado por este site neste momento.',
  'No money was transferred and no gift card was created. Payment processing is not connected to this website yet.': 'Nenhum dinheiro foi transferido e nenhum cartão-presente foi criado. O processamento de pagamentos ainda não está conectado a este site.',
  'YOUR REVIEW BALANCE': 'SEU SALDO DE AVALIAÇÕES',
  'USD · review credits': 'USD · créditos de avaliação',
  'RETURN TO CONFIRMATION': 'VOLTAR À CONFIRMAÇÃO',
  'Program details': 'Detalhes do programa',
  'Who operates this program?': 'Quem opera este programa?',
  'This is a Spotify program, rate it.': 'Este é um programa do Spotify, avalie-o.',
  'Six reviews add $400 each to your session balance. Payments are not connected to this website yet, so this screen cannot issue a payout.': 'Seis avaliações adicionam $400 cada ao saldo da sua sessão. Os pagamentos ainda não estão conectados a este site, portanto esta tela não pode emitir um pagamento.',
  'No. Redemption screens use read-only example details. No bank account, gift card destination, or Spotify account is connected.': 'Não. As telas de resgate usam dados de exemplo somente leitura. Nenhuma conta bancária, destino de cartão-presente ou conta do Spotify está conectada.',
  'This clears your reviews and review balance from this browser.': 'Isto apaga deste navegador suas avaliações e o saldo de avaliações.',
  'REVIEW CREDIT ADDED': 'CRÉDITO DA AVALIAÇÃO ADICIONADO',
  'The session total is $2,400 after six reviews. Payment processing is not connected yet; this website does not issue payments or gift cards. Spotify does not fund or operate this program.': 'O total da sessão é $2,400 após seis avaliações. O processamento de pagamentos ainda não está conectado; este site não emite pagamentos nem cartões-presente. O Spotify não financia nem opera este programa.',
  'This is an independent music and app review program. Music is available through Spotify players and links. Spotify does not operate, fund, or endorse this program. Payment processing is not connected to this website yet.': 'Este é um programa independente de avaliações de músicas e do aplicativo. As músicas estão disponíveis em players e links do Spotify. O Spotify não opera, financia nem endossa este programa. O processamento de pagamentos ainda não está conectado a este site.',
  'View checkout': 'Ver checkout',
};

function brazilianMoney(text) {
  return text.replace(/\$(\d[\d,]*(?:\.\d{1,2})?)/g, (match, number) => {
    const value = Number(number.replace(/,/g, ''));
    return Number.isFinite(value) ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'USD' }).format(value) : match;
  });
}

function dynamic(text) {
  let match;
  if ((match = text.match(/^(\d+) review credits · USD$/))) return `${match[1]} ${match[1] === '1' ? 'crédito' : 'créditos'} de avaliação · USD`;
  if ((match = text.match(/^Your review balance is (.+)\.$/))) return `Seu saldo de avaliações é ${match[1]}.`;
  if ((match = text.match(/^(\d+) of (\d+) reviews completed\. Your balance is (.+)\.$/))) return `${match[1]} de ${match[2]} avaliações concluídas. Seu saldo é ${match[3]}.`;
  if ((match = text.match(/^Editing answers does not add credit\. Your total remains (.+) in USD\.$/))) return `Editar respostas não adiciona crédito. Seu total continua em ${match[1]} (USD).`;
  if ((match = text.match(/^Review credit · (\d+) of (\d+) reviews$/))) return `Crédito de avaliação · ${match[1]} de ${match[2]} avaliações`;
  if ((match = text.match(/^(.+) review program home$/))) return `Início do programa de avaliações do ${match[1]}`;
  if ((match = text.match(/^Independent review program\. Not operated, funded, or endorsed by (.+)\.$/))) return `Programa independente de avaliações. Não é operado, financiado nem endossado pelo ${match[1]}.`;
  if ((match = text.match(/^Claim Rewards — (.+) reviews$/))) return `Resgatar recompensas — avaliações do ${match[1]}`;
  if ((match = text.match(/^The session total is (.+) after six reviews\. Payment processing is not connected yet; this website does not issue payments or gift cards\. (.+) does not fund or operate this program\.$/))) return `O total da sessão é ${match[1]} após seis avaliações. O processamento de pagamentos ainda não está conectado; este site não emite pagamentos nem cartões-presente. ${match[2]} não financia nem opera este programa.`;
  if ((match = text.match(/^This is an independent music and app review program\. Music is available through Spotify players and links\. (.+) does not operate, fund, or endorse this program\. Payment processing is not connected to this website yet\.$/))) return `Este é um programa independente de avaliações de músicas e do aplicativo. As músicas estão disponíveis em players e links do Spotify. ${match[1]} não opera, financia nem endossa este programa. O processamento de pagamentos ainda não está conectado a este site.`;
  if ((match = text.match(/^Separate purchase: (.+)\. This does not change your review balance\.$/))) return `Compra separada: ${match[1]}. Isto não altera seu saldo de avaliações.`;
  if ((match = text.match(/^(\d+) of (\d+) reviews completed\.?$/))) return `${match[1]} de ${match[2]} avaliações concluídas${text.endsWith('.') ? '.' : ''}`;
  if ((match = text.match(/^(\d+) of (\d+) completed$/))) return `${match[1]} de ${match[2]} concluídas`;
  if ((match = text.match(/^(\d+)\/(\d+) reviews$/))) return `${match[1]}/${match[2]} avaliações`;
  if ((match = text.match(/^(\d+) reviews?$/))) return `${match[1]} ${match[1] === '1' ? 'avaliação' : 'avaliações'}`;
  if ((match = text.match(/^Review (\d+)\/(\d+)$/))) return `Avaliação ${match[1]}/${match[2]}`;
  if ((match = text.match(/^QUESTION (\d+) OF (\d+)$/))) return `PERGUNTA ${match[1]} DE ${match[2]}`;
  if ((match = text.match(/^Reviews completed: (\d+)\/(\d+)$/))) return `Avaliações concluídas: ${match[1]}/${match[2]}`;
  if ((match = text.match(/^Complete all (\d+) reviews to unlock the preview\. (\d+) of (\d+) completed\.$/))) return `Complete as ${match[1]} avaliações para liberar a prévia. ${match[2]} de ${match[3]} concluídas.`;
  if ((match = text.match(/^(\d+)\/(\d+) words minimum$/))) return `${match[1]}/${match[2]} palavras (mín.)`;
  if ((match = text.match(/^This review adds (.+)$/))) return `Esta avaliação adiciona ${match[1]}`;
  if ((match = text.match(/^(\d+) of (\d+) reviews$/))) return `${match[1]} de ${match[2]} avaliações`;
  if ((match = text.match(/^(.+) gift card$/))) return `Cartão-presente ${match[1]}`;
  if ((match = text.match(/^(.+) preview selected$/))) return `${translateCore(match[1])} selecionado na prévia`;
  if ((match = text.match(/^Review (\d+) of (\d+) — (.+) concept$/))) return `Avaliação ${match[1]} de ${match[2]} — Conceito ${match[3]}`;
  if (text === 'Withdrawal preview') return 'Prévia de saque';
  if (text === 'Activate preview') return 'Ativar prévia';
  if ((match = text.match(/^Official Spotify player: (.+)$/))) return `Player oficial do Spotify: ${match[1]}`;
  if ((match = text.match(/^Listen to (.+) in Spotify$/))) return `Ouvir ${match[1]} no Spotify`;
  if ((match = text.match(/^Select (.+) by (.+)$/))) return `Selecionar ${match[1]}, de ${match[2]}`;
  if ((match = text.match(/^Choose (.+) by (.+)$/))) return `Escolher ${match[1]}, de ${match[2]}`;
  return text;
}
function translateCore(text) { return Object.hasOwn(dictionary, text) ? dictionary[text] : dynamic(text); }

export function getLanguage() { return language; }
export function setLanguage(next) {
  language = next === 'pt-BR' ? 'pt-BR' : 'en-US';
  try { localStorage.setItem(LANGUAGE_KEY, language); } catch {}
  if (typeof document !== 'undefined') document.documentElement.lang = language;
  return language;
}
export function translateText(value) {
  const raw = String(value ?? '');
  if (language !== 'pt-BR' || !raw.trim()) return raw;
  const before = raw.match(/^\s*/)?.[0] || '';
  const after = raw.match(/\s*$/)?.[0] || '';
  const normalized = raw.trim().replace(/\s+/g, ' ');
  return before + brazilianMoney(translateCore(normalized)) + after;
}

const skipSelector = 'script,style,textarea,code,pre,svg,[translate="no"],[data-no-translate],.history-row p,.song-title,.song-artist,.track-name,.artist-name';
const attributeSkipSelector = 'script,style,code,pre,svg,[translate="no"],[data-no-translate],.history-row p,.song-title,.song-artist,.track-name,.artist-name';
function original(cache, object, current) {
  const entry = cache.get(object);
  if (!entry || entry.output !== current) {
    const record = { source: current, output: current };
    cache.set(object, record);
    return record;
  }
  return entry;
}

/** Translate rendered content without rebuilding forms or changing their data. */
export function translateDOM(root = document) {
  if (!root) return;
  const doc = root.nodeType === 9 ? root : root.ownerDocument;
  if (!doc) return;
  doc.documentElement.lang = language;
  const view = doc.defaultView;
  const filter = view?.NodeFilter || { SHOW_TEXT: 4 };
  const walker = doc.createTreeWalker(root, filter.SHOW_TEXT);
  const nodes = [];
  if (root.nodeType === 3) nodes.push(root);
  else while (walker.nextNode()) nodes.push(walker.currentNode);
  for (const node of nodes) {
    if (!node.parentElement || node.parentElement.closest(skipSelector)) continue;
    const record = original(textSources, node, node.nodeValue || '');
    const output = translateText(record.source);
    if (node.nodeValue !== output) node.nodeValue = output;
    record.output = output;
  }
  const descendants = root.querySelectorAll ? [...root.querySelectorAll('*')] : [];
  const elements = root.nodeType === 1 ? [root, ...descendants] : descendants;
  for (const element of elements) {
    if (element.closest(attributeSkipSelector)) continue;
    let attributes = attributeSources.get(element);
    if (!attributes) { attributes = new Map(); attributeSources.set(element, attributes); }
    for (const name of ['placeholder', 'aria-label', 'title', 'alt']) {
      if (!element.hasAttribute(name)) continue;
      const current = element.getAttribute(name);
      let record = attributes.get(name);
      if (!record || record.output !== current) { record = { source: current, output: current }; attributes.set(name, record); }
      const output = translateText(record.source);
      if (current !== output) element.setAttribute(name, output);
      record.output = output;
    }
    // These unnamed, read-only fields are static example labels, never answers.
    if (element.tagName === 'INPUT' && element.readOnly && !element.name) {
      const record = original(valueSources, element, element.value);
      const output = translateText(record.source);
      if (element.value !== output) element.value = output;
      record.output = output;
    }
  }
}
