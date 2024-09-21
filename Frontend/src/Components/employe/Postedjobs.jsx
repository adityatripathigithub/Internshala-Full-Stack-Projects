import React, { useEffect, useState } from 'react'
import axios from '../api/axios'
import Card from '../Jobs/Card'
import { Link } from 'react-router-dom'

const Postedjobs = () => {
    const [alljob, setalljob]= useState()
    const alljobs = async()=>{
        try {
            const {data}  =await axios.post("/employe/job/read")
            console.log(data.jobs);
            setalljob(data.jobs)
        } catch (error) {
            console.log(error);
            
        }
    }
    const jobdata = async()=>{
        try {
            const {data}  =await axios.post("/employe/job/read")
            console.log(data.jobs);
            setalljob(data.jobs)
        } catch (error) {
            console.log(error);
            
        }
    }
    useEffect(()=>{
        alljobs()
    },[])
  return (
    <div className='w-[80%] mx-auto my-5'>
        <h1 className='text-center my-5 text-2xl font-semibold'>All Posted jobs</h1>
        <div className="cards flex flex-wrap justify-center gap-4">
            {alljob && alljob.length > 0 ? alljob.map(job => <Card key={job._id} job={job}/>) : <Link to='/employe/creatjobs' className='px-4 py-1 bg-[#72D39D] rounded'>Create Jobs</Link> }
        </div>
    </div>

  )
}

export default Postedjobs
