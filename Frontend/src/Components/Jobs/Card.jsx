import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { index } from "../context/Indexxontext";

const Card = ({ job }) => {
    const { employe } = useContext(index);
    // console.log(job);

    const organizationName = job?.employe?.[0]?.organizationname || "N/A";
    const organizationLogoUrl = job?.employe?.[0]?.organizationlogo?.url || "https://d2jhcfgvzjqsa8.cloudfront.net/storage/2022/04/download.png.webp";

    return (
        <div className="w-[250px] h-[300px] shadow-sm  rounded border-[1px]  p-3 relative">
            <div className="company-logo-name flex items-center justify-between">
                <div className="name-position">
                    <h2 className="text-lg leading-5 font-semibold capitalize">{job?.title.slice(0, 20)}</h2>
                    <p className="text-sm">{organizationName}</p>
                </div>
                <div className="comoany-logo w-[60px] h-[60px] rounded-full ">
                    <img className="w-full h-full object-cover rounded-full" src={organizationLogoUrl} alt="" />
                </div>
            </div>
            <hr className="my-3 text-[#71D499]" />
            <div className="location-stipend duration flex flex-col gap-1  ">
                <div className="stipend flex gap-3 text-sm">
                    <i className="ri-money-rupee-circle-line"></i>
                    <h3>
                        {" "}
                        <strong>₹ </strong>
                        {job.salary}/ year
                    </h3>
                </div>
                <div className="month flex gap-3 text-sm">
                    <i className="ri-calendar-2-line"></i>
                    <h3>Full-Time</h3>
                </div>
                <div className="month flex gap-3 text-sm">
                    <i className="ri-shake-hands-line"></i>
                    <h3>{job.perks}</h3>
                </div>
            </div>
            <div className="tag-gotodetails absolute items-center flex w-[90%] justify-between bottom-4 ">
                <h1 className="w-max bg-slate-300 px-2 py-1 text-xs rounded">job</h1>
                <button className="bg-[#71D499] px-2 py-1 text-slate-800 rounded absolute right-0 ">
                    <Link to={`/jobs/details/${job._id}`}>
                        Go to Details <i className="ri-arrow-right-s-line"></i>
                    </Link>
                </button>
            </div>
        </div>
    );
};

export default Card;
