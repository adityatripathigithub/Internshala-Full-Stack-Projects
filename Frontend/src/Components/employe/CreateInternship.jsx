import React, { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const CreateInternship = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    profile: "",
    skills: "",
    location: "",
    internshipType: "In-office",
    openings: "",
    startDate: "",
    endDate: "",
    resposibility: "",
    status: "", // Default to one of the enum values
    amount: "",
    perks: "",
    duration: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const stipend = {
      status: formData.stipendStatus,
      amount: formData.stipendAmount,
    };
    const requestData = { ...formData, stipend };
    delete requestData.stipendStatus;
    delete requestData.stipendAmount;

    try {
      const response = await axios.post("/employe/internship/create", requestData);
      console.log("Internship created successfully:", response.data);
      navigate("/employe/postedinternship");
    } catch (error) {
      console.error("Error creating internship:", error);
    }
  };

  return (
    <div className="pb-10 px-10 max-sm:px-4">
      <h1 className="text-2xl font-semibold text-center my-10">Create Internship</h1>
      <form onSubmit={handleSubmit} className="w-[90%] mx-auto border-2 rounded-xl px-10 py-10 max-sm:px-4 max-sm:w-full">
        <div className="mb-4">
          <label className="block text-gray-700">Profile</label>
          <input
            type="text"
            name="profile"
            value={formData.profile}
            onChange={handleChange}
            placeholder="Profile - Frontend Developer"
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Skills</label>
          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            placeholder="Skills required"
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="More than one location (comma separated) - Delhi,Pune"
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Internship Type</label>
          <select
            name="internshipType"
            value={formData.internshipType}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
            required
          >
            <option value="In-office">In-office</option>
            <option value="Remote">Remote</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">End Date</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Duration</label>
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
            placeholder="Duration - In Months"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Stipend Status</label>
          <select
            name="stipendStatus"
            value={formData.stipendStatus}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
            required
          >
            <option value="fixed">Fixed</option>
            <option value="negotiable">Negotiable</option>
            <option value="performance based">Performance Based</option>
            <option value="unpaid">Unpaid</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Stipend Amount</label>
          <input
            type="number"
            name="stipendAmount"
            value={formData.stipendAmount}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
            placeholder="Stipend Amount (if applicable)"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Number of Openings</label>
          <input
            type="number"
            name="openings"
            value={formData.openings}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
            placeholder="Number of openings"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Responsibility</label>
          <textarea
            name="resposibility"
            value={formData.resposibility}
            onChange={handleChange}
            placeholder="Responsibility"
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Perk</label>
          <input
            type="text"
            name="perks"
            value={formData.perks}
            onChange={handleChange}
            placeholder="Perks"
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>

        <button type="submit" className="bg-[#71D499] px-6 py-2 rounded">
          Create Internship
        </button>
      </form>
    </div>
  );
};

export default CreateInternship;
