import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import UserLogo from '../../UI/UserLogo/UserLogo'
import styles from './UserNavbar.module.css'
import AuthContext from '../../../context/authContext'
const UserNavbar = () => {
  const {userData}=useContext(AuthContext)
  return (
    <div className={styles.container}>
      <div className={styles.sticky}>
      <div className={styles.logo__container
        }>
        <UserLogo content={'header__logo'} userData={userData}/>
        </div>
       
       <ul className={styles.container__nav}>
        <li>
           <NavLink to={'/user'} >Photo</NavLink>
        </li>
        <li>
        <NavLink to={'account'} className={({isActive})=>isActive ?(styles.active):('')}>Account Security </NavLink>
        </li>
        <li>
        <NavLink to={'/dashboard/purchase-history'} className={({isActive})=>isActive ?(styles.active):('')}>Orders Detail </NavLink>
        </li>
        <li>
        <button >Logout </button>
        </li>
        </ul> 
      </div>
       
    </div>
  )
}

export default UserNavbar