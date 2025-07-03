# 🚀 Sistema de Estudo Interativo - Entrevistas Go

Um sistema moderno e interativo para estudar entrevistas técnicas de Go, desenvolvido com React, TypeScript e Vite.

## ✨ Características

- **Interface Moderna**: Design responsivo com animações suaves
- **Navegação Intuitiva**: Sistema de navegação fácil entre entrevistas
- **Busca Avançada**: Filtros por categoria, tags e busca textual
- **Progresso Visual**: Acompanhe seu progresso nas entrevistas
- **Modo de Estudo**: Visualize perguntas e respostas de forma organizada
- **Responsivo**: Funciona perfeitamente em desktop, tablet e mobile

## 🛠️ Tecnologias Utilizadas

- **React 18** - Biblioteca principal
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **Framer Motion** - Animações
- **Lucide React** - Ícones
- **CSS Modules** - Estilização

## 📦 Instalação

1. Clone o repositório:

```bash
git clone <url-do-repositorio>
cd golang-interview-study
```

2. Instale as dependências:

```bash
npm install
```

3. Execute o projeto em modo de desenvolvimento:

```bash
npm run dev
```

4. Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 🚀 Deploy na Vercel

### Deploy Automático

1. Conecte seu repositório GitHub à Vercel
2. A Vercel detectará automaticamente que é um projeto Vite
3. Configure as variáveis de ambiente se necessário
4. Deploy automático a cada push

### Deploy Manual

1. Build do projeto:

```bash
npm run build
```

2. Faça upload da pasta `dist` para a Vercel

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes React
│   ├── InterviewList.tsx
│   ├── InterviewViewer.tsx
│   ├── SearchBar.tsx
│   ├── FilterPanel.tsx
│   └── *.css           # Estilos dos componentes
├── data/               # Dados das entrevistas
│   └── interviews.ts
├── App.tsx             # Componente principal
├── App.css             # Estilos globais
├── main.tsx            # Ponto de entrada
└── index.css           # Estilos base
```

## 📊 Conteúdo das Entrevistas

O sistema inclui 3 entrevistas técnicas completas:

### 1. Entrevista 1: Experiência e Arquitetura

- **Dificuldade**: Intermediário
- **Tempo**: 15-20 minutos
- **Tópicos**: Experiência, Microsserviços, Concorrência, Testes, Observabilidade, CI/CD

### 2. Entrevista 2: Concorrência e Performance

- **Dificuldade**: Avançado
- **Tempo**: 20-25 minutos
- **Tópicos**: Concorrência, Worker Pools, Rate Limiting, Circuit Breaker, Performance

### 3. Entrevista 3: Cenários Práticos Avançados

- **Dificuldade**: Avançado
- **Tempo**: 25-30 minutos
- **Tópicos**: Worker Pools, Rate Limiting, Circuit Breaker, Context, Performance

## 🎯 Como Usar

### Navegação Principal

1. **Página Inicial**: Visualize todas as entrevistas disponíveis
2. **Busca**: Use a barra de busca para encontrar conteúdo específico
3. **Filtros**: Aplique filtros por categoria e tags

### Estudo de Entrevistas

1. **Seleção**: Clique em uma entrevista para começar
2. **Navegação**: Use a barra lateral para navegar entre perguntas
3. **Progresso**: Acompanhe seu progresso na barra superior
4. **Respostas**: Toggle para mostrar/ocultar respostas sugeridas

### Funcionalidades Avançadas

- **Marcação de Conclusão**: Perguntas respondidas são marcadas automaticamente
- **Navegação por Teclado**: Use as setas para navegar
- **Responsividade**: Interface adaptável para qualquer dispositivo

## 🎨 Personalização

### Adicionando Novas Entrevistas

1. Edite o arquivo `src/data/interviews.ts`
2. Adicione uma nova entrada no array `interviews`
3. Siga a estrutura de interface `Interview`

### Modificando Estilos

- **Cores**: Edite as variáveis CSS em `src/index.css`
- **Componentes**: Modifique os arquivos `.css` de cada componente
- **Tema**: Personalize o gradiente de fundo em `src/App.css`

## 📱 Responsividade

O sistema é totalmente responsivo e funciona em:

- **Desktop**: Layout completo com sidebar
- **Tablet**: Layout adaptado com navegação otimizada
- **Mobile**: Layout vertical com navegação por swipe

## 🔧 Scripts Disponíveis

```bash
npm run dev          # Inicia o servidor de desenvolvimento
npm run build        # Gera build de produção
npm run preview      # Preview do build de produção
npm run lint         # Executa o linter
```

## 🌟 Próximas Funcionalidades

- [ ] Sistema de notas pessoais
- [ ] Modo offline
- [ ] Exportação de progresso
- [ ] Mais entrevistas
- [ ] Sistema de avaliação
- [ ] Modo escuro

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Se você encontrar algum problema ou tiver sugestões, abra uma issue no repositório.

---

**Desenvolvido com ❤️ para a comunidade Go**
