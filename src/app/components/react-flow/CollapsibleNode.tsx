// src/app/components/react-flow/CollapsibleNode.tsx

import React, { useState, useEffect } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

const CollapsibleNode: React.FC<NodeProps> = ({ id, data }) => {
  const [collapsed, setCollapsed] = useState(data.collapsed ?? false);

  useEffect(() => {
    if (data.collapsed !== undefined) {
      setCollapsed(data.collapsed);
    }
  }, [data.collapsed]);

  const toggleCollapse = () => setCollapsed(!collapsed);

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
      <Handle type="target" position={Position.Left} id="a" />
      <Handle type="source" position={Position.Right} id="b" />
    </div>
  );
};

export default CollapsibleNode;
