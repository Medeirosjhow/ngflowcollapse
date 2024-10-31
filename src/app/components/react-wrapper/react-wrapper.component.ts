import { Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from "@angular/core";
import * as React from 'react';
import { createRoot, Root } from 'react-dom/client';
@Component({
  selector: 'app-react-wrapper',
  template: `<div id="container"></div>`,
})
export class ReactWrapperComponent implements OnInit, OnChanges, OnDestroy {
  @Input() component: any;
  @Input() props: any;

  private container!: HTMLElement;
  private rootInstance!: Root;

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    this.container = this.el.nativeElement.querySelector('div');
    this.renderReact();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.container) {
      this.renderReact();
    }
  }

  ngOnDestroy(): void {
    if (this.rootInstance) {
      this.rootInstance.unmount();
    }
  }

  private renderReact(): void {
    this.rootInstance = createRoot(this.container);
    this.rootInstance.render(React.createElement(this.component, this.props));
  }

}
