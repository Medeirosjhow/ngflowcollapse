// src/app/components/react-wrapper/react-wrapper.component.ts

import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import * as React from 'react';
import { createRoot, Root } from 'react-dom/client';

@Component({
  selector: 'app-react-wrapper',
  template: `<div #container></div>`, // Contêiner onde o componente React será montado
})
export class ReactWrapperComponent implements OnInit, OnChanges, OnDestroy {
  @Input() component!: React.ComponentType<any>; // O componente React a ser renderizado
  @Input() props: any; // As props que serão passadas para o componente React

  private container!: HTMLElement; // Referência ao contêiner DOM
  private rootInstance!: Root;     // Instância do React root

  constructor(private el: ElementRef) {}

  ngOnInit() {
    // Seleciona o contêiner DOM onde o React será montado
    this.container = this.el.nativeElement.querySelector('div');

    // Cria a instância do React root apenas uma vez
    this.rootInstance = createRoot(this.container);

    // Renderiza o componente React pela primeira vez
    this.renderReact();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.rootInstance) {
      // Atualiza o componente React existente com as novas props
      this.rootInstance.render(React.createElement(this.component, this.props));
    }
  }

  ngOnDestroy() {
    if (this.rootInstance) {
      // Desmonta o componente React ao destruir o componente Angular
      this.rootInstance.unmount();
    }
  }

  private renderReact() {
    if (this.rootInstance) {
      // Renderiza o componente React com as props iniciais
      this.rootInstance.render(React.createElement(this.component, this.props));
    }
  }
}
