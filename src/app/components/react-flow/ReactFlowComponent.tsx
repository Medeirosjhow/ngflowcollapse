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

const nodeWidth = 172;
const nodeHeight = 36;

const getLayoutedElements = (nodes: Node[], edges: Edge[], direction: 'LR' | 'TB') => {
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
  const [layoutDirection, setLayoutDirection] = React.useState<'LR' | 'TB'>('LR');
  const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(nodes, edges, layoutDirection);

  const [rfNodes, setRfNodes, onNodesChangeInternal] = useNodesState(layoutedNodes);
  const [rfEdges, setRfEdges, onEdgesChangeInternal] = useEdgesState(layoutedEdges);

  const handleLayoutChange = (direction: 'LR' | 'TB') => {
    setLayoutDirection(direction);
    const { nodes: newLayoutedNodes, edges: newLayoutedEdges } = getLayoutedElements(rfNodes, rfEdges, direction);
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

  return (
    <ReactFlowProvider>
      <div style={{ height: 700 }}>
        <div style={{ marginBottom: '10px' }}>
          <button onClick={() => handleLayoutChange('TB')}>Vertical Layout</button>
          <button onClick={() => handleLayoutChange('LR')}>Horizontal Layout</button>
        </div>
        <ReactFlow
          nodes={rfNodes}
          edges={rfEdges}
          onNodesChange={onNodesChangeInternal}
          onEdgesChange={onEdgesChangeInternal}
          onConnect={handleConnect}
          nodeTypes={{
            collapsible: (nodeProps) => <CollapsibleNode {...nodeProps} layoutDirection={layoutDirection} />,
          }}
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
