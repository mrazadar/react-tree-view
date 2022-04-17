import React from 'react';
import { getTextWithParentsInfo } from '../utils';

import "./selected-items.css";


/**
 * SelectedItems renders items selected on tree
 */
export const SelectedItems = ({
  data,
  idsSource,
}) => {
  if(!idsSource.length) return null;

  const list = idsSource.map((idsSource) => {
    const ids = idsSource.split('^');
    const text = getTextWithParentsInfo(data, ids);
    
    return (
      <div className="selected-item" key={text}> {text} </div>      
    );
  });    
  
  return (
    <div className="selected-items"> 
      <h3>Selected Variants:</h3>
      <React.Fragment>
        {list}
      </React.Fragment>
    </div>
  );
};

