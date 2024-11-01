// src/app/components/flow-diagram/flow-diagram.component.ts

import { Component, OnInit } from '@angular/core';
import { Node, Edge, NodeChange, EdgeChange, Connection } from 'reactflow';
import ReactFlowComponent from '../components/react-flow/ReactFlowComponent';
import CollapsibleNode from '../components/react-flow/CollapsibleNode';

@Component({
  selector: 'app-flow-diagram',
  template: `
    <app-react-wrapper [component]="reactComponent" [props]="reactProps"></app-react-wrapper>
  `,
  styles: [],
})
export class FlowDiagramComponent implements OnInit {
  reactComponent = ReactFlowComponent;
  reactProps!: ReactFlowComponentProps;

  nodes: Node[] = [
    { id: '1', type: 'collapsible', data: { label: 'Node 1', details: 'Detalhes do Node 1', children: ['2', '3', '10'] }, position: { x: 0, y: 0 } },
    { id: '2', type: 'collapsible', data: { label: 'Node 2', details: 'Detalhes do Node 2', parentId: '1', children: ['4', '5'] }, position: { x: 0, y: 0 } },
    { id: '3', type: 'collapsible', data: { label: 'Node 3', details: 'Detalhes do Node 3', parentId: '1', children: ['6', '7'] }, position: { x: 0, y: 0 } },
    { id: '4', type: 'collapsible', data: { label: 'Node 4', details: 'Detalhes do Node 4', parentId: '2' }, position: { x: 0, y: 0 } },
    { id: '5', type: 'collapsible', data: { label: 'Node 5', details: 'Detalhes do Node 5', parentId: '2' }, position: { x: 0, y: 0 } },
    { id: '6', type: 'collapsible', data: { label: 'Node 6', details: 'Detalhes do Node 6', parentId: '3' }, position: { x: 0, y: 0 } },
    { id: '7', type: 'collapsible', data: { label: 'Node 7', details: 'Detalhes do Node 7', parentId: '3', children: ['8', '9'] }, position: { x: 0, y: 0 } },
    { id: '8', type: 'collapsible', data: { label: 'Node 8', details: 'Detalhes do Node 8', parentId: '7' }, position: { x: 0, y: 0 } },
    { id: '9', type: 'collapsible', data: { label: 'Node 9', details: 'Detalhes do Node 9', parentId: '7' }, position: { x: 0, y: 0 } },
    { id: '10', type: 'collapsible', data: { label: 'Node 10', details: 'Detalhes do Node 10', parentId: '1' }, position: { x: 0, y: 0 } },
  ];

  edges: Edge[] = [
    { id: 'e1-2', source: '1', sourceHandle: 'b', target: '2', targetHandle: 'a', animated: true },
    { id: 'e1-3', source: '1', sourceHandle: 'b', target: '3', targetHandle: 'a', animated: true },
    { id: 'e1-10', source: '1', sourceHandle: 'b', target: '10', targetHandle: 'a', animated: true },
    { id: 'e2-4', source: '2', sourceHandle: 'b', target: '4', targetHandle: 'a', animated: true },
    { id: 'e2-5', source: '2', sourceHandle: 'b', target: '5', targetHandle: 'a', animated: true },
    { id: 'e3-6', source: '3', sourceHandle: 'b', target: '6', targetHandle: 'a', animated: true },
    { id: 'e3-7', source: '3', sourceHandle: 'b', target: '7', targetHandle: 'a', animated: true },
    { id: 'e7-8', source: '7', sourceHandle: 'b', target: '8', targetHandle: 'a', animated: true },
    { id: 'e7-9', source: '7', sourceHandle: 'b', target: '9', targetHandle: 'a', animated: true },
  ];

  ngOnInit(): void {
    this.reactProps = {
      nodes: this.nodes,
      edges: this.edges,
      onNodesChange: this.onNodesChange.bind(this),
      onEdgesChange: this.onEdgesChange.bind(this),
      onConnect: this.onConnect.bind(this),
      onNodeClick: this.onNodeClick.bind(this),
      nodeTypes: { collapsible: CollapsibleNode },
      snapToGrid: true,
      snapGrid: [15, 15],
    };
  }

  onNodesChange(changes: NodeChange[]) {
    console.log('Mudanças nos nós:', changes);
  }

  onEdgesChange(changes: EdgeChange[]) {
    console.log('Mudanças nas arestas:', changes);
  }

  onConnect(params: Connection) {
    console.log('Nova conexão:', params);
  }

  onNodeClick(event: any, node: any) {
    console.log('Node clicado:', node);
  }
}


/**
 * Interface para tipagem das props do ReactFlowComponent.
 */
interface ReactFlowComponentProps {
  nodes: Node[];
  edges: Edge[];
  onNodesChange?: (changes: NodeChange[]) => void;
  onEdgesChange?: (changes: EdgeChange[]) => void;
  onConnect?: (params: Connection) => void;
  onNodeClick?: (event: React.MouseEvent, node: any) => void;
  nodeTypes: { [key: string]: React.ComponentType<any> };
  snapToGrid: boolean;
  snapGrid: [number, number];
}
