import React, { useContext, useState, useEffect } from "react";
import logimg from "../../assets/joblogo.jpg";
import { Link, useNavigate } from "react-router-dom";
import  { index } from "../context/Indexxontext";

import axios from "../api/axios";

const Navbar = () => {
  const { student, employe, setStudent, setEmploye } = useContext(index);
  console.log(employe);

  const [studentDropdownOpen, setStudentDropdownOpen] = useState(false);
  const [employeDropdownOpen, setEmployeDropdownOpen] = useState(false);

  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogoutStudent = async (e) => {
    e.preventDefault();
    const response = await axios.get("/student/signout");
    if (response.status === 200) {
      setStudent(false);
    }
    navigate("/");
  };

  const handleLogoutEmploye = async (e) => {
    e.preventDefault();
    const response = await axios.get("/employe/signout");
    if (response.status === 200) {
      setEmploye(false);
    }
    navigate("/");
  };

  useEffect(() => {

  }, [employe, student]);

  const toggleStudentDropdown = () => {
    setStudentDropdownOpen(!studentDropdownOpen);
  };

  const toggleEmployeDropdown = () => {
    setEmployeDropdownOpen(!employeDropdownOpen);
  };
  useEffect(() => {}, [student, employe]);
  return (
    <div className="w-full h-[9vh] px-10 flex items-center justify-between capitalize max-sm:w-full max-sm:px-5 ">
      <div className="logodiv w-[150px]">
        <img src={logimg} alt="" />
      </div>
      <div className="links flex gap-3 text-[#02203C] max-sm:hidden">
        {
          employe? (
            <>
              
            </>
          ) : (
            <>
              <Link to={`/`}> Home</Link>
              <Link to={`/internships`}> Internship</Link>
              <Link to={`/jobs`}> Job</Link>
            </>
          )
        }
      </div>
      {student ? (
        <div className="options flex gap-4 items-center z-20">
          <div className="Search">
            <i className="ri-search-2-line"></i>
          </div>
          <div className="dropdown relative">
            <button
              className="border-[#71D499] border-[1px] px-2 py-1 rounded"
              onClick={toggleStudentDropdown}
            >
              Student
            </button>
            {studentDropdownOpen && (
              <div className="origin-top-right absolute right-0 mt-2 w-48  z-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div
                  className="py-1 "
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="student-options-menu"
                >
                  <Link
                    to="/"
                    className="max-sm:block max-2xl:hidden px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                    onClick={toggleStudentDropdown}
                  >
                    Home
                  </Link>
                  <Link
                    to="/student"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                    onClick={toggleStudentDropdown}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/internships"
                    className="max-sm:block max-2xl:hidden px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                    onClick={toggleStudentDropdown}
                  >
                    Internship
                  </Link>
                  <Link
                    to="/jobs"
                    className="max-sm:block max-2xl:hidden px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                    onClick={toggleStudentDropdown}
                  >
                    Jobs
                  </Link>
                  <Link
                    to="/student/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                    onClick={toggleStudentDropdown}
                  >
                    profile
                  </Link>
               
                  
                  <Link
                    to="/student/resume"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                    onClick={toggleStudentDropdown}
                  >
                    Resume
                  </Link>
                  <Link
                    to="/student/jobapplied"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                    onClick={toggleStudentDropdown}
                  >
                    Job Applied
                  </Link>

                  <Link
                    to="/student/internshipapplied"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                    onClick={toggleStudentDropdown}
                  >
                    Internship Applied
                  </Link>

                 
                  <button
                    onClick={(e) => handleLogoutStudent(e)}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : employe ? (
        <div className="options flex gap-4 items-center">
          <div className="Search">
            <i className="ri-search-2-line"></i>
          </div>
          <div className="dropdown relative">
            <button
              className="border-[#71D499] border-[1px] px-2 py-1 rounded"
              onClick={toggleEmployeDropdown}
            >
              Employee
            </button>
            {employeDropdownOpen && (
              <div className="origin-top-right absolute z-50 right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="employee-options-menu"
                >
                  <Link
                    to="/employe"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                    onClick={toggleEmployeDropdown}
                  >
                    home
                  </Link>
                  <Link
                    to="/employe/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                    onClick={toggleEmployeDropdown}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/employe/creatjobs"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                    onClick={toggleEmployeDropdown}
                  >
                    Create Job
                  </Link>

                  <Link
                    to="/employe/postedjobs"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                    onClick={toggleEmployeDropdown}
                  >
                    All posted Jobs
                  </Link>
                  <Link
                    to="/employe/creatinternships"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                    onClick={toggleEmployeDropdown}
                  >
                    Create Internship
                  </Link>
                  <Link
                    to="/employe/postedinternship"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                    onClick={toggleEmployeDropdown}
                  >
                    All posted Internship
                  </Link>
 

                  <Link
                    to="/employe/peopleapplied"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                    onClick={toggleEmployeDropdown}
                  >
                    People Applied
                  </Link>
                  <button
                    onClick={(e) => handleLogoutEmploye(e)}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <>
      
         <div className="relative">
         <div className="options flex gap-4 items-center max-sm:hidden">
           <div className="Search">
             <i className="ri-search-2-line"></i>
           </div>
           <div className="login">
             <Link
               className="border-[#71D499] border-[1px] px-2 py-1 rounded"
               to={`/student/login`}
             >
               Login
             </Link>
           </div>
           <div className="Candidate Sign Up">
             <Link
               className="bg-[#71D499]  px-2 py-1 text-white rounded"
               to={`/student/register`}
             >
               Candidate Sign-Up
             </Link>
           </div>
           <div className="Employee Sign Up">
             <Link
               className="bg-[#71D499] px-2 py-1 text-white rounded"
               to={`/employe/register`}
             >
               Employee Sign-Up
             </Link>
           </div>
         </div>
         <div className="sm:hidden">
           <button
             className="text-slate-800 focus:outline-none"
             onClick={toggleMenu}
           >
             <svg
               className="w-6 h-6"
               fill="none"
               stroke="currentColor"
               viewBox="0 0 24 24"
               xmlns="http://www.w3.org/2000/svg"
             >
               <path
                 strokeLinecap="round"
                 strokeLinejoin="round"
                 strokeWidth="2"
                 d="M4 6h16M4 12h16M4 18h16"
               ></path>
             </svg>
           </button>
         </div>
         {isOpen && (
           <div className="absolute right-0 mt-2 w-[200px] bg-white rounded-md shadow-lg sm:hidden">
             <div className="px-2 pt-2 pb-3 space-y-1">
               <Link
                 className="block border-[#71D499] border-[1px] px-2 py-1 rounded"
                 to={`/student/login`}
                 onClick={toggleMenu}
               >
                 Login
               </Link>
               <Link
                 className="block bg-[#71D499] px-2 py-1 text-slate-800 rounded"
                 to={`/student/register`}
                 onClick={toggleMenu}
               >
                 Candidate Sign-Up
               </Link>
               <Link
                 className="block bg-[#71D499] px-2 py-1 text-slate-800 rounded"
                 to={`/employe/register`}
                 onClick={toggleMenu}
               >
                 Employee Sign-Up
               </Link>
             </div>
           </div>
         )}
       </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
