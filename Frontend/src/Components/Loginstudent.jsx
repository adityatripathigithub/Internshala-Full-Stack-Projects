import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import axios from "../Components/api/axios";
import { index } from "./context/Indexxontext";

const Loginstudent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, seterror] = useState("");
  const { student, setStudent } = useContext(index);
  
  
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/student';

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };
    try {
      const res = await axios.post("/student/signin", data);
      if(res.status ===200){
        setStudent(true)
        navigate(from);

      }
    } catch (error) {
      seterror(error.response.data.message);
    }
  };
  useEffect(() => {}, []);
  return (
    <div className="w-full">
      <div className="login py-10">
        <h1 className="text-center text-2xl font-semibold ">
          Login <Link to="/student/login">As Student</Link>
        </h1>
        <p className="text-center">or</p>
        <h1 className="text-center text-lg text-blue-500 font-semibold ">
          Login <Link to="/employe/login">As Employer</Link>
        </h1>
        <form
          className="w-[350px] shadow mx-auto p-10 rounded flex flex-col gap-2"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="email flex flex-col">
            <p>Email</p>
            <input
              className="px-3 py-2 border rounded"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="password flex flex-col">
            <p>Password</p>
            <input
              className="px-3 py-2 border rounded"
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="text-red-600">{error}</p>}
          <Link to={`/student/forget`} className="text-right mt-5 text-blue-600 cursor-pointer">
            Forget Password
          </Link>
          <button type="submit" className="bg-[#71D499] py-2 rounded">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Loginstudent;
