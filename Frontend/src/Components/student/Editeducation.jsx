import React, { useEffect, useState } from "react";
import axios from "../api/axios";

const Editeducation = ({ studentId }) => {
  const [educationDetails, setEducationDetails] = useState([]);
  console.log(educationDetails);
  const [resume, setResume] = useState();
  const [newEducation, setNewEducation] = useState({
    degree: "",
    institution: "",
    year: "",
    grade: "",
  });
  const [editingEducation, setEditingEducation] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const getResume = async () => {
    try {
      const { data } = await axios.post("/student");
      setEducationDetails(data.student.resume.education);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEducation((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const addEducationDetail = async () => {
    try {
      const response = await axios.post(`/resume/add-education`, newEducation);
      console.log("Education detail added successfully:", response.data);
      getResume();
      setNewEducation({ degree: "", institution: "", year: "", grade: "" });
      setIsEditing(false);
    } catch (error) {
      console.error("Error adding education detail:", error);
    }
  };

  const updateEducationDetail = async (id) => {
    try {
      const response = await axios.post(
        `/resume/edit-education/${id}`,
        newEducation
      );
      console.log("Education detail updated successfully:", response.data);
      getResume();
      setNewEducation({ degree: "", institution: "", year: "", grade: "" });
      setEditingEducation(null);
    } catch (error) {
      console.error("Error updating education detail:", error);
    }
  };

  const deleteEducationDetail = async (id) => {
    try {
      const response = await axios.post(`/resume/delete-education/${id}`);
      console.log("Education detail deleted successfully:", response.data);
      getResume();
    } catch (error) {
      console.error("Error deleting education detail:", error);
    }
  };

  useEffect(() => {
    if (studentId) {
      getResume();
    }
  }, [studentId]);

  return (
    <div className="main w-full mx-auto mt-5 max-sm:w-full">
      <h2 className="text-2xl font-semibold mb-2">Educational Details</h2>
      <div className="education-section border flex flex-col gap-2 justify-between p-5 max-sm:p-2 rounded">
        {educationDetails.map((detail) => (
          <div key={detail.id} className="education-detail border px-5 py-3">
            {editingEducation === detail.id ? (
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="dissd flex gap-5 max-sm:gap-1 max-sm:flex-col ">
                  <div className="flex flex-col w-1/2 max-sm:w-full">
                    <label>Degree</label>
                    <input
                      type="text"
                      name="degree"
                      className="border-[1px] px-3 py-2 rounded"
                      placeholder="Degree"
                      value={newEducation.degree}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col w-1/2 max-sm:w-full">
                    <label>Institution</label>
                    <input
                      type="text"
                      name="institution"
                      className="border-[1px] px-3 py-2 rounded"
                      placeholder="Institution"
                      value={newEducation.institution}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="dissd2 flex gap-5 max-sm:gap-1 max-sm:flex-col">
                  <div className=" max-sm:w-full w-1/2 flex flex-col">
                    <label>Year</label>
                    <input
                      type="text"
                      name="year"
                      className="border-[1px] px-3 py-2 rounded"
                      placeholder="Start - Ending"
                      value={newEducation.year}
                      onChange={handleChange}
                    />
                  </div>
                  <div className=" max-sm:w-full w-1/2 flex flex-col">
                    <label>Grade</label>
                    <input
                      type="text"
                      name="grade"
                      className="border-[1px] px-3 py-2 rounded"
                      placeholder="CGPA or %"
                      value={newEducation.grade}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="margint mt-2 flex gap-2">
                  <button
                    onClick={() => updateEducationDetail(detail.id)}
                    type="submit"
                    className="bg-[#72D39D] w-max px-2 py-1 rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingEducation(null)}
                    className="bg-slate-300 w-max px-2 py-1 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex justify-between items-center max-sm:items-start max-sm:flex-col ">
                <div className="contentdiv">
                  <p>Degree : {detail.degree}</p>
                  <p>Institution: {detail.institution}</p>
                  <p>Year: {detail.year}</p>
                  <p>Grade: {detail.grade}</p>
                </div>
                <div className="bbtn flex gap-5 text-md mt-2">
                  <button
                    onClick={() => {
                      setNewEducation({
                        degree: detail.degree,
                        institution: detail.institution,
                        year: detail.year,
                        grade: detail.grade,
                      });
                      setEditingEducation(detail.id);
                    }}
                    className="bg-[#539f74] px-4 py-1 rounded text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteEducationDetail(detail.id)}
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
              Add Education Detail
            </h2>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="border px-5 py-3"
            >
              <div className="dissd flex gap-5 max-sm:gap-1 max-sm:flex-col">
                <div className="flex flex-col w-1/2 max-sm:w-full">
                  <label>Degree</label>
                  <input
                    type="text"
                    name="degree"
                    className="border-[1px] px-3 py-2 rounded"
                    placeholder="Degree"
                    value={newEducation.degree}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col w-1/2 max-sm:w-full">
                  <label>Institution</label>
                  <input
                    type="text"
                    name="institution"
                    className="border-[1px] px-3 py-2 rounded"
                    placeholder="Institution"
                    value={newEducation.institution}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="dissd2 flex gap- max-sm:gap-1 max-sm:flex-col">
                <div className=" max-sm:w-full w-1/2 flex flex-col">
                  <label>Year</label>
                  <input
                    type="text"
                    name="year"
                    className="border-[1px] px-3 py-2 rounded"
                    placeholder="Start - Ending"
                    value={newEducation.year}
                    onChange={handleChange}
                  />
                </div>
                <div className=" max-sm:w-full w-1/2 flex flex-col">
                  <label>Grade</label>
                  <input
                    type="text"
                    name="grade"
                    className="border-[1px] px-3 py-2 rounded"
                    placeholder="CGPA or %"
                    value={newEducation.grade}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="btnsss flex gap-2  mt-2">
                <button
                  onClick={addEducationDetail}
                  type="submit"
                  className="bg-[#72D39D] w-max px-2 py-1 rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-slate-300 w-max px-2 py-1 rounded"
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
            className="add-education-btn bg-[#72D39D]  px-2 py-1 rounded w-max"
          >
            Add Education
          </button>
        )}
      </div>
    </div>
  );
};

export default Editeducation;
