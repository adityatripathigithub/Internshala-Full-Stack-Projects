import React, { useContext, useEffect, useState } from "react";
import { index } from "../context/Indexxontext";
import axios from "../api/axios";

const Profile = () => {
  const { studentdets, setstudentdets } = useContext(index);
  const [resume, setResume] = useState(null);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [imgurl, setImgurl] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [gender, setGender] = useState("");
  const [contact, setContact] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  console.log(resume);

  const getResume = async () => {
    try {
      const { data } = await axios.post("/student");
      setResume(data.student);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getResume();
    if (studentdets) {
      setFirstname(studentdets.firstname || "");
      setLastname(studentdets.lastname || "");
      setImgurl(studentdets?.avatar?.url || "");
      setEmail(studentdets.email || "");
      setCity(studentdets.city || "");
      setGender(studentdets.gender || "");
      setContact(studentdets.contact || "");
    }
  }, [studentdets]);

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/student/update/${resume._id}`, {
        firstname,
        lastname,
        email,
        city,
        gender,
        contact,
      });
      setstudentdets({
        ...studentdets,
        firstname,
        lastname,
        email,
        city,
        gender,
        contact,
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      console.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const response = await axios.post(`/student/avatar/${resume._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.avatar) {
        setImgurl(response.data.avatar.url);
        console.log(response.data.avatar.url);
        setstudentdets({ ...studentdets, avatar: response.data.avatar });
      } else {
        console.error("No avatar data in response");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/student`, {
        password,
        newPassword,
      });
      console.log("Password changed successfully:", response.data);
      setPassword("");
      setNewPassword("");
    } catch (error) {
      console.error("Error changing password:", error);
    }
  };

  return resume && (
    <div className="w-full px-20 my-10 max-sm:px-8">
      <h1 className="text-4xl font-semibold py-5">Profile</h1>
      <div className="profile flex gap-10 items-center max-sm:flex-col max-sm:items-start max-sm:gap-2 ">
        <div className="profilephoto w-[100px] h-[100px] bg-red-100 rounded-full relative">
          <img className="w-full h-full object-cover rounded-full" src={imgurl} alt="Profile" />
          <label className="absolute bottom-0 right-0 bg-gray-200 p-1 rounded-full cursor-pointer">
            <i className="ri-pencil-line"></i>
            <input
              type="file"
              className="hidden"
              onChange={event => handleImageChange(event)}
            />
          </label>
        </div>
        <div className="userdets ">
          <div className="div flex gap-2 ">
            <h1 className="text-2xl font-semibold">{resume.firstname}</h1>
            <h1 className="text-2xl font-semibold">{resume.lastname}</h1>
          </div>
          <p>{resume.email}</p>
          <p>{resume.city}</p>
          <p>{resume.gender}</p>
          <p>+91 {resume.contact}</p>
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 text-white px-3 py-1 rounded mt-2"
          >
            Edit Profile
          </button>
        </div>
      </div>

      {isEditing && (
        <form onSubmit={e => handleEdit(e)} className="mt-5 border p-5 rounded">
          <div className="flex gap-4 mb-4 max-sm:flex-col max-sm:gap-2 ">
            <div className="flex flex-col w-1/2 max-sm:w-full">
              <label>First Name</label>
              <input
                type="text"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                className="bg-gray-100 p-2 rounded"
              />
            </div>
            <div className="flex flex-col w-1/2 max-sm:w-full">
              <label>Last Name</label>
              <input
                type="text"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                className="bg-gray-100 p-2 rounded"
              />
            </div>
          </div>
          <div className="flex flex-col mb-4">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-100 p-2 rounded"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label>City</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="bg-gray-100 p-2 rounded"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label>Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="bg-gray-100 p-2 rounded"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="flex flex-col mb-4">
            <label>Contact</label>
            <input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="bg-gray-100 p-2 rounded"
            />
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-green-500 text-white px-3 py-2 rounded"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-red-500 text-white px-3 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <form onSubmit={e => handleChangePassword(e)} className="mt-5 border p-5 rounded">
        <h2 className="text-2xl font-semibold mb-4">Change Password</h2>
        <div className="flex flex-col mb-4">
          <label>Current Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-100 p-2 rounded"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label>New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="bg-gray-100 p-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-3 py-2 rounded"
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

export default Profile;
