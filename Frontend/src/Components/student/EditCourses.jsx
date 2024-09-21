import React, { useEffect, useState } from "react";
import axios from "../api/axios";

const EditCourses = ({ studentId }) => {
  const [courseDetails, setCourseDetails] = useState([]);
  const [newCourse, setNewCourse] = useState({
    name: "",
    institution: "",
    completionDate: "",
    description: "",
  });
  const [editingCourse, setEditingCourse] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const getCourses = async () => {
    try {
      const { data } = await axios.post("/student");
      setCourseDetails(data.student.resume.courses);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCourse((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const addCourseDetail = async () => {
    try {
      const response = await axios.post(`/resume/add-courses`, newCourse);
      console.log("Course detail added successfully:", response.data);
      getCourses();
      setNewCourse({
        name: "",
        institution: "",
        completionDate: "",
        description: "",
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error adding course detail:", error);
    }
  };

  const updateCourseDetail = async (id) => {
    try {
      const response = await axios.post(`/resume/edit-courses/${id}`, newCourse);
      console.log("Course detail updated successfully:", response.data);
      getCourses();
      setNewCourse({
        name: "",
        institution: "",
        completionDate: "",
        description: "",
      });
      setEditingCourse(null);
    } catch (error) {
      console.error("Error updating course detail:", error);
    }
  };

  const deleteCourseDetail = async (id) => {
    try {
      const response = await axios.post(`/resume/delete-courses/${id}`);
      console.log("Course detail deleted successfully:", response.data);
      getCourses();
    } catch (error) {
      console.error("Error deleting course detail:", error);
    }
  };

  useEffect(() => {
    if (studentId) {
      getCourses();
    }
  }, [studentId]);

  return (
    <div className="main w-full mx-auto mt-5 max-sm:w-full ">
      <h2 className="text-2xl font-semibold mb-2">Course Details</h2>
      <div className="course-section border flex flex-col gap-2 justify-between p-5 rounded max-sm:p-2">
        {courseDetails.map((detail) => (
          <div key={detail.id} className="course-detail border px-5 py-3">
            {editingCourse === detail.id ? (
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="dissd flex gap-5 max-sm:flex-col max-sm:gap-2">
                  <div className="flex flex-col w-1/2 max-sm:w-full">
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      className="border-[1px] px-3 py-2 rounded"
                      placeholder="Name"
                      value={newCourse.name}
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
                      value={newCourse.institution}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="dissd2 flex gap-5 max-sm:flex-col">
                  <div className="w-1/2 flex flex-col max-sm:w-full">
                    <label>Completion Date</label>
                    <input
                      type="date"
                      name="completionDate"
                      className="border-[1px] px-3 py-2 rounded"
                      value={newCourse.completionDate}
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
                    value={newCourse.description}
                    onChange={handleChange}
                  />
                </div>
                <div className="uperse mt-2 flex gap-2">
                  <button
                    onClick={() => updateCourseDetail(detail.id)}
                    type="submit"
                    className="bg-[#72D39D] px-2 py-1 rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingCourse(null)}
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
                  <p>Institution: {detail.institution}</p>
                  <p>Completion Date: {new Date(detail.completionDate).toLocaleDateString()}</p>
                  <p>Description: {detail.description}</p>
                </div>
                <div className="bbtn flex gap-5 max-sm:mt-2">
                  <button
                    onClick={() => {
                      setNewCourse({
                        name: detail.name,
                        institution: detail.institution,
                        completionDate: detail.completionDate,
                        description: detail.description,
                      });
                      setEditingCourse(detail.id);
                    }}
                    className="bg-[#539f74] px-4 py-1 rounded text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteCourseDetail(detail.id)}
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
              Add Course Detail
            </h2>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="border px-5 py-3"
            >
              <div className="dissd flex gap-5 max-sm:flex-col max-sm:gap-1">
                <div className="flex flex-col w-1/2 max-sm:w-full">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    className="border-[1px] px-3 py-2 rounded"
                    placeholder="Name"
                    value={newCourse.name}
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
                    value={newCourse.institution}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="dissd2 flex gap-5">
                <div className="w-1/2 max-sm:w-full flex flex-col">
                  <label>Completion Date</label>
                  <input
                    type="date"
                    name="completionDate"
                    className="border-[1px] px-3 py-2 rounded"
                    value={newCourse.completionDate}
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
                  value={newCourse.description}
                  onChange={handleChange}
                />
              </div>
              <div className="btnsss flex gap-2 mt-2">
                <button
                  onClick={addCourseDetail}
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
            className="add-course-btn bg-[#72D39D] px-2 py-1 rounded w-max"
          >
            Add Course
          </button>
        )}
      </div>
    </div>
  );
};

export default EditCourses;
