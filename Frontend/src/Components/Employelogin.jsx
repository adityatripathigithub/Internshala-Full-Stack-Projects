import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "../Components/api/axios";
import { index } from "./context/Indexxontext";

const Loginstudent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, seterror] = useState("");
  const {setEmploye ,employe } = useContext(index);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/employe';
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
    };
    try {
      const res = await axios.post("/employe/signin", data);
      console.log(res);
      if(res.data.success===true){
        setEmploye (true)
        navigate(from);
        navigate("/employe")
      }
    } catch (error) {
      seterror(error.response.data.message);
    }
  };

  useEffect(() => {
  },[employe]);
  return (
    <div className="w-full">
      <div className="login py-10">
        <h1 className="text-center text-2xl font-semibold ">
          Login <Link to="/employe/login">Employe</Link>
        </h1>
        <p className="text-center">or</p>
        <h1 className="text-center text-lg text-blue-500 font-semibold ">
          Login <Link to="/student/login">Student</Link>
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
          <Link to={`/employe/forget`} className="text-right mt-5 text-blue-600 cursor-pointer">
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
