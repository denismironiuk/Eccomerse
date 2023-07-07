import React from 'react'
import styles from './CategoriesList.module.css'

const CategoriesList = ({subCategory,handleChange}) => {
  return (
    <div className={styles.filterItem}>
          <h2>Product Categories</h2>
          {subCategory?.map((item) => (
            <div className={styles.inputItem} key={item._id}>
              <input
                type="checkbox"
                id={item._id}
                value={item._id}
                onChange={handleChange}
              />
              <label htmlFor={item._id}>{item.subcategoryName}</label>
            </div>
          ))}
        </div>
  )
}

export default CategoriesList