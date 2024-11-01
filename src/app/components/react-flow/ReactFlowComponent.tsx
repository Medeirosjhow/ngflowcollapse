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
import { ToggleCollapseContext, LayoutDirectionContext } from './Contexts';

interface ReactFlowComponentProps {
  nodes: Node[];
  edges: Edge[];
  onNodesChange?: (changes: NodeChange[]) => void;
  onEdgesChange?: (changes: EdgeChange[]) => void;
  onConnect?: (params: Connection) => void;
  snapToGrid: boolean;
  snapGrid: [number, number];
}

const nodeWidth = 172;
const nodeHeight = 36;

// Função para obter o layout dos elementos usando Dagre
const getLayoutedElements = (
  nodes: Node[],
  edges: Edge[],
  direction: 'LR' | 'TB' = 'LR'
) => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  dagreGraph.setGraph({
    rankdir: direction,
    nodesep: 50,
    ranksep: 100,
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
    node.targetPosition = direction === 'LR' ? Position.Left : Position.Top;
    node.sourcePosition = direction === 'LR' ? Position.Right : Position.Bottom;

    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };

    return node;
  });

  return { nodes: layoutedNodes, edges };
};

// Definir nodeTypes fora do componente para evitar recriações
const nodeTypes: NodeTypes = {
  collapsible: (nodeProps: any) => <CollapsibleNode {...nodeProps} />,
};

const ReactFlowComponent: React.FC<ReactFlowComponentProps> = ({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onConnect,
  snapToGrid,
  snapGrid,
}) => {
  const [layoutDirection, setLayoutDirection] = React.useState<'LR' | 'TB'>('LR');
  const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
    nodes,
    edges,
    layoutDirection
  );

  const [rfNodes, setRfNodes, onNodesChangeInternal] = useNodesState(layoutedNodes);
  const [rfEdges, setRfEdges, onEdgesChangeInternal] = useEdgesState(layoutedEdges);
  const [collapsedNodes, setCollapsedNodes] = React.useState<Set<string>>(new Set());

  /**
   * Função para obter todos os descendentes de um nó de forma recursiva.
   */
  const getDescendants = React.useCallback(
    (nodeId: string, nodesList: Node[]): string[] => {
      const children = nodesList.filter((node) => node.data?.parentId === nodeId).map((node) => node.id);
      let descendants = [...children];
      children.forEach((childId) => {
        descendants = [...descendants, ...getDescendants(childId, nodesList)];
      });
      return descendants;
    },
    []
  );

  /**
   * Função para alternar o estado de colapso de um nó e seus descendentes.
   */
  const toggleCollapse = React.useCallback(
    (nodeId: string) => {
      setCollapsedNodes((prev) => {
        const newCollapsedNodes = new Set(prev);
        const isCollapsing = !newCollapsedNodes.has(nodeId);

        if (isCollapsing) {
          newCollapsedNodes.add(nodeId); // Colapsar
        } else {
          newCollapsedNodes.delete(nodeId); // Expandir
        }

        // Obter todos os descendentes do nó
        const descendantIds = getDescendants(nodeId, rfNodes);

        // Atualizar visibilidade dos nós descendentes
        setRfNodes((nds) =>
          nds.map((node) => {
            if (descendantIds.includes(node.id)) {
              return { ...node, hidden: isCollapsing };
            } else if (node.id === nodeId) {
              // Atualizar a propriedade 'collapsed' no data do nó
              return { ...node, data: { ...node.data, collapsed: isCollapsing } };
            }
            return node;
          })
        );

        // Atualizar visibilidade das arestas associadas aos descendentes
        setRfEdges((eds) =>
          eds.map((edge) => {
            if (descendantIds.includes(edge.target) || descendantIds.includes(edge.source)) {
              return { ...edge, hidden: isCollapsing };
            }
            return edge;
          })
        );

        return newCollapsedNodes;
      });
    },
    [getDescendants, rfNodes]
  );

  const handleLayoutChange = (direction: 'LR' | 'TB') => {
    setLayoutDirection(direction);
    const { nodes: newLayoutedNodes, edges: newLayoutedEdges } = getLayoutedElements(
      rfNodes,
      rfEdges,
      direction
    );
    setRfNodes(newLayoutedNodes);
    setRfEdges(newLayoutedEdges);
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

  return (
    <ReactFlowProvider>
      {/* Fornecer os contextos para os componentes de nó */}
      <ToggleCollapseContext.Provider value={toggleCollapse}>
        <LayoutDirectionContext.Provider value={layoutDirection}>
          <div style={{ height: '700px', width: '100%' }}>
            <div style={{ marginBottom: '10px' }}>
              <button onClick={() => handleLayoutChange('TB')}>Vertical Layout</button>
              <button onClick={() => handleLayoutChange('LR')}>Horizontal Layout</button>
            </div>
            <ReactFlow
              nodes={rfNodes}
              edges={rfEdges}
              onNodesChange={handleNodesChange}
              onEdgesChange={handleEdgesChange}
              onConnect={handleConnect}
              nodeTypes={nodeTypes} // nodeTypes definido fora e estável
              snapToGrid={snapToGrid}
              snapGrid={snapGrid}
              fitView
              nodesDraggable={true} // Permitir arraste dos nós
              nodesConnectable={true} // Permitir conexões entre os nós
              elementsSelectable={true} // Permitir seleção de elementos
              panOnDrag={true} // Habilita arraste no canvas
              zoomOnScroll={true} // Permitir zoom com scroll
              zoomOnPinch={true} // Permitir zoom com pinça
            >
              <MiniMap />
              <Controls />
              <Background color="#aaa" gap={16} />
            </ReactFlow>
          </div>
        </LayoutDirectionContext.Provider>
      </ToggleCollapseContext.Provider>
    </ReactFlowProvider>
  );
};

export default ReactFlowComponent;
