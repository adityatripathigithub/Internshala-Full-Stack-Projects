import React, { useEffect, useState } from 'react'
import axios from "../api/axios"
import Card from "../Internship/Card"
import { Link } from 'react-router-dom'

const Postedinternship = () => {
  const [allinternships, setallinternships] = useState()
  const findallinternship =async()=>{
    try {
      const {data} = await axios.post("/employe/internship/read")
      console.log(data);
      setallinternships(data.internships)
    } catch (error) {
      console.log(error);
      
    }
  }
  console.log(allinternships);
  useEffect(()=>{
    findallinternship()
  },[])
  return (
    <div className='w-[80%] mx-auto my-5'>
    <h1 className='text-center my-5 text-2xl font-semibold'>All posted internships</h1>
    <div className="cards flex flex-wrap justify-center gap-4">
        {allinternships?.length > 0 ? allinternships.map(job => <Card key={job._id} job={job}/>) : <Link to='/employe/creatinternships' className='px-4 py-1 bg-[#72D39D] rounded'>Create internships</Link> }
    </div>
</div>
  )
}

export default Postedinternship