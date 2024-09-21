import React from "react";
import { Link } from "react-router-dom";

const Card = ({ job }) => {
  const { status, amount } = job.stipend || {};

  
  // console.log(job); // Destructure stipend properties


  return (
    <div className="w-[250px] h-[300px] shadow-sm rounded border-[1px] p-3 relative">
      <div className="company-logo-name flex items-center justify-between">
        <div className="name-position">
          <h2 className="text-lg leading-3 font-semibold capitalize">{job.profile}</h2>
          <p className="text-sm">{job?.employe?.organizationname}</p>
        </div>
        <div className="company-logo w-[60px] h-[60px] rounded-full">
          <img className="w-full h-full object-cover rounded-full" src={job?.employe?.organizationlogo?.url} alt="" />
        </div>
      </div>
      <hr className="my-3 text-[#71D499]" />
      <div className="location-stipend duration flex flex-col gap-1">
        <div className="location flex gap-3 text-sm">
          <i className="ri-map-pin-2-line"></i>
          <h3>{job.location}</h3>
        </div>
        <div className="stipend flex gap-3 text-sm">
          <i className="ri-money-rupee-circle-line"></i>
          <h3>
            <strong>₹</strong> {status} - {amount ? `${amount} / month` : "N/A"}
          </h3>
        </div>
        <div className="month flex gap-5 text-sm">
          <i className="ri-calendar-2-line"></i>
          <h3>Full-Time</h3>
        </div>
      </div>
      <div className="tag-gotodetails absolute items-center flex w-[90%] justify-between bottom-4">
        <h1 className="w-max bg-slate-300 px-2 py-1 text-xs rounded">internship</h1>
        <button className="bg-[#71D499] px-2 py-1 text-slate-800 rounded absolute right-0">
          <Link to={`/internships/details/${job._id}`}>
            Go to Details <i className="ri-arrow-right-s-line"></i>
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Card;
