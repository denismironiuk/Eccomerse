import React, { useContext, useState } from "react";
import styles from "./UserAvatar.module.css";
import Anonimus from "../../../assets/anonymous_3.png";
import AuthContext from "../../../context/authContext";
import HeaderUserInfo from "../UI/HeaderUserInfo";
const UserAvatar = () => {

const {token,updateUser}=useContext(AuthContext)
  const[avatar,setAvatar]=useState(null)
  const[previewAvatar,setPreviewAvatar]=useState()

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setPreviewAvatar(URL.createObjectURL(file));
    setAvatar(file);
  };

  const handleSubmit=(e) => {
    e.preventDefault();
    const formData=new FormData()
    formData.append('image',avatar)
    async function uploadImageProfile(){
      try{
        const response=await fetch(process.env.REACT_APP_API_ENDPOINT+'/update/image',{
  
          headers:{
            'Authorization':'Bearer '+token
          },
          method:'POST',
          body:formData
        })
        const resData=await response.json()
        updateUser(resData.user)
      }
      catch(err){
        console.log(err)
      }

    }
    uploadImageProfile()
  }

  return (
    <div className={styles.container}>
     <HeaderUserInfo name="Photo" description="Add a nice photo of yourself for your profile."/>
      <div className={styles.form}>
        <div className={styles.preview}>
          <h2>Image preview</h2>
          <figure>
            <img  src={previewAvatar ?(previewAvatar):(Anonimus)} alt="" />
          </figure>
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="">Add / Change Image</label>
          <input type="file"  onChange={handleImageChange} required/>
          <button>Save</button>
        </form>
      </div>
      
    </div>
  );
};

export default UserAvatar;
