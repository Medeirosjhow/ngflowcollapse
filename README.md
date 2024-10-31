# NgFlowCollapse

NgFlowCollapse é uma prova de conceito que integra a biblioteca [React Flow Community](https://reactflow.dev/) dentro de uma aplicação Angular 16, adicionando funcionalidade de colapso aos nós do diagrama. Este projeto expande os exemplos fornecidos no repositório [angular-reactflow-examples](https://github.com/relliv/angular-reactflow-examples), demonstrando como encapsular componentes React em Angular e implementar interações avançadas de maneira eficiente e escalável.

## Índice

* [Visão Geral](https://www.notion.so/NgFlowCollapse-1301c13b91ab80a0ba57e8e5aca18a56?pvs=21)
* [Recursos](https://www.notion.so/NgFlowCollapse-1301c13b91ab80a0ba57e8e5aca18a56?pvs=21)
* [Tecnologias](https://www.notion.so/NgFlowCollapse-1301c13b91ab80a0ba57e8e5aca18a56?pvs=21)
* [Pré-requisitos](https://www.notion.so/NgFlowCollapse-1301c13b91ab80a0ba57e8e5aca18a56?pvs=21)
* [Instalação](https://www.notion.so/NgFlowCollapse-1301c13b91ab80a0ba57e8e5aca18a56?pvs=21)
* [Uso](https://www.notion.so/NgFlowCollapse-1301c13b91ab80a0ba57e8e5aca18a56?pvs=21)
* [Estrutura do Projeto](https://www.notion.so/NgFlowCollapse-1301c13b91ab80a0ba57e8e5aca18a56?pvs=21)
* [Contribuição](https://www.notion.so/NgFlowCollapse-1301c13b91ab80a0ba57e8e5aca18a56?pvs=21)
* [Licença](https://www.notion.so/NgFlowCollapse-1301c13b91ab80a0ba57e8e5aca18a56?pvs=21)
* [Contato](https://www.notion.so/NgFlowCollapse-1301c13b91ab80a0ba57e8e5aca18a56?pvs=21)

## Visão Geral

NgFlowCollapse permite aos usuários criar e interagir com diagramas de fluxo complexos, oferecendo a capacidade de colapsar e expandir nós para melhorar a legibilidade e organização visual. Utilizando Angular 16 como framework principal e React Flow Community para a manipulação dos diagramas, esta aplicação demonstra como combinar o melhor dos dois mundos para criar interfaces ricas e interativas.

## Recursos

* **Colapsar/Expandir Nós** : Controle a visibilidade de informações detalhadas em cada nó.
* **Arrastar e Soltar** : Reorganize os nós facilmente através de uma interface intuitiva.
* **Adicionar e Remover Nós** : Personalize o diagrama conforme suas necessidades.
* **Salvamento de Estado** : Salve e recupere o estado atual do diagrama.
* **Responsividade** : Interface adaptável para diferentes tamanhos de tela.

## Tecnologias

* **Angular 16** : Framework robusto para construção de aplicações web.
* **React Flow Community** : Biblioteca para criação de diagramas interativos.
* **TypeScript** : Linguagem que adiciona tipagem estática ao JavaScript.
* **Webpack** : Empacotador de módulos para JavaScript.
* **SCSS** : Pré-processador CSS para estilos avançados.

## Pré-requisitos

Antes de começar, certifique-se de ter os seguintes instalados:

* **Node.js** : Versão 14 ou superior. [Download](https://nodejs.org/)
* **npm** : Gerenciador de pacotes Node.js (geralmente incluído com o Node.js).
* **Angular CLI** : Instale globalmente usando:

```bash
  bash
  Copiar código
  npm install -g @angular/cli

```

## Instalação

Siga os passos abaixo para configurar o projeto localmente:

1. **Clone o repositório:**
   ```bash
   bash
   Copiar código
   git clone <https://github.com/seu-usuario/ngflowcollapse.git>
   cd ngflowcollapse

   ```
2. **Instale as dependências:**
   ```bash
   bash
   Copiar código
   npm install

   ```
3. **Inicie a aplicação:**
   ```bash
   bash
   Copiar código
   ng serve

   ```
4. **Acesse a aplicação:**
   Abra o navegador e vá para `http://localhost:4200/`.

## Uso

Após iniciar a aplicação, você verá um diagrama de fluxo básico. Cada nó possui um botão de colapso que permite ocultar ou revelar detalhes adicionais. Para personalizar o diagrama:

* **Adicionar Nós** : Utilize o painel de controle para adicionar novos nós.
* **Modificar Estrutura** : Arraste os nós para reorganizar a disposição.
* **Colapsar/Expandir** : Clique no ícone de colapso em qualquer nó para alternar a visibilidade dos detalhes.

### Exemplo de Código

Para implementar a funcionalidade de colapso, você pode modificar o componente do nó da seguinte forma:

```tsx
typescript
Copiar código
// src/app/components/flow-node/flow-node.component.ts
import { Component, Input } from '@angular/core';
import { Handle, Position } from 'react-flow-renderer';

@Component({
  selector: 'app-flow-node',
  template: `
    <div class="node">
      <div class="header">
        <span>{{ data.label }}</span>
        <button (click)="toggleCollapse()">
          {{ isCollapsed ? 'Expandir' : 'Colapsar' }}
        </button>
      </div>
      <div class="content" *ngIf="!isCollapsed">
        {{ data.details }}
      </div>
      <Handle type="source" position="right" />
      <Handle type="target" position="left" />
    </div>
  `,
  styles: [`
    .node { /* Estilos do nó */ }
    .header { /* Estilos do cabeçalho */ }
    .content { /* Estilos do conteúdo */ }
  `]
})
export class FlowNodeComponent {
  @Input() data: any;
  isCollapsed = false;

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }
}

```

## Estrutura do Projeto

```typescript
ngflowcollapse/
├── e2e/                     # Testes end-to-end
├── node_modules/            # Dependências do projeto
├── src/
│   ├── app/
│   │   ├── components/      # Componentes Angular encapsulando React Flow
│   │   │   ├── flow-node/   # Componente de nó com funcionalidade de colapso
│   │   │   └── ...          # Outros componentes
│   │   ├── services/        # Serviços Angular
│   │   ├── app.module.ts    # Módulo principal da aplicação
│   │   └── app.component.ts # Componente raiz
│   ├── assets/              # Recursos estáticos (imagens, estilos)
│   ├── environments/        # Configurações de ambiente
│   └── index.html           # Página principal
├── angular.json             # Configurações do Angular
├── package.json             # Dependências e scripts do projeto
├── README.md                # Documentação deste arquivo
└── LICENSE                  # Arquivo de licença

```

## Contribuição

Contribuições são extremamente bem-vindas! Siga as etapas abaixo para contribuir com o NgFlowCollapse:

1. **Fork este repositório.**
2. **Crie uma branch para a sua feature ou correção:**
   ```bash
   bash
   Copiar código
   git checkout -b minha-nova-feature

   ```
3. **Comite as suas alterações:**
   ```bash
   bash
   Copiar código
   git commit -m "Descrição das alterações"

   ```
4. **Faça o push para a branch:**
   ```bash
   bash
   Copiar código
   git push origin minha-nova-feature

   ```
5. **Abra um Pull Request.**

### Padrões de Código

* Siga as diretrizes de estilo do Angular.
* Escreva testes para novas funcionalidades.
* Documente o código onde necessário.

## Licença

Este projeto está licenciado sob a MIT License.

## Contato

Desenvolvido por [Jhonatas Medeiros de Melo](https://github.com/Medeirosjhow).
