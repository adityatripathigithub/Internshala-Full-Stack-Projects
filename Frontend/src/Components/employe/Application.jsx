import React, { useEffect, useState } from 'react'
import axios from "../api/axios"
import { Link } from 'react-router-dom'

const Application = () => {

  const [jobs, setjobs] = useState()
  const [internship, setinternship] = useState()

  const alljobsandinternship = async()=>{
    try {
      const {data} = await axios.post("/employe/student/applied/internship")
      // console.log(data.response);
      setjobs(data.jobsss);

      console.log(data.jobsss);
      setinternship(data.internship);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    alljobsandinternship()
  },[])
  return (
    <div className='px-20 py-10'>
      <h1 className='text-2xl text-center font-semibold text-[#71D499]'>Application</h1>
     
     <h1>Job Application</h1>

      <div className="intenships flex flex-col justify-center gap-3 mt-5 ">
      {jobs && jobs.length> 0 ?
        jobs.map((jobs, index) => (
          <div className="companydets flex items-center justify-between p-2 border rounded">
            <div className="role w-1/5">
            <div className="box w-[50px] h-[50px] bg-red-300">
              <img src={jobs?.avatar?.url} alt="" />
            </div>
            </div>
            <div className="company w-1/5">
              <h1 className="text-lg">Name</h1>
              <p className="text-sm">{jobs?.firstname} {jobs?.lastname}</p>
            </div>
            <div className="location w-1/5">
              <h1 className="text-lg">Email</h1>
              <p className="text-sm">{jobs?.email}</p>
            </div>
           <h1>Download resume</h1>
          </div>
        )) : <>You havent apply to any Internship</>}
      </div>

      <h1 className='mt-5'>Internship Application</h1>

      <div className="intenships flex flex-col justify-center gap-3 mt-5 ">
      {jobs && jobs.length> 0 ?
        jobs.map((jobs, index) => (
          <div className="companydets flex items-center justify-between p-2 border rounded">
            <div className="role w-1/5">
            <div className="box w-[50px] h-[50px] bg-red-300">
              <img src={jobs?.avatar?.url} alt="" />
            </div>
            </div>
            <div className="company w-1/5">
              <h1 className="text-lg">Name</h1>
              <p className="text-sm">{jobs?.firstname} {jobs?.lastname}</p>
            </div>
            <div className="location w-1/5">
              <h1 className="text-lg">Email</h1>
              <p className="text-sm">{jobs?.email}</p>
            </div>
           <h1>Download resume</h1>
          </div>
        )) : <>You havent apply to any Internship</>}
      </div>
  
    </div>
  )
}

export default Application