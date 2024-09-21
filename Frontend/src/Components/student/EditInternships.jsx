import React, { useEffect, useState } from "react";
import axios from "../api/axios";

const EditInternships = ({ studentId }) => {
  const [internshipDetails, setInternshipDetails] = useState([]);
  const [newInternship, setNewInternship] = useState({
    company: "",
    role: "",
    startDate: "",
    endDate: "",
    description: "",
  });
  const [editingInternship, setEditingInternship] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const getInternships = async () => {
    try {
      const { data } = await axios.post("/student");
      setInternshipDetails(data.student.resume.internships);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewInternship((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const addInternshipDetail = async () => {
    try {
      const response = await axios.post(`/resume/add-internships`, newInternship);
      console.log("Internship detail added successfully:", response.data);
      getInternships();
      setNewInternship({
        company: "",
        role: "",
        startDate: "",
        endDate: "",
        description: "",
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error adding internship detail:", error);
    }
  };

  const updateInternshipDetail = async (id) => {
    try {
      const response = await axios.post(`/resume/edit-internships/${id}`, newInternship);
      console.log("Internship detail updated successfully:", response.data);
      getInternships();
      setNewInternship({
        company: "",
        role: "",
        startDate: "",
        endDate: "",
        description: "",
      });
      setEditingInternship(null);
    } catch (error) {
      console.error("Error updating internship detail:", error);
    }
  };

  const deleteInternshipDetail = async (id) => {
    try {
      const response = await axios.post(`/resume/delete-internships/${id}`);
      console.log("Internship detail deleted successfully:", response.data);
      getInternships();
    } catch (error) {
      console.error("Error deleting internship detail:", error);
    }
  };

  useEffect(() => {
    if (studentId) {
      getInternships();
    }
  }, [studentId]);

  return (
    <div className="main w-full mx-auto mt-5 max-sm:w-full ">
      <h2 className="text-2xl font-semibold mb-2">Internship Details</h2>
      <div className="internship-section border flex flex-col gap-2 justify-between p-5 max-sm:p-2 rounded">
        {internshipDetails.map((detail) => (
          <div key={detail.id} className="internship-detail border px-5 py-3">
            {editingInternship === detail.id ? (
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="dissd flex gap-5 max-sm:flex-col max-sm:gap-1">
                <div className="flex flex-col w-1/2 max-sm:w-full">
                  <label>Company</label>
                  <input
                    type="text"
                    name="company"
                    className="border-[1px] px-3 py-2 rounded"
                    placeholder="Company"
                    value={newInternship.company}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col w-1/2 max-sm:w-full">
                  <label>Role</label>
                  <input
                    type="text"
                    name="role"
                    className="border-[1px] px-3 py-2 rounded"
                    placeholder="Role"
                    value={newInternship.role}
                    onChange={handleChange}
                    
                  />
                </div>
              </div>
              <div className="dissd2 flex gap-5 max-sm:flex-col max-sm:gap-1">
                <div className="w-1/2 flex max-sm:w-full flex-col">
                  <label>Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    className="border-[1px] px-3 py-2 rounded"
                    value={newInternship.startDate}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-1/2 flex max-sm:w-full flex-col">
                  <label>End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    className="border-[1px] px-3 py-2 rounded"
                    value={newInternship.endDate}
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
                  value={newInternship.description}
                  onChange={handleChange}
                />
              </div>
              <div className="uperse mt-2 flex gap-2">
              <button
                  onClick={() => updateInternshipDetail(detail.id)}
                  type="submit"
                  className="bg-[#72D39D] px-2 py-1 rounded"
                >
                  Save
                </button>
                <button onClick={() => setEditingInternship(null)}
                    className="bg-slate-300 px-2 py-1 rounded"
                    >
                  Cancel
                </button>
              </div>
              </form>
            ) : (
              <div className="flex justify-between items-center max-sm:flex-col max-sm:gap-2 max-sm:items-start">
                <div className="contentdiv">
                  <p>Company: {detail.company}</p>
                  <p>Role: {detail.role}</p>
                  <p>Start Date: {new Date(detail.startDate).toLocaleDateString()}</p>
                  <p>End Date: {new Date(detail.endDate).toLocaleDateString()}</p>
                  <p>Description: {detail.description}</p>
                </div>
                <div className="bbtn flex gap-5">
                  <button
                    onClick={() => {
                      setNewInternship({
                        company: detail.company,
                        role: detail.role,
                        startDate: detail.startDate,
                        endDate: detail.endDate,
                        description: detail.description,
                      });
                      setEditingInternship(detail.id);
                    }}
                    className="bg-[#539f74] px-4 py-1 rounded text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteInternshipDetail(detail.id)}
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
              Add Internship Detail
            </h2>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="border px-5 py-3"
            >
              <div className="dissd flex gap-5 max-sm:gap-1 max-sm:flex-col  ">
                <div className="flex flex-col w-1/2 max-sm:w-full">
                  <label>Company</label>
                  <input
                    type="text"
                    name="company"
                    className="border-[1px] px-3 py-2 rounded"
                    placeholder="Company"
                    value={newInternship.company}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col w-1/2 max-sm:w-full">
                  <label>Role</label>
                  <input
                    type="text"
                    name="role"
                    className="border-[1px] px-3 py-2 rounded"
                    placeholder="Role"
                    value={newInternship.role}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="dissd2 flex gap-5 max-sm:gap-1 max-sm:flex-col" >
                <div className="w-1/2 flex max-sm:w-full flex-col">
                  <label>Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    className="border-[1px] px-3 py-2 rounded"
                    value={newInternship.startDate}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-1/2 flex max-sm:w-full flex-col">
                  <label>End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    className="border-[1px] px-3 py-2 rounded"
                    value={newInternship.endDate}
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
                  value={newInternship.description}
                  onChange={handleChange}
                />
              </div>
              <div className="btnsss flex gap-2 mt-2">
                <button
                  onClick={addInternshipDetail}
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
            className="add-internship-btn bg-[#72D39D] px-2 py-1 rounded w-max"
          >
            Add Internship
          </button>
        )}
      </div>
    </div>
  );
};

export default EditInternships;
