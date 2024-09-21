import React from "react";
import emplyeimg from "../../assets/internship-concept-illustration_114360-6225.avif";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-full px-20 py-10 max-sm:px-4 ">
      <div className="center-part flex gap-10 justify-between max-sm:flex-col-reverse max-sm:gap-2">
        <div className="left w-2/3 py-5 max-sm:w-full">
          <h1 className="text-6xl font-semibold">Hire Interns & Freshers <br /> <span className="italic text-[#72D39D]">Faster</span></h1>
          <p className="text-lg">Post Internships for Free & Hire Talent with up to 2 Years <br /> of Experience</p>
          <div className="btn-job-internship mt-2 flex gap-3 max-sm:w-full">
           <Link to={`/employe/creatinternships`}> <button className="bg-[#72D39D] px-2 py-1 rounded" >Create Internship</button></Link>
            <Link to={`/employe/creatjobs`}><button className="bg-[#72D39D] px-2 py-1 rounded" >Create Jobs</button></Link>
          </div>
        </div>
        <div className="right w-1/3 max-sm:w-full">
          <img src={emplyeimg} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Home;
