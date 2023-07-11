import React, { useContext } from 'react'
import AccountSecurity from '../../../components/User/Account/AccountSecurity'
import AuthContext from '../../../context/authContext'

const AccountSecurityPage = () => {
  const {userData,token,updateUser}=useContext(AuthContext)
  return (
    <AccountSecurity userData={userData} token={token} updateUser={updateUser}/>
  )
}

export default AccountSecurityPage