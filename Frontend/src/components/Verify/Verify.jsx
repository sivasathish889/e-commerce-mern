import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom"

const Verify = () => {
  let navigate = useNavigate()
  let [otp,setOtp] = useState('')

  let form = async(e) =>{
    e.preventDefault()
    let payLoad = {
      "otp" : e.target[0].value
    }

    axios.post("http://localhost:5000/register/verify", payLoad, {withCredentials :  true})
    .then((data)=>{
      if(data.data.success){
        toast.success(data.data.message)
        navigate("/")
      }
    }) 
  .catch((err)=>{
    if(!err.response.data.success){
      toast.error(err.response.data.message)
    }
  })
}

   return (
    <div>
      <div className="body d-flex flex-column justify-content-center align-items-center" style={{height:'80vh'}}>
        <form method='POST' onSubmit={(e)=>form(e)} className="form p-5">
          <h1 className='text-center mb-3 border-bottom'>OTP</h1>
          <input type="text" />
          <div className='text-center'>
          <button type="submit" className='btn btn-primary mt-4'>Register</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Verify