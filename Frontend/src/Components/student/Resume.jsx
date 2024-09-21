import React, { useContext, useEffect, useRef, useState } from "react";
import { index } from "../context/Indexxontext";
import axios from "../api/axios";
import Editeducation from "./Editeducation";
import EditInternships from "./EditInternships";
import EditResponsibilities from "./EditResponsibilities";
import EditCourses from "./EditCourses";
import EditSkills from "./EditSkills";
import EditAccomplishments from "./EditAccomplishments";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Resume = () => {
  const { studentdets, isstudeentloggedin } = useContext(index);
  const [resume, setResume] = useState();
  const [newProfile, setNewProfile] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef(null);
  const resumeRef = useRef(null);

  const getResume = async () => {
    try {
      const { data } = await axios.post("/student");
      setResume(data.student);
      setNewProfile({
        firstname: data.student.firstname,
        lastname: data.student.lastname,
        email: data.student.email,
        city: data.student.city,
        gender: data.student.gender,
        contact: data.student.contact,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      handleSubmit(file); // Automatically submit the form after file selection
    }
  };

  const changeProfile = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };

  const handleSubmit = async (file) => {
    if (file) {
      const formData = new FormData();
      formData.append("avatar", file);

      try {
        const response = await axios.post(
          `/student/avatar/${resume._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("File uploaded successfully:", response.data);
        // Refresh resume data
        getResume();
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    } else {
      console.error("No file selected");
    }
  };

  const updateStudent = async () => {
    try {
      const response = await axios.post(
        `/student/update/${resume._id}`,
        newProfile
      );
      console.log("Student updated successfully:", response.data);
      // Refresh resume data
      getResume();
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProfile((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const downloadResume = async () => {
    const input = resumeRef.current;
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const imgProps = pdf.getImageProperties(imgData);
    const imgWidth = pdfWidth;
    const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
    }

    pdf.save(`${resume.firstname}_${resume.lastname}_Resume.pdf`);
  };

  useEffect(() => {
    getResume();
  }, [studentdets]);

  return (
    resume && (
      <div className="resume mb-10 px-[10%] max-sm:p-0">
        <form>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            hidden
          />
        </form>
        <h1 className="text-center text-4xl font-semibold mt-10 ">Resume</h1>
        <div ref={resumeRef} className="resumecontainer w-[90%] mx-auto border-2 p-5 my-5 rounded ">
          <div className="profilesection">
            <div className="image-with-name flex items-center gap-5 max-sm:flex-col">
              <div className="img w-[120px] h-[120px] max-sm:w-[80px]  max-sm:h-[80px] rouneded-full  relative ">
                <img
                  className="w-full h-full object-cover rounded-full"
                  src={resume.avatar.url}
                  alt=""
                />
                <i
                  onClick={changeProfile}
                  className="ri-pencil-line text-xl absolute right-2 bottom-2 px-1 bg-white rounded cursor-pointer"
                ></i>
              </div>
              <div className="withname">
                <div className="chageestudebt flex gap-2 items-center text-xl">
                  <h1 className="text-4xl max-sm:text-2xl font-semibold">
                    {resume.firstname}
                  </h1>
                  <i
                    onClick={() => setIsEditing(true)}
                    className="ri-pencil-line cursor-pointer"
                  ></i>
                </div>
                <p className="text-sm ">{resume.email}</p>
                <p className="text-sm ">+91 {resume.contact}</p>
                <p className="text-sm ">{resume.city}</p>
              </div>
            </div>
          </div>
          {isEditing && (
          <div className="edit-form border-[1px] rounded my-4  w-[90%] mx-auto p-5 max-sm:p-2">
            <h2 className="text-center text-2xl font-semibold">Edit Profile</h2>
            <form
              className="flex flex-col gap-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="name flex gap-2 items-center max-sm:flex-col ">
                <div className="flex flex-col w-1/2 max-sm:w-full">
                  <label className="text-sm font-semibold">First Name</label>
                  <input
                    className="border-[1px] px-4 py-1 rounded text-lg"
                    type="text"
                    name="firstname"
                    value={newProfile.firstname}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col w-1/2 max-sm:w-full">
                  <label className="text-sm font-semibold">Last Name</label>
                  <input
                    className="border-[1px] px-4 py-1 rounded text-lg"
                    type="text"
                    name="lastname"
                    value={newProfile.lastname}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="email city flex gap-2 items-center max-sm:flex-col">
                <div className="flex flex-col  w-1/2 max-sm:w-full">
                  <label className="text-sm font-semibold">Email</label>
                  <input
                    className="border-[1px] px-4 py-1 rounded text-lg"
                    type="email"
                    name="email"
                    value={newProfile.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col w-1/2 max-sm:w-full">
                  <label className="text-sm font-semibold">City</label>
                  <input
                    className="border-[1px] px-4 py-1 rounded text-lg"
                    type="text"
                    name="city"
                    value={newProfile.city}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="remin a city flex gap-2 items-center max-sm:flex-col">
                <div className="flex flex-col w-1/2 max-sm:w-full">
                  <label className="text-sm font-semibold">Gender</label>
                  <input
                    className="border-[1px] px-4 py-1 rounded text-lg"
                    type="text"
                    name="gender"
                    value={newProfile.gender}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col w-1/2 max-sm:w-full">
                  <label className="text-sm font-semibold">Contact</label>
                  <input
                    className="border-[1px] px-4 py-1 rounded text-lg"
                    type="text"
                    name="contact"
                    value={newProfile.contact}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="chnges flex gap-2">
                <button
                  className="bg-[#72D39D] px-2 py-1 rounded"
                  onClick={updateStudent}
                  type="submit"
                >
                  Save Changes
                </button>
                <button
                  className="bg-slate-300 px-2 py-1 rounded"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
          <Editeducation studentId={resume._id} />
          <EditInternships studentId={resume._id} />
          <EditResponsibilities studentId={resume._id} />
          <EditCourses studentId={resume._id} />
          <EditSkills studentId={resume._id} />
          <EditAccomplishments studentId={resume._id} />
        </div>
        

        <button
          className="bg-blue-500 ml-5 text-white px-4 py-2 rounded mt-4"
          onClick={downloadResume}
        >
          Download Resume as PDF
        </button>
      </div>
    )
  );
};

export default Resume;
