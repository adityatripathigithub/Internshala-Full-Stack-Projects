import React, { useState} from 'react'
import axios from '../api/axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Sendmain = () => {
    
    const navigate = useNavigate()

    const [email, setemail] = useState("")

    const sendemail = async(e)=>{
        e.preventDefault()
        try {
            const {data}  = await axios.post("/employe/send-mail", {email})
            console.log(data);
            if(data){
                toast.success("OTP Sent To Your Registerd Email Address")
                navigate("/employe/reset-password")
            }

        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div className='w-1/2  my-20 mx-auto'>
        <h1 className='text-center text-2xl font-semibold my-5'>Forget Password</h1>
        <form onSubmit={(e)=> sendemail(e)} className='w-full p-5  border rounded-md' action="">
            <input className='w-full px-4 py-2 border rounded-sm' placeholder='Write you Email' type="text"  value={email} onChange={e=>setemail(e.target.value)}/>
            <button className='mt-5 bg-[#71D499] px-4 py-2 rounded-sm'>Send OTP</button>
        </form>
    </div>
  )
}

export default Sendmain