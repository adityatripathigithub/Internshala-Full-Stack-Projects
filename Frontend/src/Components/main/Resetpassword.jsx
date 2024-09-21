import React, { useState } from 'react'
import axios from "../api/axios"
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

const Resetpassword = () => {
    const [password, setNewPassword] = useState("")
    const [email, setEmail] = useState("")
    const [otp, setOtp] = useState("")
    const [error, seterror] = useState("")
    

    const navigate = useNavigate()
    const handleOTP = async(e) => {
        e.preventDefault()
        try {
            const {data} = await axios.post("/student/forget-link", {email, password, otp})
            console.log(data);
            if(data){
               toast.success("OTP Sent To Your Registerd Email Address")
               navigate("/student/login")
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='w-1/2 my-10 mx-auto'>
            <form onSubmit={handleOTP} className='w-full p-5 border rounded-md flex gap-2 flex-col'> 
                <input 
                    className='rounded border px-4 py-2' 
                    type="email" 
                    name='email' 
                    placeholder='Email' 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />
                <input 
                    className='rounded border px-4 py-2' 
                    type="password" 
                    name='password' 
                    placeholder='New Password' 
                    value={password} 
                    onChange={(e) => setNewPassword(e.target.value)} 
                />
                <input 
                    className='rounded border px-4 py-2' 
                    type="text" 
                    name='otp' 
                    placeholder='OTP' 
                    value={otp} 
                    onChange={(e) => setOtp(e.target.value)} 
                />
                <button className='w-max mt-5 bg-[#71D499] px-4 py-2 rounded'>Submit</button>
            </form>
        </div>
    )
}

export default Resetpassword
