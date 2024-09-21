import React, { useContext, useEffect, useState } from "react";
import { index } from "../context/Indexxontext";
import {Link} from 'react-router-dom'

const Home = () => {
  const { studentdets } = useContext(index);
  const [student, setstudent] = useState({})
  console.log(student);
  console.log(studentdets);

  useEffect(()=>{
    setstudent(studentdets?.student)
  },[studentdets])

  return (
    <div className="w-full  max-sm:px-2 ">
      <div className="heaing-part my-5">
        <h1 className="text-center text-4xl font-semibold max-sm:text-lg">
          Hii  { student?.firstname  + " "+  student?.lastname}
        </h1>
        <p className="text-center max-sm:text-sm">Let's help you land your dream career</p>
      </div>

      <div className="create w-[60%] border mx-auto my-10 rounded-lg p-5 max-sm:w-full">
        <h1 className="text-2xl font-semibold max-sm:text-lg">To Do list</h1>
        <div className="addskills w-full mt-2 bg-[#d4fee5] p-4 rounded">
          <Link to="/student/resume"><div className="part1 flex items-center gap-3 justify-between">
            <div className="left flex items-center gap-4">
              <i className="ri-markup-line text-xl"></i>
              <div className="part1-1">
                <h1 className="text-xl font-medium max-sm:text-lg">Add Skills</h1>
                <p className="text-slate-600 leading-3 text-sm">
                  Add your skills
                </p>
              </div>
            </div>
            <i class="ri-arrow-right-s-line"></i>
          </div></Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
