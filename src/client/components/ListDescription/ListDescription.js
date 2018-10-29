import React from 'react';

// state less Component for only show the description of list
const ListDescription = (prop) =>{
  const {dataList} = prop;
  return(
    <div className='list-description'>
      <h3>{dataList.id}</h3>
      <h2>{dataList.name}</h2>
      <p>{dataList.description}</p>
    </div>
  )
}

export default ListDescription;
