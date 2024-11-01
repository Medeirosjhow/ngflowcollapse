// src/app/components/react-flow/ReactFlowComponent.tsx

import * as React from 'react';
import ReactFlow, {
  ReactFlowProvider,
  MiniMap,
  Controls,
  Background,
  Node,
  Edge,
  Connection,
  NodeTypes,
  useNodesState,
  useEdgesState,
  addEdge,
  NodeChange,
  EdgeChange,
  Position,
} from 'reactflow';
import dagre from 'dagre';
import CollapsibleNode from './CollapsibleNode';

interface ReactFlowComponentProps {
  nodes: Node[];
  edges: Edge[];
  onNodesChange?: (changes: NodeChange[]) => void;
  onEdgesChange?: (changes: EdgeChange[]) => void;
  onConnect?: (params: Connection) => void;
  onNodeClick?: (event: React.MouseEvent, node: any) => void;
  nodeTypes: NodeTypes;
  snapToGrid: boolean;
  snapGrid: [number, number];
}

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 172;
const nodeHeight = 36;

const getLayoutedElements = (nodes: Node[], edges: Edge[]) => {
  dagreGraph.setGraph({
    rankdir: 'LR',
    nodesep: 50,
    ranksep: 50,
  });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = Position.Left;
    node.sourcePosition = Position.Right;
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };
    return node;
  });

  return { nodes: layoutedNodes, edges };
};

const ReactFlowComponent: React.FC<ReactFlowComponentProps> = ({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onConnect,
  onNodeClick,
  nodeTypes,
  snapToGrid,
  snapGrid,
}) => {
  const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(nodes, edges);

  const [rfNodes, setRfNodes, onNodesChangeInternal] = useNodesState(layoutedNodes);
  const [rfEdges, setRfEdges, onEdgesChangeInternal] = useEdgesState(layoutedEdges);
  const [collapsedNodes, setCollapsedNodes] = React.useState<Set<string>>(new Set());

  /**
   * Função para obter todos os descendentes de um nó de forma recursiva.
   */
  const getDescendants = (nodeId: string, nodesList: Node[]): string[] => {
    const children = nodesList.filter((node) => node.data?.parentId === nodeId).map((node) => node.id);
    let descendants = [...children];
    children.forEach((childId) => {
      descendants = [...descendants, ...getDescendants(childId, nodesList)];
    });
    return descendants;
  };

  /**
   * Função para alternar o estado de colapso de um nó e seus descendentes.
   */
  const toggleCollapse = (nodeId: string) => {
    const newCollapsedNodes = new Set(collapsedNodes);
    if (newCollapsedNodes.has(nodeId)) {
      newCollapsedNodes.delete(nodeId); // Expandir
    } else {
      newCollapsedNodes.add(nodeId); // Colapsar
    }
    setCollapsedNodes(newCollapsedNodes);

    // Obter todos os descendentes do nó
    const descendantIds = getDescendants(nodeId, rfNodes);

    // Atualizar visibilidade dos nós descendentes
    setRfNodes((nds) =>
      nds.map((node) => {
        if (descendantIds.includes(node.id)) {
          return { ...node, hidden: newCollapsedNodes.has(nodeId) };
        }
        return node;
      })
    );

    // Atualizar visibilidade das arestas associadas aos descendentes
    setRfEdges((eds) =>
      eds.map((edge) => {
        if (descendantIds.includes(edge.target) || descendantIds.includes(edge.source)) {
          return { ...edge, hidden: newCollapsedNodes.has(nodeId) };
        }
        return edge;
      })
    );
  };

  const handleConnect = (params: Connection) => {
    if (params.source && params.target) {
      const newEdge: Edge = {
        id: `e${params.source}-${params.target}`,
        source: params.source,
        target: params.target,
        animated: true,
      };
      setRfEdges((eds) => addEdge(newEdge, eds));
      if (onConnect) {
        onConnect(params);
      }
    } else {
      console.warn('Source or target is null in handleConnect:', params);
    }
  };

  const handleNodesChange = (changes: NodeChange[]) => {
    onNodesChangeInternal(changes);
    if (onNodesChange) {
      onNodesChange(changes);
    }
  };

  const handleEdgesChange = (changes: EdgeChange[]) => {
    onEdgesChangeInternal(changes);
    if (onEdgesChange) {
      onEdgesChange(changes);
    }
  };

  const handleNodeClick = (event: React.MouseEvent, node: any) => {
    if (onNodeClick) {
      onNodeClick(event, node);
    }
    if (nodeTypes['collapsible'] && node.type === 'collapsible') {
      toggleCollapse(node.id);
    }
  };

  return (
    <ReactFlowProvider>
      <div style={{ height: 700 }}>
        <ReactFlow
          nodes={rfNodes}
          edges={rfEdges}
          onNodesChange={handleNodesChange}
          onEdgesChange={handleEdgesChange}
          onConnect={handleConnect}
          onNodeClick={handleNodeClick}
          nodeTypes={nodeTypes}
          snapToGrid={snapToGrid}
          snapGrid={snapGrid}
          fitView
        >
          <MiniMap />
          <Controls />
          <Background color="#aaa" gap={16} />
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
};

export default ReactFlowComponent;
