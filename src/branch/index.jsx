import React from 'react';
import { Node } from '../node';

import "./branch.css";

/**
 * Render Branch as Node
 */
export const Branch = ({ 
  data, 
  parentId, 
  onSelectItems,
  isSelected,
}) => {
  return (
    <ul className="branch">
      {
        data.map((node, i) => (
          <Node 
            data={node} 
            isHeader={(i===0 && (node?.categories?.length > 0))} 
            key={`${i}-${node.id}`}
            parentId={parentId}
            onSelectItems={onSelectItems}
            isNodeSelected={isSelected}            
          />
        ))
      }
    </ul>
  );
};
