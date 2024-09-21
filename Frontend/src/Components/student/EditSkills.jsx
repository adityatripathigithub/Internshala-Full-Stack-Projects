import React, { useEffect, useState } from "react";
import axios from "../api/axios";

const EditSkills = ({ studentId }) => {
  const [skillDetails, setSkillDetails] = useState([]);
  const [newSkill, setNewSkill] = useState({
    name: "",
    proficiency: "",
  });
  const [editingSkill, setEditingSkill] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const getSkills = async () => {
    try {
      const { data } = await axios.post("/student");
      setSkillDetails(data.student.resume.skills);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewSkill((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const addSkillDetail = async () => {
    try {
      const response = await axios.post(`/resume/add-skills`, newSkill);
      console.log("Skill detail added successfully:", response.data);
      getSkills();
      setNewSkill({
        name: "",
        proficiency: "",
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error adding skill detail:", error);
    }
  };

  const updateSkillDetail = async (id) => {
    try {
      const response = await axios.post(`/resume/edit-skills/${id}`, newSkill);
      console.log("Skill detail updated successfully:", response.data);
      getSkills();
      setNewSkill({
        name: "",
        proficiency: "",
      });
      setEditingSkill(null);
    } catch (error) {
      console.error("Error updating skill detail:", error);
    }
  };

  const deleteSkillDetail = async (id) => {
    try {
      const response = await axios.post(`/resume/delete-skills/${id}`);
      console.log("Skill detail deleted successfully:", response.data);
      getSkills();
    } catch (error) {
      console.error("Error deleting skill detail:", error);
    }
  };

  useEffect(() => {
    if (studentId) {
      getSkills();
    }
  }, [studentId]);

  return (
    <div className="main w-full mx-auto mt-5 max-sm:w-full">
      <h2 className="text-2xl font-semibold mb-2">Skill Details</h2>
      <div className="skill-section border flex flex-col gap-2 justify-between p-5 rounded max-sm:p-2">
        {skillDetails.map((detail) => (
          <div key={detail.id} className="skill-detail border px-5 py-3">
            {editingSkill === detail.id ? (
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="dissd flex gap-5 ">
                  <div className="flex flex-col w-1/2">
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      className="border-[1px] px-3 py-2 rounded"
                      placeholder="Name"
                      value={newSkill.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col w-1/2">
                    <label>Proficiency</label>
                    <input
                      type="text"
                      name="proficiency"
                      className="border-[1px] px-3 py-2 rounded"
                      placeholder="Proficiency"
                      value={newSkill.proficiency}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="uperse mt-2 flex gap-2">
                  <button
                    onClick={() => updateSkillDetail(detail.id)}
                    type="submit"
                    className="bg-[#72D39D] px-2 py-1 rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingSkill(null)}
                    className="bg-slate-300 px-2 py-1 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex justify-between items-center max-sm:flex-col max-sm:items-start">
                <div className="contentdiv">
                  <p>Name: {detail.name}</p>
                  <p>Proficiency: {detail.proficiency}</p>
                </div>
                <div className="bbtn flex gap-5 max-sm:mt-2">
                  <button
                    onClick={() => {
                      setNewSkill({
                        name: detail.name,
                        proficiency: detail.proficiency,
                      });
                      setEditingSkill(detail.id);
                    }}
                    className="bg-[#539f74] px-4 py-1 rounded text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteSkillDetail(detail.id)}
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
              Add Skill Detail
            </h2>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="border px-5 py-3"
            >
              <div className="dissd flex gap-5 max-sm:flex-col max-sm:gap-1 ">
                <div className="flex flex-col w-1/2 max-sm:w-full">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    className="border-[1px] px-3 py-2 rounded"
                    placeholder="Name"
                    value={newSkill.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col w-1/2 max-sm:w-full">
                  <label>Proficiency</label>
                  <input
                    type="text"
                    name="proficiency"
                    className="border-[1px] px-3 py-2 rounded"
                    placeholder="Proficiency"
                    value={newSkill.proficiency}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="btnsss flex gap-2 mt-2">
                <button
                  onClick={addSkillDetail}
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
            className="add-skill-btn bg-[#72D39D] px-2 py-1 rounded w-max"
          >
            Add Skill
          </button>
        )}
      </div>
    </div>
  );
};

export default EditSkills;
