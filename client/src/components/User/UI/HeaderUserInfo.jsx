import React from 'react'
import styles from './HeaderUserInfo.module.css'

const HeaderUserInfo = ({name,description}) => {
  return (
    <div className={styles.title}>
    <h2>{name}</h2>

    <p>{description}</p>
  </div>
  )
}

export default HeaderUserInfo