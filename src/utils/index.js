
/**
 * 
 * @param {prevIdsSource} exiting ids source map 
 * @param {newValues} new ids source map 
 * @param {isSelected} should add or remove 
 * @returns uniq array of ids source map
 */
 export const getUniqIdsSourceMap = (prevIdsSource, newValues, isSelected) => {
  let idsSource = [...prevIdsSource];
  newValues.forEach((val) => {
    const index = idsSource.findIndex((v) => v === val);
    if(index !== -1 && !isSelected){ //if found && action is remove
      idsSource.splice(index, 1)
    }
    if(index === -1 && isSelected) {//if found && parent seleced..
      idsSource.push(val);
    }    
  });
  return idsSource;
}


/**
 * 
 * @param {parentId}  
 * @param {id} 
 * @returns concatenated parent id. 
 */
export const getParentId = (parentId, id) => (
  parentId === '' ? id.toString() : `${parentId}^${id}`
);

/**
 * 
 * @param {categories}  
 * @param {parentId} 
 * @returns idsMap for all the nested 
 * categories childrens (nth nodes). 
 */
export const getAllChildrenIds = (categories, parentId) => {
  let ids = [];
  categories.forEach((cat) => {
    if(!cat?.categories && !cat.categories?.length){
      ids.push(getParentId(parentId, cat.id));
    }else{
      ids = [
        ...ids, 
        //recursive call to get childred ids
        ...getAllChildrenIds(cat.categories, getParentId(parentId, cat.id))
      ];
    }
  });
  return ids;
}

/**
 * 
 * @param {data} data to parse with parent ids
 * @param {ids} ids map with parent reference 
 * @returns concatenated string with all the parents titles. 
 */
 export const getTextWithParentsInfo = (data, ids) => {
  if (!ids.length || !data?.length) return '';

  //parse json tree and collect data
  return ids.reduce((
    [categories, str], 
    currentValue, 
    currentIndex
  ) => {
    const cat = categories[(currentValue-1)];       
    const text = `${str} ${cat.title}${((currentIndex !== (ids.length-1)) ? ', ' : '')}`;
    
    return [(cat?.categories || []), text];
  }, [data, '']);
}
