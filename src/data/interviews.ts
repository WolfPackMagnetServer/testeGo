export interface Question {
  id: string;
  text: string;
  type: "question" | "answer" | "feedback";
  category?: string;
  tags?: string[];
}

export interface Interview {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  difficulty: "beginner" | "intermediate" | "advanced";
  estimatedTime: string;
  topics: string[];
}

export const interviews: Interview[] = [
  {
    id: "interview-1",
    title: "Entrevista 1: Experiência e Arquitetura",
    description:
      "Foco em experiência profissional, microsserviços e concorrência",
    difficulty: "intermediate",
    estimatedTime: "15-20 minutos",
    topics: [
      "Experiência",
      "Microsserviços",
      "Concorrência",
      "Testes",
      "Observabilidade",
      "CI/CD",
    ],
    questions: [
      {
        id: "1-1",
        text: "Olá! Obrigado por participar do nosso processo seletivo. Para começarmos, gostaria que você me contasse um pouco sobre sua experiência com Golang: há quanto tempo trabalha com a linguagem e em que tipos de projetos já utilizou Go?",
        type: "question",
        category: "Experiência",
        tags: ["introdução", "experiência"],
      },
      {
        id: "1-2",
        text: "Trabalho com golang a 4 anos. Trabalhei em um projeto de disparo de pesquisas de satisfacao. O fluxo do sistema era: usuário importa a planilha com os dados de seus clientes e escolhe o canal de disparo, o sistema lê essa planilha e faz o disparo da mensagem de acordo com o canal. Tinhamos vários microsservicos, cada um responsavel por um modulo do sistema e todos escritos em go. O objetivo de utilizar go nesse cenário era ter uma alta performance na entrega das mensagens e uma garantia de seguranca utilizando canais para a comunicacao entre as goroutines. Além do disparo imediato, tbm possuíamos disparos agendados e lembretes para reenviar a mensagem",
        type: "answer",
        category: "Experiência",
      },
      {
        id: "1-3",
        text: "Ótimo, obrigado por compartilhar! Agora, gostaria de aprofundar um pouco mais na parte técnica: Você mencionou o uso de microsserviços em Go. Pode me explicar como vocês faziam a comunicação entre esses microsserviços? Utilizavam algum protocolo específico (REST, gRPC, mensageria, etc)? E como era feito o tratamento de falhas na comunicação entre eles?",
        type: "question",
        category: "Microsserviços",
        tags: ["comunicação", "protocolos", "falhas"],
      },
      {
        id: "1-4",
        text: "nesse cenário em especifico, tinhamos a API que era em go e a comunicacao feita via front para ela era via Rest, já os microservicos nao se comunicavam diretamente, porém consumiam mensagens de fila SQS para fazer os processamentos necessarios. Em outro contexto que trabalhei com microservicos em go tbm, já era uma arquitetura diferente. O front comunicava com o BFF em node atraves do Rest e o BFF se comunciava com os microservicos atraves dp gRPC.",
        type: "answer",
        category: "Microsserviços",
      },
      {
        id: "1-5",
        text: "Excelente! Agora, falando sobre concorrência em Go: você comentou sobre o uso de goroutines e canais para garantir performance e segurança. Pode me dar um exemplo prático de como você utilizou canais para coordenar o trabalho entre goroutines? Se possível, explique um cenário real do seu projeto e como lidou com possíveis condições de corrida (race conditions).",
        type: "question",
        category: "Concorrência",
        tags: ["goroutines", "canais", "race conditions"],
      },
      {
        id: "1-6",
        text: "No momento do processamento da distribuicao precisavamos fazer diversas requisicoes no banco de dados para utilizar posteriormente na logica de processamento da mensagem. Como a maioria dessas requisicoes podiam ser feitas ao mesmo tempo, colocamos cada uma delas dentro de uma goroutine espeficia gerenciando um canal de erro e de resposta para cada uma delas e gerenciando por um waitgroup para que o sistema entenda em que momento precisa aguardar. Além disso, tinhamos uma situacao de identificar clientes duplicados na planilha e para isso usamos um mutex para poder alocar e desalocar um map para identificarmos se aquele cliente já foi processado. Como liamos a planilha em batches utilizavamos semaforo para fazer o gerenciamento de quando parar e continuar",
        type: "answer",
        category: "Concorrência",
      },
      {
        id: "1-7",
        text: "Muito bom! Agora, gostaria de saber sobre testes: como você costuma estruturar os testes em projetos Go? Pode comentar sobre sua experiência com testes unitários, mocks e testes de integração? Se possível, cite ferramentas que costuma utilizar e como garante a qualidade do código em ambientes de produção.",
        type: "question",
        category: "Testes",
        tags: ["testes unitários", "mocks", "integração", "qualidade"],
      },
      {
        id: "1-8",
        text: "Primeiro o ideal é que o projeto esteja adaptado para termos uma boa cobertura de testes, para isso é importante trabalharmos com injecao de dependencia entre controllers, usecases e repositories, assim temos facilidade para a criacao de mocks por exemplo e para criar os mocks utilizamos o mockery, que hoje esta na versao 3, ele gera todos os mocks de forma automatica utilzaindo o comando mockery. Além disso utilizo a biblioteca testing do proprio go para fazer os testes e gosto de colocar um suite para a execucao de todos os testes daquele contexto e separar todos os cenarios de testes do mesmo contexto em describes. Falando de teste de integracao, gosto de ter um espaco no banco de dados para testes diretos nele, como por exemplo se um banco for multitenant, um schema dso teste. Para a qualidade de codigo, acho importante utilizar o lint do go, além de rodar o sonar ou qualquer outra ferramenta que valide o codigo na pipeline, além de analise de PRs mais aprofundadas e como hoje temos a IA que veio para somar, podemos utilizar ferramentas que auxiliem na qualidade do codigo como o copilot e o coderabbit para auxilio no desenvolvimento e na analise do PR",
        type: "answer",
        category: "Testes",
      },
      {
        id: "1-9",
        text: "Ótima resposta! Agora, gostaria de abordar um tema importante em sistemas distribuídos: tolerância a falhas e observabilidade. Como você costuma monitorar e lidar com falhas em aplicações Go em produção? Quais ferramentas ou práticas você utiliza para garantir que, caso algo dê errado, o time consiga identificar rapidamente o problema e agir de forma eficiente?",
        type: "question",
        category: "Observabilidade",
        tags: ["monitoramento", "logs", "traces", "alertas"],
      },
      {
        id: "1-10",
        text: "Importante termos logs e traces bem configruados e padronizados para facilitar na busca pelo problema. Já utilizei o newrelic, uptrace, datadog, mas o mais recente foi o Signoz para a visibilidade de logs e traces. Além disso acho importante configurarmos alertas em canais de comunicacao como por exemplo o slack. Um rollback facil para caso seja necessario",
        type: "answer",
        category: "Observabilidade",
      },
      {
        id: "1-11",
        text: "Excelente! Para finalizar, gostaria de saber sobre sua experiência com deploy e CI/CD em projetos Go. Como você costuma estruturar o pipeline de deploy para aplicações Go? Quais ferramentas já utilizou para automação desse processo e quais boas práticas considera essenciais para garantir entregas seguras e rápidas?",
        type: "question",
        category: "CI/CD",
        tags: ["pipeline", "deploy", "automação", "segurança"],
      },
      {
        id: "1-12",
        text: "Já utilizei o azure e a propria pipeline da AWS. Acho importante em uma pipeline termos a execucao dos testes e validacao de conde smell. Caso os testes quebrem a pipeline deve travar, assim como algum code smell novo ou possivel encontrado pelo sonar por exemplo, tbm deve travar. Importante trabalhar com releases para termos versoes estaveis fda plataforma e que a aprovacao de demandas para producao seja feita por pessoas especificas",
        type: "answer",
        category: "CI/CD",
      },
    ],
  },
  {
    id: "interview-2",
    title: "Entrevista 2: Concorrência e Performance",
    description:
      "Foco em concorrência, worker pools, rate limiting e circuit breakers",
    difficulty: "advanced",
    estimatedTime: "20-25 minutos",
    topics: [
      "Concorrência",
      "Worker Pools",
      "Rate Limiting",
      "Circuit Breaker",
      "Performance",
    ],
    questions: [
      {
        id: "2-1",
        text: "Olá! Seja bem-vindo(a) à nossa entrevista. Meu nome é João e sou Tech Lead aqui na empresa. É um prazer conhecê-lo(a). Para começarmos, você poderia se apresentar brevemente? Conte um pouco sobre sua experiência com Go e o que te trouxe até aqui hoje.",
        type: "question",
        category: "Introdução",
        tags: ["apresentação", "experiência"],
      },
      {
        id: "2-2",
        text: "Trabalho com golang a 4 anos, trazendo o cenário mais recente, atuei em um projeto que tem como core o disparo de pesquisas de satisfacao atraves de canais como sms, wpp e email. O fluxo do projeto era basicamente o usuario enviar a planilha pra nossa plataforma com os dados dos clientes e selecionar o canal que deseja disparar as pesquisas. O ecossistema possui um servico principal que é o backend e api publica e os microservicos todos em go, cada um separado de acordo com o módulo do projeto. A escolha da utiliazcao do go se deu pois o contexto do projeto é a entrega de todas as pesquisas de forma segura e utilizando as goroutines conseguimos ter um processamento masi performatico e a comunicacao entre elas feita com canais gera uma seguranca a mais para a entrega final da mensagem",
        type: "answer",
        category: "Experiência",
      },
      {
        id: "2-3",
        text: "Excelente! É interessante ver como vocês aproveitaram as goroutines para otimizar o processamento. Me conta mais sobre a arquitetura: você mencionou microserviços separados por módulo. Como vocês gerenciavam a comunicação entre esses serviços? E quando você fala sobre usar canais para segurança na entrega das mensagens, isso era entre goroutines dentro do mesmo serviço ou havia algum padrão de comunicação entre os microserviços também? Além disso, com 4 anos de experiência em Go, quais foram os principais desafios que você enfrentou ao trabalhar com concorrência? Teve alguma situação específica onde precisou debuggar problemas relacionados a race conditions ou deadlocks?",
        type: "question",
        category: "Arquitetura",
        tags: ["microsserviços", "comunicação", "concorrência", "debugging"],
      },
      {
        id: "2-4",
        text: "Os microservicos nao comunicam diretamente entre eles, todos consomem mensagens vindas de filas distintas SQS dentro da AWS. Todos os microservicos comunicam com o mesmo banco de dados e quem envia a mensagem para cada uma das filas dos modulos é o servico principal, tambem escrito em go. A utilizacao de canais que mencionei é para a comunicacao dentro do proprio microservico e suas goroutines. Os servicos precisam fazer diversas requisicoes no banco de dados e elas podem ser feitas de forma concorrente, entao utilizamos goroutines para cada uma das requisocoes controlando o retorno de erros e respostas por canais e gerenciando com waitgroup para que o sistema entenda quando precisa aguardar para seguir com o processamento. Trabalhando com concorrencia eu tive cenarios de race condition justamente nessa situacao do disparo das mensagens, esse servico tinha diversas regras, dentre elas tinhamos que ler a planilha csv em batches para ficar mais performatico e comecamos a ter o problema de race condition nessas leituras e para solucionar esse problema utilizamos semaforos para o gerenciamento. Além dessa situacao tbm rpecisavamos identificar clientes duplicados na planilha e esses clientes era salvos em um map, e ai tivemos o problema de race condition também e para solucionar urilizamos o mutex para alocar e desalocar o map e conseguirmos identificar os clientes duplicados. Também tivemos um cenario de deadlock no banco pelo fato de varias goroutines estarem utilizando a mesma tabela e as vezes até o mesmo registro, nesse caso, todos os inserts e updates eram feitos em batches, colocamos um gerenciamento e tempo para que nao ocorra o race condition no nosso banco que nesse caso era o postgres",
        type: "answer",
        category: "Concorrência",
      },
      {
        id: "2-5",
        text: "Muito bem! Você demonstra uma boa experiência prática com os desafios reais de concorrência. É interessante como vocês resolveram diferentes tipos de problemas - semáforos para controle de leitura, mutex para maps compartilhados, e batch processing para evitar contenção no banco. Agora, vou fazer uma pergunta mais técnica: no Go, temos várias formas de gerenciar concorrência. Você mencionou usar sync.WaitGroup, sync.Mutex e semáforos. Como você decidiria entre usar um canal (channel) versus um mutex em uma situação específica? Existe alguma regra ou princípio que você segue para essa escolha? E já que você trabalhou bastante com processamento de arquivos CSV em lotes, como você estruturaria o código para ler um arquivo muito grande (digamos, 10GB) de forma eficiente em Go, considerando limitações de memória?",
        type: "question",
        category: "Concorrência",
        tags: ["canais", "mutex", "escolha", "arquivos grandes"],
      },
      {
        id: "2-6",
        text: "Entendo que devemos utilizar o channel para a retencao de dados de retorno de acoes dentro de uma goroutine, já o mutex entendo que utilizamos em situacoes em que precisamos travar aquele dado de receber valores e depois destravar quando ja estiver ok para o recebimento, ou seja, em situacoes que precisamos verificar o dado puro. Leria o arquivo em batches e goroutines, ou seja, cada goroutine processaria uma quantidade X de linhas. A quantidade de linhas que seria o batch e quantidade de goroutines seriam armazenadas nas variaveis de ambiente para que possamos configurar de forma agil de acordo com a capacidade da nossa infraestrutura. considerando que uma goroutine consome em média 2kb de memoria, tentaria calcular com base nessa média, mas deixar esses dados de configuracao nas variaveis de ambiente para quando estiver em producao pudessemos monitorar e ir melhorando de acordo com o cenário do nosso ambiente produtivo",
        type: "answer",
        category: "Performance",
      },
      {
        id: "2-7",
        text: "Ótimo! A abordagem de configurar via variáveis de ambiente é bem prática para ajustar em produção. Vou partir para uma pergunta sobre design patterns e estrutura de código. Considerando sua experiência com microserviços em Go, como você estrutura seus projetos? Você segue alguma arquitetura específica como Clean Architecture, Hexagonal, ou tem algum padrão próprio? E pensando em testes: como você aborda testes em Go, especialmente quando temos código que utiliza goroutines e concorrência? É um desafio testar código concorrente - você tem alguma estratégia específica para isso? Por último, já que vocês trabalham com integração de diferentes canais (SMS, WhatsApp, email), como você lidaria com a necessidade de implementar um novo canal de comunicação? Como estruturaria o código para que seja facilmente extensível?",
        type: "question",
        category: "Arquitetura",
        tags: ["clean architecture", "testes", "extensibilidade"],
      },
      {
        id: "2-8",
        text: "Utilizo o clean architeture como base, mas costumo adaptar de acordo com o cenário que estou travlhando, entendo que services ficam na camada de infraestrutura, controllers ficam na camada de adapters, tentando deixar bem claro qual é a funcão de cada arquivo e qual camada é responsavel por isso. Para testar o codigo em go, primeiro temos que adaptar o código para que consigamos fazer testes eficientes e de forma pratica, para isso utilizo injecao de dependencia para ficar masi facil mocar os dados. Utilizo o mockery para criar os mocks de todo o projeto e a propria biblioteca de testes do go para o código. Para testes de integracao gosto de ter um banco separado para executar os cenarios. Utilizo um suite só para a execucao de cada arquivo e dentro desse arquivo crio cenarios de todo o modulo dentro de um describe para ficar separado quais cenarios representam cada modulo. Primeiro criaria uma lib para ser responsavel pela integracao com os provedores. Assim separaria por pastas cada provedor, tendo o codigo especifico para cada um. Verificaria atraves da rota de health check do provedor se ele esta de pé sempre antes de iniciar o processo de envio para que fique transparente para o meu usuario caso um servico terceiro esteja fora do ar. As configuracoes de chave de api e senhas, ficaria armazenadas nas minahs variaveis de ambiente para maior seguranca e teria uma forma de fallback para caso o servico do provedor esteja fora do ar, consigamos reenvio essas mensagen após seu retorno",
        type: "answer",
        category: "Arquitetura",
      },
    ],
  },
  {
    id: "interview-3",
    title: "Entrevista 3: Cenários Práticos Avançados",
    description:
      "Foco em cenários práticos, worker pools, rate limiting e circuit breakers",
    difficulty: "advanced",
    estimatedTime: "25-30 minutos",
    topics: [
      "Worker Pools",
      "Rate Limiting",
      "Circuit Breaker",
      "Context",
      "Performance",
    ],
    questions: [
      {
        id: "3-1",
        text: "Olá! Seja bem-vindo. Eu sou seu entrevistador hoje. Obrigado por dedicar seu tempo para conversar conosco. Vamos começar. Para aquecer, pode me contar um pouco sobre sua experiência com Go? O que te atraiu na linguagem e em que tipo de projetos você a tem utilizado profissionalmente?",
        type: "question",
        category: "Introdução",
        tags: ["experiência", "motivação"],
      },
      {
        id: "3-2",
        text: "Bom, trabalho com go a 4 anos, o que mais me facina é como é uma linguagem performatica e de alta conversão. Trabalhei em um projeto que tinha como o core o disparo de pesquisas de satisfacao para clientes atraves de canais como email, sms e wpp. Nesse projeto tinhamos como arquitetura um servico golang principal que era a nossa api interna e externa e os demais microsservicos, cada um vinculado a um modulo do sistma, todos desenvolvidos em golang. O fluxo do sistema era o usuario importava a planilha com os dados dos clientes e o sistema tinha que disparar a pesquisa de satisfacao para cada um dos clientes de acordo com o canal que o usuário escolheu. O objetivo de utilizar golang para esse projeto foi justamente pela necessidade de ser algo performatico",
        type: "answer",
        category: "Experiência",
      },
      {
        id: "3-3",
        text: "Excelente, obrigado pela introdução. É um ótimo exemplo de projeto onde Go realmente brilha. Vamos aprofundar um pouco nesse desafio da performance. Você mencionou o disparo de pesquisas para uma grande quantidade de clientes a partir de uma planilha. Imagine uma planilha com 100.000 clientes. Se você processasse cada cliente e enviasse a pesquisa de forma sequencial, isso levaria muito tempo e não seria eficiente. Como vocês arquitetaram a solução para lidar com esse volume de forma concorrente? Poderia descrever o padrão que utilizaram? Por exemplo, como vocês usaram goroutines e canais (channels) para distribuir e gerenciar o trabalho de enviar essas 100.000 pesquisas? E como garantiram que não sobrecarregariam os serviços externos (como o provedor de e-mail ou SMS) com tantas requisições simultâneas?",
        type: "question",
        category: "Performance",
        tags: ["worker pools", "rate limiting", "concorrência"],
      },
      {
        id: "3-4",
        text: "Bom, primeiro iria ter as configruacoes de quantidade de linhas processadas em batch e a quantidade de goroutines nas minhas variaveis de ambiente para ser facil de alterar e por seguranca. Usaria uma lib para a leitura do csv. Cada goroutine iria ler um batch de linhas e sakvaria o retorno em canais de erro e respostas. Os canais devem ser utilizados apenas para retornos das goroutines. Gerenciaria as goroutines com um waitgroup para aguardar quando necessario e os batches seria como workers que seriam gerenciados por semaforos. Como saber a quantidade de gotouines? Sabendo que a média de meória utuilizada em uma goroutine é 2kb eu iria calcular de acordo com a minha maquina do ambiente produtivo e uytilizaria uma margem de erro para nao sobrecarregar a minha infra",
        type: "answer",
        category: "Performance",
      },
      {
        id: "3-5",
        text: 'Ótima abordagem, você mencionou vários componentes importantes como WaitGroups, canais para retorno e o uso de semáforos para controlar os workers. Vamos detalhar um pouco mais. 1) Distribuição de Trabalho: Você disse que as goroutines leriam um batch. Vamos imaginar um cenário um pouco diferente para explorar o padrão de worker pool. Você tem uma única goroutine que lê a planilha e envia cada cliente (ou cada linha) para um canal de "trabalho" (jobs). Do outro lado, você tem um número fixo de goroutines "workers" que estão lendo desse canal. Como você gerenciaria o ciclo de vida desse canal? Como você sinalizaria para os workers que não há mais trabalho a ser feito e que eles podem encerrar? 2) Rate Limiting: Seu cálculo do número de goroutines foi baseado na capacidade da sua infraestrutura, o que faz sentido. Mas, como eu mencionei, há um fator externo: o provedor de SMS/email tem um rate limit, por exemplo, de 1.000 requisições por minuto. A sua solução com semáforos limita o número de goroutines ativas simultaneamente, mas não necessariamente limita a taxa de requisições ao longo do tempo. Como você implementaria um controle de rate limiting para garantir que seu sistema não ultrapasse o limite imposto pelo serviço externo?',
        type: "question",
        category: "Worker Pools",
        tags: ["worker pool", "rate limiting", "ciclo de vida"],
      },
      {
        id: "3-6",
        text: "Adicionaria uma condicao na minha goroutine para validar se ainda tem dados nesse canal, caso nao, fecharia o pool dos worker. Configuraria a quantidade de rate limite nas minahs variaveis de ambiente e faria uma verificacao se meu servico esta ultrapassando o valor imposto pelo provedor",
        type: "answer",
        category: "Worker Pools",
      },
      {
        id: "3-7",
        text: 'Entendi. Vamos detalhar um pouco mais esses dois pontos. 1) Sobre o fechamento do pool de workers: Você disse que adicionaria uma condição para validar se ainda há dados no canal. No padrão de Producer/Consumer em Go, geralmente não "verificamos" se um canal tem dados. Em vez disso, o producer (quem envia os dados) sinaliza o fim do trabalho. Pergunta: Quando a goroutine "produtora" (a que lê o arquivo) termina de enviar todos os clientes para o canal de trabalhos, qual é a operação específica que ela deve executar no canal para que os "workers" (que estão lendo desse canal, provavelmente em um loop for range) saibam que podem parar? 2) Sobre o Rate Limiting: Dizer que "faria uma verificação" é um bom começo, mas como um desenvolvedor sênior, eu esperaria um pouco mais de detalhe na implementação. Pergunta: Como você implementaria essa verificação na prática? Imagine que o limite é de 100 requisições por segundo. Você usaria alguma ferramenta da biblioteca padrão, como um time.Ticker, ou talvez uma biblioteca externa como a golang.org/x/time/rate? Poderia descrever brevemente a lógica dentro do seu worker para esperar, se necessário, antes de fazer a chamada para o serviço externo?',
        type: "question",
        category: "Rate Limiting",
        tags: ["close channel", "time.Ticker", "implementação"],
      },
      {
        id: "3-8",
        text: "Devemos adicionar um defer com um close no canal. utilizaria o time.Ticker para verificar se esta ultrapassando o limite esperado e aguardaria para a proxima requisicao",
        type: "answer",
        category: "Rate Limiting",
      },
      {
        id: "3-9",
        text: 'Exato! 1) Fechamento do canal: Você está certo, a operação é close(channel). É crucial que a goroutine produtora (a que envia os dados) seja a responsável por chamar o close. Se os consumidores tentassem fechar, poderiam causar um pânico se outro consumidor ou o produtor ainda estivesse ativo. 2) Rate Limiting: Usar um time.Ticker é uma excelente abordagem. Você pode criar um ticker que "dispara" a cada X milissegundos (calculado com base no seu limite de taxa, ex: 1000ms / 100 reqs = 10ms/req). O worker então esperaria por um "tick" do canal do ticker (<-ticker.C) antes de processar cada item. Isso efetivamente limita a taxa de processamento. Muito bem. Vamos para o próximo cenário. Imagine que o processo de envio das 100.000 pesquisas está em andamento. De repente, o serviço externo de e-mail/SMS fica fora do ar. Sua aplicação começa a receber erros de conexão para cada tentativa de envio. Nesse cenário, continuar tentando enviar as 90.000 pesquisas restantes é inútil e apenas consumirá recursos. O ideal seria interromper todo o processo de forma rápida e controlada. Pergunta: Como você implementaria um padrão de "circuit breaker" ou uma lógica de cancelamento geral nesse caso? Se um número X de workers falhar consecutivamente, como você sinalizaria para todas as outras goroutines (incluindo a que está lendo o arquivo e as outras workers) que elas devem parar o que estão fazendo e encerrar a operação imediatamente? Pense no pacote context para isso.',
        type: "question",
        category: "Circuit Breaker",
        tags: ["context", "cancelamento", "circuit breaker"],
      },
    ],
  },
];

export const categories = [
  "Experiência",
  "Microsserviços",
  "Concorrência",
  "Testes",
  "Observabilidade",
  "CI/CD",
  "Performance",
  "Worker Pools",
  "Rate Limiting",
  "Circuit Breaker",
  "Arquitetura",
  "Introdução",
];

export const tags = [
  "introdução",
  "experiência",
  "comunicação",
  "protocolos",
  "falhas",
  "goroutines",
  "canais",
  "race conditions",
  "testes unitários",
  "mocks",
  "integração",
  "qualidade",
  "monitoramento",
  "logs",
  "traces",
  "alertas",
  "pipeline",
  "deploy",
  "automação",
  "segurança",
  "worker pool",
  "rate limiting",
  "ciclo de vida",
  "close channel",
  "time.Ticker",
  "implementação",
  "context",
  "cancelamento",
  "circuit breaker",
  "clean architecture",
  "extensibilidade",
  "apresentação",
  "motivação",
];
