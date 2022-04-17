import '@testing-library/jest-dom';

import React from 'react'
import {render, fireEvent, screen} from '@testing-library/react'

import { Node } from '../index';

test('Node component unit test.', () => {
  const nokiaNode = {
    "id": 3, 
    "title": "Nokia",
    "description": "60+ N1 devices"
  };
  let selctedIds = [];
  let selected = false;
  const onSelectItem = (isSelected, value) => {
    selctedIds = value;
    selected = isSelected;
  };

  const {debug} = render(
    <Node 
      data={nokiaNode} 
      isHeader={(nokiaNode?.categories?.length > 0)} 
      key={nokiaNode.id}
      parentId={''} 
      onSelectItem={onSelectItem}
    />
  );
  // debug();
  expect(screen.getByText('Nokia')).toBeInTheDocument();
  const cbEl = screen.getByTestId(nokiaNode.title);
  
  expect(cbEl).toBeInTheDocument();
  expect(cbEl).not.toBeChecked();
  expect(selected).toBe(false);


  fireEvent.click(cbEl);
  
  expect(cbEl).toBeChecked();
  expect(selected).toBe(true);
  // expect(onSelectItem).toHaveBeenCalled();
  expect(selctedIds).toEqual(['3']);

});