import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from "./Login.module.scss";
import { auth,provider } from './config';
import  {signInWithPopup} from "firebase/auth"
import Button from '~/components/Button/Button';

const cx = classNames.bind(styles);

function Login() {
  
  function handleClick ()  {
      signInWithPopup(auth,provider).then((data)=>{
        localStorage.setItem("userID",data.user.uid);
        localStorage.setItem("name",data.user.displayName);
        localStorage.setItem("imgURL",data.user.photoURL);        
        handleFetchAPI()
        window.location.reload();
        })
  }

  const handleFetchAPI = async () =>{
    const userID =  localStorage.getItem("userID");
    const name = localStorage.getItem("name");
    const imgURL = localStorage.getItem("imgURL");
    const response = await fetch('http://localhost:3001/api/login/',{
            method:'POST',
            mode:'cors',
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
              userID: userID,
              name: name,
              imgURL:imgURL
            }),
          })
    const data = await response.json();
    localStorage.setItem("accessToken",data.accessToken);
  }
  console.log(localStorage)
  return (
    <div>
      <Button primary onClick={handleClick}>Login</Button>
    </div>

  );
}

export default Login;