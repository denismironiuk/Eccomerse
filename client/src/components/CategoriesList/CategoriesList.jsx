import React from 'react'
import styles from './CategoriesList.module.css'

const CategoriesList = ({subCategory,handleChange}) => {
 
  return (
    <div className={styles.filterItem}>
          <h2>Categories</h2>
          <ul>
          {subCategory?.map((item) => (
              <li
              className="option"
              key={item._id}
              onClick={() => handleChange(item._id)}
            >
              {item.subcategoryName}
            </li>
          ))}
          </ul>
       
        </div>
  )
}

export default CategoriesList