// src/app/components/react-flow/CollapsibleNode.tsx

import React, { useContext } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { ToggleCollapseContext, LayoutDirectionContext } from "./Contexts";

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
  const sourceHandlePosition =
    layoutDirection === "LR" ? Position.Right : Position.Bottom;
  const targetHandlePosition =
    layoutDirection === "LR" ? Position.Left : Position.Top;

  return (
    <div className="collapsible-node">
      <div className="collapsible-node__header">
        <span className="collapsible-node__label">{data.label}</span>
        <button
          onClick={handleToggle}
          className="collapsible-node__toggle-btn"
          aria-expanded={!collapsed}
          aria-label="Toggle collapse"
        >
          {collapsed ? "▼" : "▲"}
        </button>
      </div>
      <Handle
        type="target"
        position={targetHandlePosition}
        id="handle-target"
        className="collapsible-node__handle--target"
      />
      <Handle
        type="source"
        position={sourceHandlePosition}
        id="handle-source"
        className="collapsible-node__handle--source"
      />

      <button className="collapsible-node__add-btn">+ add child node</button>
    </div>
  );
};

export default CollapsibleNode;
