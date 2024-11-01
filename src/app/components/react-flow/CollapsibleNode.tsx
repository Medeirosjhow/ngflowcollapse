import React, { useState, useEffect } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

interface CollapsibleNodeProps extends NodeProps {
  layoutDirection: 'LR' | 'TB'; // Adiciona uma nova prop para direção do layout
}

const CollapsibleNode: React.FC<CollapsibleNodeProps> = ({ id, data, layoutDirection }) => {
  const [collapsed, setCollapsed] = useState(data.collapsed ?? false);

  useEffect(() => {
    if (data.collapsed !== undefined) {
      setCollapsed(data.collapsed);
    }
  }, [data.collapsed]);

  const toggleCollapse = () => setCollapsed(!collapsed);

  // Define a posição dos handles com base na direção do layout
  const sourceHandlePosition = layoutDirection === 'LR' ? Position.Right : Position.Bottom;
  const targetHandlePosition = layoutDirection === 'LR' ? Position.Left : Position.Top;

  return (
    <div className="collapsible-node react-flow">
      <div
        className="header"
        onClick={toggleCollapse}
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
      >
        <span>{data.label}</span>
        <button>{collapsed ? 'Expandir' : 'Colapsar'}</button>
      </div>
      {!collapsed && <div className="details">{data.details}</div>}
      <Handle type="target" position={targetHandlePosition} id="a" />
      <Handle type="source" position={sourceHandlePosition} id="b" />
    </div>
  );
};

export default CollapsibleNode;
