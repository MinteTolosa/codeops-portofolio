import React from 'react'
import "./Category.css"
function Category({onSelectCat}) {
 
  const categories = [
    "All" ,
    "Main Dish" ,
    "Side Dish" ,
    "Appetizer"
  ]
  return (
    <div className='category-container'>
        {categories.map((cats) => 
        (<button key={cats} onClick={()=>onSelectCat(cats)}>{cats}</button>)
        )}
    </div>
  )
}

export default Category