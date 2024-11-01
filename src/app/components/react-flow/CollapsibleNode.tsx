// src/app/components/react-flow/CollapsibleNode.tsx

import React, { useContext } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { ToggleCollapseContext, LayoutDirectionContext } from './Contexts';

interface CollapsibleNodeProps extends NodeProps {}

const CollapsibleNode: React.FC<CollapsibleNodeProps> = ({ id, data }) => {
  const toggleCollapse = useContext(ToggleCollapseContext);
  const layoutDirection = useContext(LayoutDirectionContext);

  const collapsed = data.collapsed ?? false;

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation(); // Evita que o clique propague para o nó pai
    toggleCollapse(id);
  };

  // Define a posição dos handles com base na direção do layout
  const sourceHandlePosition = layoutDirection === 'LR' ? Position.Right : Position.Bottom;
  const targetHandlePosition = layoutDirection === 'LR' ? Position.Left : Position.Top;

  return (
    <div className="collapsible-node">
      <div
        className="header"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '5px',
          background: '#ddd',
          borderRadius: '5px',
        }}
      >
        <span>{data.label}</span>
        <button onClick={handleToggle} style={{ cursor: 'pointer' }}>
          {collapsed ? 'Expandir' : 'Colapsar'}
        </button>
      </div>
      {!collapsed && (
        <div className="details" style={{ padding: '5px' }}>
          {data.details}
        </div>
      )}
      <Handle type="target" position={targetHandlePosition} id="a" />
      <Handle type="source" position={sourceHandlePosition} id="b" />
    </div>
  );
};

export default CollapsibleNode;
