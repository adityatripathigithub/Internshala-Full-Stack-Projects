import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { index } from "../context/Indexxontext";
import { toast } from "react-toastify";

const Jobdetails = () => {
  const { employe, studentdets } = useContext(index);
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState({});
  console.log(job);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    openings: "",
    organizationName: "",
    organizationLogo: "",
    perks: "",
  });

  const allJobs = async () => {
    try {
      const { data } = await axios.post(`/employe/job/read/${id}`);
      console.log(data.job);
      setJob(data.job);
      setFormData({
        title: data.job.title || "",
        description: data.job.description || "",
        location: data.job.location || "",
        salary: data.job.salary || "",
        openings: data.job.openings || "",
        organizationName: data.job.employe?.[0]?.organizationname || "",
        organizationLogo: data.job.employe?.[0]?.organizationlogo?.url || "",
        perks: data.job.perks || "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.post(`/employe/job/delete/${id}`);
      navigate("/"); // Redirect to home page or another appropriate page
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.post(`/employe/job/update/${id}`, formData);
      setIsEditing(false); // Close the form after successful update
      allJobs(); // Refresh job details
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handelApplyJob = async()=>{
    try {
      const {data} = await axios.post(`/student/apply/job/${id}`)
      console.log(data);
      toast.success("Applied for Job Successfully")
      navigate('/student/jobapplied')
    } catch (error) {
      console.log(error);
      
    }
  }
  useEffect(() => {
    allJobs();
  }, []);

  return (
    <div className="pb-10 px-10">
      <h1 className="text-2xl font-semibold text-center my-10 capitalize">
        {job.title}
      </h1>
      <div className="details-part w-[90%] mx-auto border-2 rounded-xl p-10  max-sm:px-4 max-sm:w-full">
        <div className="companyy flex items-center justify-between max-sm:flex-col-reverse ">
          <div className="companylist">
            <h1 className="text-lg font-semibold capitalize">{job.title}</h1>
            <p className="text-slate-600">{job.employe?.[0]?.organizationname}</p>
          </div>
          <div className="companylogo w-[100px] rounded-full h-[100px] bg-lime-100">
            <img className="w-full h-full object-cover rounded-full" src={job.employe?.[0]?.organizationlogo?.url} alt="" />
          </div>
        </div>
        <div className="location flex gap-3 max-sm:mt-2">
          <i className="ri-map-pin-line"></i>
          {job.location}
        </div>
        <div className="details flex gap-10 my-5 max-sm:my-1 max-sm:flex-col max-sm:gap-2">
          <div className="startdata">
            <p>
              <i className="ri-play-circle-line mr-2"></i>Start Date
            </p>
            <p className="text-sm">Immediate</p>
          </div>
          <div className="startdata">
            <p>
              <i className="ri-calendar-line mr-2"></i>Duration
            </p>
            <p className="text-sm">Full-Time</p>
          </div>
          <div className="startdata">
            <p>
              <i className="ri-money-rupee-circle-line mr-2"></i>Salary
            </p>
            <p className="text-sm">Annule CTC ₹ {job.salary}</p>
          </div>
        </div>
        <div className="dateposted-type flex items-center gap-3 justify-start">
          <p className="w-max bg-green-300 text-xs px-2 py-1 rounded">
            {job?.createdAt?.split("T")[0]}
          </p>
          <p className="bg-slate-300 w-max text-xs px-2 py-1 rounded">Job</p>
        </div>
        <hr className="my-4" />
        <div className="descriptiom">
          <h1 className="text-lg font-semibold mt-2">About Job </h1>
          <p>Job description</p>
          <p className="text-sm">{job.description}</p>
        </div>

        <div className="opening">
          <h1 className="text-lg font-semibold mt-2">Number Of Opening </h1>
          <p className="text-sm">{job.openings}</p>
        </div>

        <div className="opening">
          <h1 className="text-lg font-semibold mt-2">Responsibility</h1>
          <p className="text-sm">{job.responsibility}</p>
        </div>
        <div className="opening">
          <h1 className="text-lg font-semibold mt-2">Perks</h1>
           <ul className="text-sm">
          {job?.perks?.split(",").map((skill, index) => {
            console.log(index, skill.trim());
            return <li>- {skill.trim()}</li>;
          })}
        </ul>
        </div>
        <div className="opening">
          <h1 className="text-lg font-semibold mt-2">Skills</h1>
           <ul className="text-sm">
          {job?.skills?.split(",").map((skill, index) => {
            console.log(index, skill.trim());
            return <li key={index}>{index + 1}. {skill.trim()}</li>;
          })}
        </ul>
        </div>
        <div className="salary">
          <h1 className="text-lg font-semibold mt-2">Salary </h1>
          <p className="text-xs">Annual CTC: ₹ {job.salary}</p>
        </div>

        {employe ? (
          <div className="delete-and-update flex gap-3 mt-10">
            <button className="bg-red-400 px-6 py-1 rounded" onClick={handleDelete}>Delete</button>
            <button className="bg-[#71D499] px-6 py-1 rounded" onClick={() => setIsEditing(!isEditing)}>Update</button>
          </div>
        ) : (
          <div>
          {studentdets.student.jobs.find((obj) => obj._id === id) ? (
            <button
              
              className="bg-[#ef776a] px-6 py-1 rounded mt-10 "
            >
              All Ready Applied<i className="ri-arrow-right-s-line"></i>
            </button>
          ) : (
            <button onClick={handelApplyJob} className="bg-[#71D499] px-6 py-1 rounded mt-10">
              Apply<i className="ri-arrow-right-s-line"></i>
            </button>
          )}
        </div>
        )}

        {isEditing && (
          <div className="mt-10">
            <h2 className="text-lg font-semibold">Update Job</h2>
            <form className="flex flex-col gap-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Job Title</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Job Title" className="border p-2 rounded w-full" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Job Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Job Description" className="border p-2 rounded w-full"></textarea>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Location</label>
                <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" className="border p-2 rounded w-full" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Salary</label>
                <input type="number" name="salary" value={formData.salary} onChange={handleChange} placeholder="Salary" className="border p-2 rounded w-full" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Number of Openings</label>
                <input type="number" name="openings" value={formData.openings} onChange={handleChange} placeholder="Number of Openings" className="border p-2 rounded w-full" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Organization Name</label>
                <input type="text" name="organizationName" value={formData.organizationName} onChange={handleChange} placeholder="Organization Name" className="border p-2 rounded w-full" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Organization Logo URL</label>
                <input type="text" name="organizationLogo" value={formData.organizationLogo} onChange={handleChange} placeholder="Organization Logo URL" className="border p-2 rounded w-full" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Perks</label>
                <input type="text" name="perks" value={formData.perks} onChange={handleChange} placeholder="Perks" className="border p-2 rounded w-full" />
              </div>
              <button type="button" onClick={handleUpdate} className="bg-[#71D499] px-6 py-1 rounded">Save</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobdetails;
