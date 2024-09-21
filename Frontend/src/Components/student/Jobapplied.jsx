
import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { Link } from "react-router-dom";

const Jobapplied = () => {
  const [jobs, setjobs] = useState();
  const intershipapplied = async () => {
    try {
      const { data } = await axios.post("/student/job/applied");
      console.log(data.student?.jobs);
      setjobs(data.student?.jobs);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(jobs);
  useEffect(() => {
    intershipapplied();
  }, []);
  return (
    <div className="w-full px-20 py-10">
      <h1 className="text-2xl font-semibold">All Internships</h1>

      <div className="intenships flex flex-col justify-center gap-3 mt-5">
      {jobs && jobs.length> 0 ?
        jobs.map((jobs, index) => (
          <div className="companydets flex items-center justify-between p-2 border rounded">
            <div className="role w-1/5">
              <h1 className="text-lg">Role</h1>
              <p className="text-sm">{jobs.title}</p>
            </div>
            <div className="company w-1/5">
              <h1 className="text-lg">Company</h1>
              <p className="text-sm">{jobs?.employe?.organizationname}</p>
            </div>
            <div className="location w-1/5">
              <h1 className="text-lg">Location</h1>
              <p className="text-sm">{jobs.location}</p>
            </div>
            <div className="location w-1/5">
              <h1 className="text-lg">Stipend</h1>
              <p className="text-sm"> ₹ {jobs.salary}</p>
            </div>
            <Link className="bg-[#72D39D] px-4 rounded py-1" to={`/jobs/details/${jobs._id}`}>
              See Details
            </Link>
          </div>
        )) : <>You havent apply to any Internship</>}
      </div>
  
     
    </div>
  );
};

export default Jobapplied;
