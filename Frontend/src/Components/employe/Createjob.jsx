import React, { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const CreateJob = () => {
  const navigate = useNavigate();
  const [jobDetails, setJobDetails] = useState({
    title: "",
    skills: "",
    jobType: "In-office", // Default to one of the enum values
    openings: "",
    description: "",
    preferences: "",
    salary: "",
    perks: "",
    location: "",
    assessments: "",
    responsibility: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobDetails({
      ...jobDetails,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/employe/job/create", jobDetails);
      console.log("Job created successfully:", response.data);
      // Reset form after successful submission
      setJobDetails({
        title: "",
        skills: "",
        jobType: "In-office",
        openings: "",
        description: "",
        preferences: "",
        salary: "",
        perks: "",
        location: "",
        assessments: "",
        responsibility: "",
      });
      navigate('/employe/postedjobs');
    } catch (error) {
      console.error("Error creating job:", error);
    }
  };

  return (
    <div className="pb-10 px-10 max-sm:px-4">
      <h2 className="text-2xl font-semibold text-center my-10">Create Job</h2>
      <form
        className="w-[90%] mx-auto border-2 rounded-xl px-10 py-10 max-sm:px-4 max-sm:w-full"
        onSubmit={handleSubmit}
      >
        <div className="form-group mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            className="w-full px-4 py-2 border rounded-md"
            type="text"
            name="title"
            value={jobDetails.title}
            onChange={handleChange}
            placeholder="Title - Add Job Role Title"
            required
          />
        </div>
        <div className="form-group mb-4">
          <label className="block text-gray-700">Skills</label>
          <input
            className="w-full px-4 py-2 border rounded-md"
            type="text"
            name="skills"
            value={jobDetails.skills}
            onChange={handleChange}
            placeholder="More Than One Skill Add ( , ) - Html,css,javascript"
            required
          />
        </div>
        <div className="form-group mb-4">
          <label className="block text-gray-700">Location</label>
          <input
            className="w-full px-4 py-2 border rounded-md"
            type="text"
            name="location"
            value={jobDetails.location}
            onChange={handleChange}
            placeholder="More Than One Location Add ( , ) - Pune,Delhi,Noida"
            required
          />
        </div>
        <div className="form-group mb-4">
          <label className="block text-gray-700">Job Type</label>
          <select
            className="w-full px-4 py-2 border rounded-md"
            name="jobType"
            value={jobDetails.jobType}
            onChange={handleChange}
            required
          >
            <option value="In-office">In-office</option>
            <option value="Remote">Remote</option>
          </select>
        </div>
        <div className="form-group mb-4">
          <label className="block text-gray-700">Openings</label>
          <input
            className="w-full px-4 py-2 border rounded-md"
            type="number"
            name="openings"
            value={jobDetails.openings}
            onChange={handleChange}
            placeholder="Number of Openings"
            required
          />
        </div>
        <div className="form-group mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            className="w-full px-4 py-2 border rounded-md"
            name="description"
            value={jobDetails.description}
            onChange={handleChange}
            placeholder="Job Description"
            required
          />
        </div>
        <div className="form-group mb-4">
          <label className="block text-gray-700">Preferences</label>
          <textarea
            className="w-full px-4 py-2 border rounded-md"
            name="preferences"
            value={jobDetails.preferences}
            onChange={handleChange}
            placeholder="Job Preferences"
            required
          />
        </div>
        <div className="form-group mb-4">
          <label className="block text-gray-700">Salary</label>
          <input
            className="w-full px-4 py-2 border rounded-md"
            type="number"
            name="salary"
            value={jobDetails.salary}
            onChange={handleChange}
            placeholder="Salary In CTC/year"
            required
          />
        </div>
        <div className="form-group mb-4">
          <label className="block text-gray-700">Perks</label>
          <input
            className="w-full px-4 py-2 border rounded-md"
            type="text"
            name="perks"
            value={jobDetails.perks}
            onChange={handleChange}
            placeholder="Perks That You Provide"
            required
          />
        </div>
        <div className="form-group mb-4">
          <label className="block text-gray-700">Assessments</label>
          <input
            className="w-full px-4 py-2 border rounded-md"
            type="text"
            name="assessments"
            value={jobDetails.assessments}
            onChange={handleChange}
            placeholder="Job Assessment - What kind of Test you Take"
            required
          />
        </div>
        <div className="form-group mb-4">
          <label className="block text-gray-700">Responsibility</label>
          <textarea
            className="w-full px-4 py-2 border rounded-md"
            name="responsibility"
            value={jobDetails.responsibility}
            onChange={handleChange}
            placeholder="Job Responsibility - Describe About Job Role"
            required
          />
        </div>
        <button
          className="bg-[#72d39d] px-2 py-1 rounded mt-4"
          type="submit"
        >
          Create Job
        </button>
      </form>
    </div>
  );
};

export default CreateJob;
