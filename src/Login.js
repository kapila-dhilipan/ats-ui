import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PrimaryButton, TextField, initializeIcons } from '@fluentui/react';
import styles from "./Login.module.css"
import left from "./assets/login-bg.svg"
import logo from "./logo.svg"
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passRegex = /[A-Za-zÀ-ÖØ-öø-ÿ0-9~`! @#$%^&*()_\-+={[}\]|:;"'<,>.?/)]/;
const loginIcon = { iconName: 'Contact' };
const passIcon = {iconName: 'Lock'};


function Login() {

    initializeIcons();
    
    const navigateTo = useNavigate();
   
    const [userData,setUserData] = useState({
      email:'',
      password:''
    })

    const [errors,setErrors] = useState({
       email:'',
       password:''
    })

    const inputChangeHandler =(e)=>{
      const {name,value} = e.target;

      let inputValue = value;

      // email validation with 320 characters

      if(name==='email' && inputValue.length > 320){
        inputValue = inputValue.slice(0,320)
      }

      // password validation with 64 characters
      if(name==='password' && inputValue.length > 64){
        inputValue = inputValue.slice(0,64)
      }

      setUserData({
        ...userData,
        [name]: inputValue,
      })

      setErrors({
        ...errors,
        [name]: ''
      })
    }

    const submitHandler = ()=>{
      if(isEmailValid(userData.email) ){
        setErrors((prevState)=>{
          return{
            ...prevState,
            email: ""
          }
        })
      }
      if(isPassValid(userData.password) ){
        setErrors((prevState)=>{
          return{
            ...prevState,
            password: ""
          }
        })
      } 
      
      if(isEmailValid(userData.email) && isPassValid(userData.password)){
         navigateTo('/dashboard')
      }

    }

    const isEmailValid = (value)=>{

      if(value.length===0){
        setErrors((prevState)=>{
          return{
            ...prevState,
            email: "Required"
          }
        })
        return false;
      }

      if(!String(value).toLowerCase().match(emailRegex)){
        setErrors((prevState)=>{
          return{
            ...prevState,
            email: "Invalid Email"
          }
        })

        return false;
      }

      return true;
    }

    const isPassValid =(value)=>{

      if(value.length===0){
        setErrors((prevState)=>{
          return{
            ...prevState,
            password: "Required"
          }
        })
        return false;
      }
      if(value.length <8 || value.length >64 ){
        setErrors((prevState)=>{
          return{
            ...prevState,
            password: "Invalid Password"
          }
        })
        return false;

      }

      if(!value.match(passRegex)){
        setErrors((prevState)=>{
          return{
            ...prevState,
            password: "Invalid Password"
          }
        })
        return false;

      }

      return true;

    }

  return (
    <div className={styles.container}>

        <div className={styles.hero_container}>
            <img src={left} className={styles.hero_img}/>
        </div>

        <div className={styles.login_container}>
            
          <div className={styles.logo}><img src={logo}/></div>

          <div className={styles.title}>Login</div>

          <div>

            <div className={styles.input_container}>

              <TextField iconProps={loginIcon} 
                styles={errors.email ? errorField: normalField} 
                type="text" 
                name="email" 
                placeholder="Email" 
                onChange={inputChangeHandler} 
                value={userData.email}
              />

              <div className={styles.error}>{errors.email  ? <div>{errors.email}</div> : null}</div>

                <TextField iconProps={passIcon} 
                  styles={errors.password ? errorField: normalField}  
                  type="password" 
                  name="password" 
                  placeholder="Password" 
                  onChange={inputChangeHandler} 
                  value={userData.password}
                />

              <div className={styles.error}>{errors.password ? <div>{errors.password}</div> : null}</div>

            </div>
              
            <div className={styles.reset}><a href="">Reset Password</a></div>
          </div>

          <PrimaryButton text="Log in" onClick={submitHandler} className={styles.login_button}/> 
        </div>
    </div>
  );
}

//Css Over-Rides as per documentaions in Fluent UI

function normalField(props){
  const { required } = props;
    return ({fieldGroup: [{borderColor: 'grey'}]})
}

function errorField(props) {
  const { required } = props;
    return ({fieldGroup: [{borderColor: '#a80000'},]})
}

export default Login;