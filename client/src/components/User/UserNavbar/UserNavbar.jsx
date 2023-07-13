import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import UserLogo from '../../UI/UserLogo/UserLogo'
import styles from './UserNavbar.module.css'
import AuthContext from '../../../context/authContext'
import { useDispatch } from 'react-redux'
import { emptyCardSuccess } from '../../../redux/cartReducer'

const UserNavbar = () => {
const navigate=useNavigate()
 const dispatch=useDispatch()
  const {userData,logout}=useContext(AuthContext)

  const handleLogout = () => {
    navigate('/cart');
    dispatch(emptyCardSuccess());
   
    logout();
   
   
    
  };
 
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
        <button onClick={handleLogout}  >Logout </button>
        </li>
        </ul> 
      </div>
       
    </div>
  )
}

export default UserNavbar