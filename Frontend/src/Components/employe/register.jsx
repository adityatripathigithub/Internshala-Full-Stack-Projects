import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios"
import { index } from "../context/Indexxontext";


const register = () => {
  const {employe} = useContext(index)
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contact, setContact] = useState("");
  const [organizationname, setorganizationname] = useState("")
  const [error, seterror] = useState("") 

  const [password, setPassword] = useState("");
  
  

  const navigate = useNavigate();

  const submitRegisterForm = async (e) => {
    e.preventDefault();
    const data2 = {
      email:email,
      firstname: firstName,
      lastname: lastName,
      contact :contact,
      organizationname:organizationname,
      password:password,
    };

    try {
      const {data} = await axios.post("/employe/signup", data2)
      console.log(data);
      navigate("/employe")
    } catch (error) {
      console.log(error);
      
    }


  };

  useEffect(()=>{

  },[employe])
  return (
    <div className="w-full">
    <div className="login py-10">
      <h1 className="text-center text-2xl font-semibold my-5">
        Register For Employer
      </h1>
      <form
        className="w-[80%] shadow mx-auto p-10 rounded flex flex-col gap-2"
        onSubmit={submitRegisterForm}
      >
        <div className="email flex flex-col">
          <p className="text-sm leading-2">Email</p>
          <input
            className="px-3 py-2 border rounded"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="firstName flex w-full gap-2">
          <div className="flex flex-col w-1/2">
            <p className="text-sm leading-2">First Name</p>
            <input
              className="px-3 py-2 border rounded"
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col w-1/2">
            <p className="text-sm leading-2">Last Name</p>
            <input
              className="px-3 py-2 border rounded"
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="contactDetails flex w-full gap-2">
          <div className="flex flex-col w-1/2">
            <p className="text-sm leading-2">Contact</p>
            <input
              className="px-3 py-2 border rounded"
              type="number"
              placeholder="Contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col w-1/2">
            <p className="text-sm leading-2">Organizationname</p>
            <input
              className="px-3 py-2 border rounded"
              type="text"
              placeholder="Organizationname"
              value={organizationname}
              onChange={(e) => setorganizationname(e.target.value)}
              required
            />
          </div>


        </div>
        <div className="password flex flex-col">
          <p className="text-sm leading-2">Password</p>
          <input
            className="px-3 py-2 border rounded"
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
       
        {error && <p className="text-red-600">{error}</p>}
        <p className="text-right mt-5 text-blue-600">Forget Password</p>
        <button type="submit" className="bg-[#71D499] py-2 rounded">
          Register As a Employe
        </button>
      </form>
    </div>
  </div>
  )
}

export default register