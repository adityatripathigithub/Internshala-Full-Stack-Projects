import React, { useEffect, useState } from 'react'
import Card from '../Jobs/Card'
import axios from '../api/axios'


const ShowJobs = () => {
  const [job ,setjob] = useState([])
  const alljobs = async ()=>{
    try {
      const {data} = await axios.post("/student/alljobs")
      setjob(data.jobs)
    } catch (error) {
      console.log(error);
      
    }
  }
  console.log(job);
  useEffect(()=>{
    alljobs()
  },[])

  return (
    <div className='px-10'>
        <h1 className='text-center my-16 text-4xl text-[#02203C] font-medium'>Jobs</h1>
        <div className="internship flex flex-wrap justify-center gap-4 pb-10">
        {
          job.length >0 ? job.map((jos)=> <Card job={jos}/> ):<div className="text-center text-2xl">Loading.....</div>

        }
        </div>
    </div>
  )
}

export default ShowJobs