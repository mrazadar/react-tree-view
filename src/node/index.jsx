import React, { useState, useEffect } from 'react';
import { Branch } from '../branch';

import {
  getParentId,
  getAllChildrenIds
} from '../utils';

import "./node.css";

/**
 * 
 * @param {data} data for this node 
 * @param {isHeader} isHeader indicates if it's a Branch Header node 
 * @param {parentId} parentId map till the current reference of node
 * @param {isNodeSelected} isNodeSelected denotes if parent branch -
 * - category getSelected all children's should get updated accordingly. 
 */
export const Node = ({ 
  data, 
  isHeader, 
  parentId,
  isNodeSelected,  
  onSelectItem, 
}) => {
  const [isSelected, setSelected] = useState((isNodeSelected ? isNodeSelected : false));

  // console.log('Node: ', data.title, 'isSelected: ', isSelected)
  
  const onSelect = (event) => {
    const _isSelected = event.target.checked;
    let selectedIds = [];
    if(isHeader){
      selectedIds = getAllChildrenIds(data.categories, getParentId(parentId, data.id));
    }else{
      selectedIds.push(getParentId(parentId, data.id));
    }
    onSelectItem(_isSelected, selectedIds);

    setSelected(_isSelected);
  };

  const renderBranch = () => {
    if (!data?.categories?.length) return null;
    return <Branch 
      data={data.categories} 
      parentId={getParentId(parentId, data.id)} 
      onSelectItem={onSelectItem}
      isSelected={isSelected}
    />;
  };

  useEffect(() => {
    if(isNodeSelected !== undefined){
      setSelected(isNodeSelected);
    }
  }, [isNodeSelected]);

  return (
    <li className="node">
      <div className={isHeader ? 'header': ''}>
        <input 
          data-testid={data.title}
          type="checkbox" 
          checked={isSelected}
          onChange={onSelect}
        />
        <div className="wrapper">
          <span className="title">
            {data.title}
          </span>
          {
            data.description && (
              <span className="description">{data.description}</span>
            )
          }
        </div>
      </div>
      {renderBranch()}
    </li>
  );
};
