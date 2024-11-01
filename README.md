# NgFlowCollapse

NgFlowCollapse é uma prova de conceito (PoC) desenvolvida para integrar a biblioteca **React Flow Community** dentro de uma aplicação  **Angular 16** , demonstrando uma arquitetura híbrida que utiliza o melhor dos dois frameworks. Este projeto vai além dos exemplos existentes, adicionando funcionalidades avançadas de interação, como **colapso e expansão de nós** de diagrama.

## Índice

* [Objetivo](#-objetivo)
* [Decisões de Design](#-decis%C3%B5es-de-design)
  * [Integração Angular + React: Escolha pelo Wrapper](#1-integra%C3%A7%C3%A3o-angular--react-escolha-pelo-wrapper)
  * [Componentização e Modularidade](#2-componentiza%C3%A7%C3%A3o-e-modularidade)
  * [Layout Automatizado com Dagre](#3-layout-automatizado-com-dagre)
* [Recursos](#-recursos)
* [Tecnologias](#-tecnologias)
* [Pré-requisitos](#-pr%C3%A9-requisitos)
* [Instalação](#-instala%C3%A7%C3%A3o)
* [Estrutura do Projeto](#-estrutura-do-projeto)
* [Contribuição](#-contribui%C3%A7%C3%A3o)
* [Licença](#-licen%C3%A7a)

## 🚀 Objetivo

Criar uma interface de diagrama de fluxo interativo onde os usuários possam organizar visualmente informações complexas. A possibilidade de colapsar e expandir nós é essencial para manter a visualização clara e organizada, especialmente em diagramas grandes.

## 📋 Decisões de Design

### 1. [Integração Angular + React: Escolha pelo Wrapper](#integra%C3%A7%C3%A3o-angular--react-escolha-pelo-wrapper)

A integração de React em um projeto Angular pode ser feita de diferentes maneiras. Algumas das abordagens mais comuns incluem:

* **Wrapper Component** : Cria-se um componente Angular que encapsula o componente React, permitindo comunicação através de *props* e eventos. Essa abordagem envolve um *wrapper* de código relativamente simples e permite integrar qualquer componente React, mantendo o fluxo de dados controlado e as dependências bem organizadas.
* **Web Components** : Outra possibilidade é transformar o componente React em um **Web Component** (com `ReactDOM.createRoot`) e usá-lo diretamente no Angular. Essa abordagem é útil para casos onde o componente React precisa ser reutilizado fora do Angular, mas requer configuração adicional para cada evento e estado, além de não ser tão eficiente quanto o *wrapper* para comunicação direta.
* **Micro Frontends** : Em cenários mais complexos, onde múltiplas bibliotecas precisam ser combinadas, pode-se adotar uma arquitetura de **Micro Frontends** (com [Webpack Module Federation](), por exemplo), permitindo que partes do projeto rodem independentemente, cada uma em sua própria biblioteca. Isso, no entanto, adiciona complexidade e é mais indicado para grandes sistemas.

Para o  **NgFlowCollapse** , escolhemos a abordagem de **Wrapper Component** por sua simplicidade, controle e fácil manutenção. Essa técnica nos permitiu encapsular o `ReactFlow` com um *wrapper* Angular (`react-wrapper.component.ts`), garantindo que o diagrama fosse carregado e gerenciado corretamente, sem a sobrecarga de configurar eventos entre bibliotecas de maneira complexa. O *wrapper* simplifica a passagem de dados e a comunicação com o Angular, tornando a integração mais leve e eficiente.

### 2. [Componentização e Modularidade](#componentiza%C3%A7%C3%A3o-e-modularidade)

Cada componente possui uma responsabilidade clara. O `CollapsibleNode` foi desenhado especificamente para permitir colapso/expansão e facilitar a manutenção do estado de exibição dos nós filhos. Isso torna a estrutura do código escalável e de fácil manutenção.

### 3. [Layout Automatizado com Dagre](#layout-automatizado-com-dagre)

Optamos pelo uso do **Dagre** para organizar os nós automaticamente, facilitando a visualização do diagrama e reduzindo o esforço manual de organização por parte do usuário. O layout é calculado de forma que o diagrama permaneça limpo e organizado, mesmo com muitos nós.

## 🔑 Recursos

* **Colapso e Expansão de Nós** : Melhor organização visual ao esconder detalhes desnecessários.
* **Arraste e Solte** : Interface intuitiva para reorganizar o layout.
* **Suporte a Múltiplas Conexões** : Permite definir relações complexas entre nós.
* **Layout Automatizado** : Uso de algoritmos para disposição automática de nós.
* **MiniMapa e Controles** : Ferramentas para visualização e navegação simplificadas.

## 🛠 Tecnologias

* **Angular 16** : Para estrutura e organização da aplicação.
* **React Flow Community** : Para gerenciamento visual de diagramas.
* **Dagre** : Algoritmo para organização automática do layout.
* **TypeScript** : Para uma base de código mais robusta e tipada.
* **SCSS** : Estilização avançada para uma interface mais atraente.

## ⚙️ Pré-requisitos

* **Node.js** >= 14
* **Angular CLI**

```bash
npm install -g @angular/cli
```


## 🚀 Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/Medeirosjhow/ngflowcollapse.git
   cd ngflowcollapse
   ```
2. Instale as dependências:

   ```bash
   npm install
   ```
3. Inicie a aplicação:

   ```bash
   npm start
   ```
4. Acesse em `http://localhost:4200/`.

## 📂 Estrutura do Projeto

* `src/app/components/react-flow`: Contém os componentes React encapsulados.
  * `CollapsibleNode.tsx`: Lógica e interface de nós com colapso/expansão.
  * `ReactFlowComponent.tsx`: Integração principal com o React Flow.
* `src/app/flow-diagram`: Estrutura do diagrama Angular, onde React Flow é encapsulado.
  * `react-wrapper.component.ts`: Wrapper Angular para renderizar componentes React.

## 🤝 Contribuição

Feedbacks e contribuições são bem-vindos! Sinta-se à vontade para abrir uma *issue* ou enviar um  *pull request* .

## 📄 Licença

Este projeto é de uso livre para estudos e desenvolvimento pessoal.
