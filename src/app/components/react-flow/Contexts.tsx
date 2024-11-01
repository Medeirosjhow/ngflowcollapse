import React from 'react';

export const ToggleCollapseContext = React.createContext<(nodeId: string) => void>(() => {});
export const LayoutDirectionContext = React.createContext<'LR' | 'TB'>('LR');
