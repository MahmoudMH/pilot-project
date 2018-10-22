import React from 'react';


const List = (prop) =>{
  const { onClickList } = prop;
  return(
    <div onClick={
      () => {
        onClickList(prop.id)
      }
    } className='list'>
      <h1>{prop.id}</h1>
      <h3>{prop.name}</h3>
    </div>
  )
}

export default List;
