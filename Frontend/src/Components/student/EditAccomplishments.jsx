import React, { useEffect, useState } from "react";
import axios from "../api/axios";

const EditAccomplishments = ({ studentId }) => {
  const [accomplishmentDetails, setAccomplishmentDetails] = useState([]);
  const [newAccomplishment, setNewAccomplishment] = useState({
    title: "",
    date: "",
    description: "",
  });
  const [editingAccomplishment, setEditingAccomplishment] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const getAccomplishments = async () => {
    try {
      const { data } = await axios.post("/student");
      setAccomplishmentDetails(data.student.resume.accomplishments);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAccomplishment((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const addAccomplishmentDetail = async () => {
    try {
      const response = await axios.post(`/resume/add-accomplishments`, newAccomplishment);
      console.log("Accomplishment detail added successfully:", response.data);
      getAccomplishments();
      setNewAccomplishment({
        title: "",
        date: "",
        description: "",
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error adding accomplishment detail:", error);
    }
  };

  const updateAccomplishmentDetail = async (id) => {
    try {
      const response = await axios.post(`/resume/edit-accomplishments/${id}`, newAccomplishment);
      console.log("Accomplishment detail updated successfully:", response.data);
      getAccomplishments();
      setNewAccomplishment({
        title: "",
        date: "",
        description: "",
      });
      setEditingAccomplishment(null);
    } catch (error) {
      console.error("Error updating accomplishment detail:", error);
    }
  };

  const deleteAccomplishmentDetail = async (id) => {
    try {
      const response = await axios.post(`/resume/delete-accomplishments/${id}`);
      console.log("Accomplishment detail deleted successfully:", response.data);
      getAccomplishments();
    } catch (error) {
      console.error("Error deleting accomplishment detail:", error);
    }
  };

  useEffect(() => {
    if (studentId) {
      getAccomplishments();
    }
  }, [studentId]);

  return (
    <div className="main w-full mx-auto mt-5 max-sm:w-full ">
      <h2 className="text-2xl font-semibold mb-2">Accomplishment</h2>
      <div className="accomplishment-section border flex flex-col gap-2 justify-between p-5 rounded max-sm:p-2">
        {accomplishmentDetails.map((detail) => (
          <div key={detail.id} className="accomplishment-detail border px-5 py-3">
            {editingAccomplishment === detail.id ? (
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="dissd flex gap-5">
                  <div className="flex flex-col w-1/2">
                    <label>Title</label>
                    <input
                      type="text"
                      name="title"
                      className="border-[1px] px-3 py-2 rounded"
                      placeholder="Title"
                      value={newAccomplishment.title}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col w-1/2">
                    <label>Date</label>
                    <input
                      type="date"
                      name="date"
                      className="border-[1px] px-3 py-2 rounded"
                      value={newAccomplishment.date}
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
                    value={newAccomplishment.description}
                    onChange={handleChange}
                  />
                </div>
                <div className="uperse mt-2 flex gap-2">
                  <button
                    onClick={() => updateAccomplishmentDetail(detail.id)}
                    type="submit"
                    className="bg-[#72D39D] px-2 py-1 rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingAccomplishment(null)}
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
                  <p>Date: {new Date(detail.date).toLocaleDateString()}</p>
                  <p>Description: {detail.description}</p>
                </div>
                <div className="bbtn flex gap-5 max-sm:mt-2">
                  <button
                    onClick={() => {
                      setNewAccomplishment({
                        title: detail.title,
                        date: detail.date,
                        description: detail.description,
                      });
                      setEditingAccomplishment(detail.id);
                    }}
                    className="bg-[#539f74] px-4 py-1 rounded text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteAccomplishmentDetail(detail.id)}
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
              Add Accomplishment Detail
            </h2>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="border px-5 py-3"
            >
              <div className="dissd flex gap-5 max-sm:flex-col max-sm:gap-1">
                <div className="flex flex-col w-1/2 max-sm:w-full">
                  <label>Title</label>
                  <input
                    type="text"
                    name="title"
                    className="border-[1px] px-3 py-2 rounded"
                    placeholder="Title"
                    value={newAccomplishment.title}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col w-1/2 max-sm:w-full">
                  <label>Date</label>
                  <input
                    type="date"
                    name="date"
                    className="border-[1px] px-3 py-2 rounded"
                    value={newAccomplishment.date}
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
                  value={newAccomplishment.description}
                  onChange={handleChange}
                />
              </div>
              <div className="btnsss flex gap-2 mt-2">
                <button
                  onClick={addAccomplishmentDetail}
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
            className="add-accomplishment-btn bg-[#72D39D] px-2 py-1 rounded w-max"
          >
            Add Accomplishment
          </button>
        )}
      </div>
    </div>
  );
};

export default EditAccomplishments;
