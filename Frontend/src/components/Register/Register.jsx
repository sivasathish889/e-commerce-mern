import React, { useState } from 'react'
import './register.css'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'
import  { SyncLoader } from "react-spinners"

const Register = () => {

  let [isLoading, setIsLoading] = useState(false)
  
  let navigate = useNavigate()

  let SendForm = async(e)=>{
    e.preventDefault()
    setIsLoading(true)
    let username = e.target[0].value
    let email = e.target[1].value
    let password1 = e.target[2].value
    let password2 = e.target[3].value

    if(username !==null || email !==null || password1 !==null || password2 !==null){
        let payLoad = {
          username,
          email,
          password1,
          password2
        }
 
      await axios.post("http://localhost:5000/register", payLoad,{ withCredentials :true })
      .then((data)=>{
          if(data.data.success){
            toast.success(data.data.message)
            setIsLoading(false)
            navigate("/register/verify")
          }
        }) 
      .catch((err)=>{
        if(!err.response.data.success){
          setIsLoading(false)
          toast.error(err.response.data.message)
        }
      })
      }
    else{ 
      toast.warning("Please fill the form") 
    }
    
    }
  return (
    <div>
      <div className="d-flex flex-column  align-items-center justify-content-center" style={{height:'80vh'}}>

        <form className="form d-flex flex-column p-5" method='POST'onSubmit={(e)=>SendForm(e)} >
          <h1 className='mb-5 border-bottom'>Create Account</h1>
            <input type="text" name='username' placeholder='Username' id='username' className='mb-3' required/>
            <input type="email" name='email' placeholder='E-mail' id='email' className='mb-3' required />
            <input type="password" name="password1" placeholder='Enter Your Password' id='password1'  className='mb-3'  required/>
            <input type="password" name="password2" placeholder='Confirm Password' id='password2' className='mb-3'required  />

            <div className="text-center">
              <button type="submit" className='w-50 btn btn-primary' >{ !isLoading? "Send OTP" : <SyncLoader size={3} color='white' /> }</button>
            </div>
        </form>
      </div>
    </div>
    )
}

export default Register