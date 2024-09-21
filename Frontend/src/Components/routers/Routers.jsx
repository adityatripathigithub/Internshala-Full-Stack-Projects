import React, { useContext, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Hero from "../main/Hero";
import Internshipdetails from "../main/Internshipdetails";
import Jobdetails from "../main/Jobdetails";
import Showinternships from "../Internship/Showinternships";
import Showinternship from "../main/Showinternship";
import ShowJobs from "../main/ShowJobs";
import StudentLogin from "../Loginstudent";
import EmployeLogin from "../Employelogin";
import StudentHome from "../student/Home";
import EmployeHome from "../employe/Home";
import StudentRegister from "../student/Register";
import EmployeRegister from "../employe/register";
import { index } from "../context/Indexxontext";
import CreateInternship from "../employe/CreateInternship";
import Createjob from "../employe/Createjob";
import Application from "../employe/Application";
import Profile from "../student/Profile";
import Jobapplied from "../student/Jobapplied";
import Internshipapplie from "../student/Internshipapplie";
import Resume from "../student/Resume";
import Changepasswordd from "../student/Changepasswordd";
import Postedjobs from "../employe/Postedjobs";
import Postedinternship from "../employe/Postedinternship";
import Employeprofile from "../employe/Profile";
import ProtectedRoute from "./ProtectedRoute";
import Error from "../utils/Error";
import Forgetemial from "../main/Forgetemial";
import Resetpassword from "../main/Resetpassword";
import Sendmain from "../employe/Sendmain";
import Foregtpassword from "../employe/Foregtpassword";

const Routers = () => {
  const { studentloggedin, employeloggedin, student, employe } =
    useContext(index);
  useEffect(() => {}, [studentloggedin, employeloggedin]);

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route
          path="/internships/details/:id"
          element={student && student ? <Internshipdetails/> :
            <ProtectedRoute element={Internshipdetails} userType="student" />
          }
        />
        <Route
          path="/jobs/details/:id"
          element={student ? <Jobdetails/> :<ProtectedRoute element={Jobdetails} userType="student" />}
        />
        <Route path="/internships" element={<Showinternship />} />
        <Route path="/jobs" element={<ShowJobs />} />
        <Route path="/student/login" element={<StudentLogin />} />
        <Route path="/employe/login" element={<EmployeLogin />} />
        <Route path="/student" element={<StudentHome />} />
        <Route path="/student/profile" element={<Profile />} />
        <Route path="/student/jobapplied" element={<Jobapplied />} />
        <Route
          path="/student/internshipapplied"
          element={<Internshipapplie />}
        />
        <Route path="/student/resume" element={<Resume />} />
        <Route path="/student/changepassword" element={<Changepasswordd />} />
        <Route path="/employe" element={<EmployeHome />} />
        <Route path="/student/register" element={<StudentRegister />} />
        <Route path="/employe/register" element={<EmployeRegister />} />
        <Route
          path="/employe/creatinternships"
          element={<CreateInternship />}
        />
        <Route path="/employe/creatjobs" element={<Createjob />} />
        <Route path="/employe/postedjobs" element={<Postedjobs />} />
        <Route
          path="/employe/postedinternship"
          element={<Postedinternship />}
        />
        <Route path="/employe/peopleapplied" element={<Application />} />
        <Route path="/employe/profile" element={<Employeprofile />} />
        <Route path="/student/forget" element={<Forgetemial />} />
        <Route path="/employe/forget" element={<Sendmain />} />
        <Route path="/student/reset-password" element={<Resetpassword />} />
        <Route path="/employe/reset-password" element={<Foregtpassword />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
};

export default Routers;
