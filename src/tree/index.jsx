import React from 'react';
import { Node } from '../node';

import "./tree.css";

/**
 * 
 * @param {data} will be json tree to render 
 * @param {onSelectItem} callback to invoke item select
 * @returns 
 */
export const Tree = ({ data, onSelectItem}) => {
  if (!data.length) return null;
  return (
    <ul className="tree">
      {
        data.map((node, i) => (
          <Node 
            data={node} 
            isHeader={(node?.categories?.length > 0)} 
            key={node.id}
            parentId={''} 
            onSelectItem={onSelectItem}
          />
        ))
      }      
    </ul>
  );
};