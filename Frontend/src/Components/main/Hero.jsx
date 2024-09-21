import React, { useContext, useEffect } from "react";
import homepagelogo from "../../assets/hompage  img.webp";
import Page2 from "./Page2";
import Showinternship from "./Showinternship";
import ShowJobs from "./ShowJobs";
import axios from '../api/axios'
import { index } from "../context/Indexxontext";
import Animation from "./Animation";

const Hero = () => {




  useEffect(()=>{
  
  },[])
  return (
    <div className=" w-full">
      <div className="page1 px-10 flex justify-around max-sm:flex-col-reverse max-sm:p-2">
      <div className="leftdiv px-10 pt-32 w-1/2 max-sm:w-full max-sm:px-2 max-sm:pt-0">
        <h1 className=" text-6xl max-sm:text-4xl font-sans  leading-20 font-semibold ">Got <span className="text-[#5bd28b] italic"> Talent?</span></h1>
        <h1 className=" text-6xl font-sans  leading-20 font-semibold max-sm:text-4xl "><span className="text-[#59d289] italic">Meet </span> Opportunity</h1>
        <p className="text-md text-[#02203C] font-thin mt-6 w-full">Discover your dream job with our user-friendly platform. Browse thousands of listings, upload your resume, and get matched with top employers. Start your career journey today and unlock endless opportunities in your field. Sign up now!</p>

        <div className="loginorsignupbtn flex gap-4 mt-20 max-sm:mt-4">
          <button className="bg-[#71D499] px-2 py-1 text-[#fff] rounded max-sm:text-sm">Candidate Sign-up</button>
          <button className="bg-[#71D499] px-2 py-1 text-[#fff] rounded">Employer Sign-up</button>
        </div>
        {/* <div className="brand mt-6 ">
          <h1>Trusted by Leading Brands</h1>
          <div className="companylogs-with-name ">
            <div className="company-1 flex gap-2 items-center bg-[white] w-max text-[#59d289] px-2 py-1 rounded">
              <i class="ri-github-line"></i>
              <h2>Gituhub</h2>
            </div>
          </div>
        </div>

        <h2 className=" mt-1">Populer Searches </h2>
        <div className="serchesdiv flex gap-2 flex-wrap">
          <p className="text-[#59d289] bg-white px-2 py-1 rounded">Data Managment</p>
          <p className="text-[#59d289] bg-white px-2 py-1 rounded">Data Managment</p>
          <p className="text-[#59d289] bg-white px-2 py-1 rounded">Data Managment</p>
        </div> */}
      </div>
      <div className="rigt w-[475px] max-sm:w-full">
        <img className="w-full h-full object-cover" src={homepagelogo} alt="" />
      </div>
      </div>
      <Animation/>
      <Showinternship/>
      <ShowJobs/>
    </div>
  );
};

export default Hero;

