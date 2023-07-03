import React from 'react'
import styles from './LoadingPage.module.css'


const LoadingPage = () => {
  return (
    <div className={styles.container} >
        <img className={styles.logo} width={'100px'} height={'auto'} alt="" />
        <div class={styles.lds__ellipsis}><div></div><div></div><div></div><div></div></div>
    </div>
  )
}

export default LoadingPage