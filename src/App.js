import React, {useState} from 'react';

import { Tree } from './tree';
import { SelectedItems } from './selected-items';
import { getUniqIdsSourceMap } from './utils';

import { jsonData } from './assignment/data';

import "./App.css";


function App() {
  const { categories } = jsonData;  
  const [idsSource, updateIdsSource] = useState([]);  

  const onSelectItems = (isSelected, value) => {
    updateIdsSource(getUniqIdsSourceMap(idsSource, value, isSelected));
  };

  return (
    <div className="App">
      <div className="tree-container">
        <h3>Browse Products:</h3>
        <Tree 
          data={categories} 
          onSelectItems={onSelectItems}
        />         
      </div>
      <SelectedItems 
        data={categories} 
        idsSource={idsSource}
      />
    </div>
  );
}

export default App;
