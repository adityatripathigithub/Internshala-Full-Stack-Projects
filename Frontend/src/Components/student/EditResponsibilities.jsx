import React, { useEffect, useState } from "react";
import axios from "../api/axios";

const EditResponsibilities = ({ studentId }) => {
  const [responsibilityDetails, setResponsibilityDetails] = useState([]);
  const [newResponsibility, setNewResponsibility] = useState({
    title: "",
    organization: "",
    startDate: "",
    endDate: "",
    description: "",
  });
  const [editingResponsibility, setEditingResponsibility] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const getResponsibilities = async () => {
    try {
      const { data } = await axios.post("/student");
      setResponsibilityDetails(data.student.resume.responsibilities);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewResponsibility((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const addResponsibilityDetail = async () => {
    try {
      const response = await axios.post(`/resume/add-responsibilities`, newResponsibility);
      console.log("Responsibility detail added successfully:", response.data);
      getResponsibilities();
      setNewResponsibility({
        title: "",
        organization: "",
        startDate: "",
        endDate: "",
        description: "",
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error adding responsibility detail:", error);
    }
  };

  const updateResponsibilityDetail = async (id) => {
    try {
      const response = await axios.post(`/resume/edit-responsibilities/${id}`, newResponsibility);
      console.log("Responsibility detail updated successfully:", response.data);
      getResponsibilities();
      setNewResponsibility({
        title: "",
        organization: "",
        startDate: "",
        endDate: "",
        description: "",
      });
      setEditingResponsibility(null);
    } catch (error) {
      console.error("Error updating responsibility detail:", error);
    }
  };

  const deleteResponsibilityDetail = async (id) => {
    try {
      const response = await axios.post(`/resume/delete-responsibilities/${id}`);
      console.log("Responsibility detail deleted successfully:", response.data);
      getResponsibilities();
    } catch (error) {
      console.error("Error deleting responsibility detail:", error);
    }
  };

  useEffect(() => {
    if (studentId) {
      getResponsibilities();
    }
  }, [studentId]);

  return (
    <div className="main w-full mx-auto mt-5 max-sm:w-full">
      <h2 className="text-2xl font-semibold mb-2">Responsibility Details</h2>
      <div className="responsibility-section border flex flex-col gap-2 justify-between p-5 rounded max-sm:p-2">
        {responsibilityDetails.map((detail) => (
          <div key={detail.id} className="responsibility-detail border px-5 py-3">
            {editingResponsibility === detail.id ? (
              <form onSubmit={(e) => e.preventDefault()}>
                <div className=" max-sm:flex-col max-sm:gap-1  flex gap-5">
                  <div className="flex flex-col w-1/2 max-sm:w-full">
                    <label>Title</label>
                    <input
                      type="text"
                      name="title"
                      className="border-[1px] px-3 py-2 rounded"
                      placeholder="Title"
                      value={newResponsibility.title}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col w-1/2 max-sm:w-full">
                    <label>Organization</label>
                    <input
                      type="text"
                      name="organization"
                      className="border-[1px] px-3 py-2 rounded"
                      placeholder="Organization"
                      value={newResponsibility.organization}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className=" max-sm:flex-col max-sm:gap-1 2 flex gap-5">
                  <div className="w-1/2 flex flex-col max-md:w-full">
                    <label>Start Date</label>
                    <input
                      type="date"
                      name="startDate"
                      className="border-[1px] px-3 py-2 rounded"
                      value={newResponsibility.startDate}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="w-1/2 flex flex-col max-md:w-full ">
                    <label>End Date</label>
                    <input
                      type="date"
                      name="endDate"
                      className="border-[1px] px-3 py-2 rounded"
                      value={newResponsibility.endDate}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="w-full flex flex-col mt-2">
                  <label>Description</label>
                  <textarea
                    name="description"
                    className="border-[1px] px-3 py-2 rounded"
                    placeholder="Description"
                    value={newResponsibility.description}
                    onChange={handleChange}
                  />
                </div>
                <div className="uperse mt-2 flex gap-2">
                  <button
                    onClick={() => updateResponsibilityDetail(detail.id)}
                    type="submit"
                    className="bg-[#72D39D] px-2 py-1 rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingResponsibility(null)}
                    className="bg-slate-300 px-2 py-1 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex justify-between items-center max-sm:flex-col max-sm:items-start">
                <div className="contentdiv">
                  <p>Title: {detail.title}</p>
                  <p>Organization: {detail.organization}</p>
                  <p>Start Date: {new Date(detail.startDate).toLocaleDateString()}</p>
                  <p>End Date: {new Date(detail.endDate).toLocaleDateString()}</p>
                  <p>Description: {detail.description}</p>
                </div>
                <div className="bbtn flex gap-5 max-sm:mt-2">
                  <button
                    onClick={() => {
                      setNewResponsibility({
                        title: detail.title,
                        organization: detail.organization,
                        startDate: detail.startDate,
                        endDate: detail.endDate,
                        description: detail.description,
                      });
                      setEditingResponsibility(detail.id);
                    }}
                    className="bg-[#539f74] px-4 py-1 rounded text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteResponsibilityDetail(detail.id)}
                    className="bg-[#ce4545] px-4 py-1 rounded text-white"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
        {isEditing && (
          <div className="edit-form">
            <h2 className="text-center text-2xl font-semibold">
              Add Responsibility Detail
            </h2>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="border px-5 py-3"
            >
              <div className=" max-sm:flex-col max-sm:gap-1  flex gap-5">
                <div className="flex flex-col w-1/2 max-sm:w-full">
                  <label>Title</label>
                  <input
                    type="text"
                    name="title"
                    className="border-[1px] px-3 py-2 rounded"
                    placeholder="Title"
                    value={newResponsibility.title}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col w-1/2 max-sm:w-full">
                  <label>Organization</label>
                  <input
                    type="text"
                    name="organization"
                    className="border-[1px] px-3 py-2 rounded"
                    placeholder="Organization"
                    value={newResponsibility.organization}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className=" max-sm:flex-col max-sm:gap-1  flex gap-5">
                <div className="w-1/2 flex flex-col max-sm:w-full">
                  <label>Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    className="border-[1px] px-3 py-2 rounded"
                    value={newResponsibility.startDate}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-1/2 flex flex-col max-sm:w-full">
                  <label>End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    className="border-[1px] px-3 py-2 rounded"
                    value={newResponsibility.endDate}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="w-full flex flex-col mt-2">
                <label>Description</label>
                <textarea
                  name="description"
                  className="border-[1px] px-3 py-2 rounded"
                  placeholder="Description"
                  value={newResponsibility.description}
                  onChange={handleChange}
                />
              </div>
              <div className="btnsss flex gap-2 mt-2">
                <button
                  onClick={addResponsibilityDetail}
                  type="submit"
                  className="bg-[#72D39D] px-2 py-1 rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-slate-300 px-2 py-1 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="add-responsibility-btn bg-[#72D39D] px-2 py-1 rounded w-max"
          >
            Add Responsibility
          </button>
        )}
      </div>
    </div>
  );
};

export default EditResponsibilities;
