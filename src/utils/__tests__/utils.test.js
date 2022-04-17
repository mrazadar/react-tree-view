import { jsonData } from '../../assignment/data';
import { 
  getParentId,
  getAllChildrenIds,
  getTextWithParentsInfo,
  getUniqIdsSourceMap,
} from '../index';

//test getUniqIdsSourceMap
test('getUniqIdsSourceMap should return uniq ids array', () => { 
  const prevIdsSource = [
    '1^1^1^1',
    '1^1^1^2',
    '1^1^1^3',
    '1^1^2',    
  ];
  const newIdsSource1 = [
    '1^2',
    '1^3'
  ];
  expect(getUniqIdsSourceMap(prevIdsSource, newIdsSource1, true)).toStrictEqual([
    '1^1^1^1',
    '1^1^1^2',
    '1^1^1^3',
    '1^1^2',
    '1^2',
    '1^3'
  ]);

  const newIdsSource2 = [
    '1^1^1^2',
    '1^1^1^3',
  ];
  expect(getUniqIdsSourceMap(prevIdsSource, newIdsSource2, false)).toStrictEqual([
    '1^1^1^1',
    '1^1^2',   
  ]);
  expect(getUniqIdsSourceMap(prevIdsSource, [], false)).toEqual(prevIdsSource);
  expect(getUniqIdsSourceMap([], [], true)).toEqual([]);
});

//test getTextWithParentsInfo
test('getTextWithParentsInfo will concate the titles for all the parents in ids source map', () => {
  const idsSourceMap1 ='2^1'.split('^');
  const idsSourceMap2 ='1^1^1^1'.split('^');
  expect(getTextWithParentsInfo(
    jsonData.categories, 
    idsSourceMap1)
  ).toBe('Computers, Mac Books');
  
  expect(getTextWithParentsInfo(
    jsonData.categories, 
    idsSourceMap2
  )).toBe('Phones, Apple, iPhone6, 128GB');

  expect(getTextWithParentsInfo([], idsSourceMap2)).toEqual('');
  expect(getTextWithParentsInfo([], null)).toEqual('');
});

//test getAllChildrenIds
test('getAllChildrenIds will return ids source map for each nth child', () => {
  const computersNode = jsonData.categories[1];
  expect(getAllChildrenIds(computersNode.categories, '2')).toStrictEqual([
    '2^1'
  ]);
  
  const phonesNode = jsonData.categories[0];
  expect(getAllChildrenIds(phonesNode.categories, '1')).toStrictEqual([
    '1^1^1^1',
    '1^1^1^2',
    '1^1^1^3',
    '1^1^2',
    '1^2',
    '1^3'
  ]);
  
  const iPhoneNode = phonesNode.categories[0];
  expect(getAllChildrenIds(iPhoneNode.categories, '1^1')).toStrictEqual([
    '1^1^1^1',
    '1^1^1^2',
    '1^1^1^3',
    '1^1^2'
  ]);
  
  const iPhone6 = iPhoneNode.categories[0];
  expect(getAllChildrenIds(iPhone6.categories, '1^1^1')).toStrictEqual([
    '1^1^1^1',
    '1^1^1^2',
    '1^1^1^3'
  ]);
  
  expect(getAllChildrenIds([], '')).toEqual([]);
  expect(getAllChildrenIds(null, '')).toEqual([]);
  expect(getAllChildrenIds(null, null)).toEqual([]);
});

//getParentId
test('getParentId will concate params with special ^ character', () => {
  expect(getParentId(1, 2)).toBe('1^2');
  expect(getParentId('1^2', 3)).toBe('1^2^3');
  expect(getParentId('', 2)).toBe('2');
  expect(getParentId(1, '')).toEqual('');
  expect(getParentId('', '')).toEqual('');
});
