import React, { useContext, useEffect, useState } from "react";
import axios from "../api/axios";
import { index } from "../context/Indexxontext";
import { toast } from "react-toastify";

const Profile = () => {
  const { employe, setEmploye } = useContext(index);
  const [newemploye, setnewemploye] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [newProfilePic, setNewProfilePic] = useState(null);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const notify = () => toast("Wow so easy!");

  const getprofile = async () => {
    try {
      const { data } = await axios.post("/employe/current");
      setnewemploye(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getprofile();
  }, [employe]);

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/employe/update/${newemploye._id}`, newemploye);
      setEmploye({ ...employe, ...newemploye });
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
      const response = await axios.post(`/employe/avatar/${newemploye._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      if (response.data.avatar) {
        setNewProfilePic(response.data.avatar.url);
        setnewemploye({ ...newemploye, organizationlogo: response.data.avatar });
      } else {
        console.error("No avatar data in response");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!password || !newPassword) {
      console.error("Both current and new passwords are required");
      return;
    }

    try {
      const response = await axios.post(`/employe/reset-password`, {
        currentPassword: password,
        newPassword,
      });
      notify();
      console.log("Password changed successfully:", response.data);
      setPassword("");
      setNewPassword("");
    } catch (error) {
      console.error("Error changing password:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="w-full px-20 pb-10 max-sm:px-4">
      <h1 className="my-10 text-4xl font-semibold">Employee Profile</h1>
      <div className="profilesectoiin flex gap-5 items-center max-sm:flex-col max-sm:items-start">
        <div className="imagepart w-[100px] h-[100px] max-sm:mx-auto bg-red-400 rounded-full overflow-hidden relative">
          <img
            className="w-full h-full object-cover"
            src={newProfilePic || newemploye?.organizationlogo?.url}
            alt=""
          />
          <label className="absolute bottom-3 right-2 bg-gray-200 px-1 z-20 rounded-full cursor-pointer ">
            <i className="ri-pencil-line"></i>
            <input
              type="file"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>
        <div className="description">
          <h1 className="text-2xl font-semibold">
            {newemploye?.firstname} {newemploye?.lastname}
          </h1>
          <p className="text-sm">{newemploye?.organizationname}</p>
          <p className="text-sm">{newemploye?.email}</p>
          <p className="text-sm">+91 {newemploye?.contact}</p>
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 text-white px-3 py-1 rounded mt-2"
          >
            Edit Profile
          </button>
        </div>
      </div>

      {isEditing && (
        <form onSubmit={handleEdit} className="mt-5 border p-5 rounded">
          <div className="flex gap-4 mb-4 max-sm:flex-col">
            <div className="flex flex-col w-1/2 max-sm:w-full">
              <label>First Name</label>
              <input
                type="text"
                value={newemploye.firstname}
                onChange={(e) => setnewemploye({ ...newemploye, firstname: e.target.value })}
                className="bg-gray-100 p-2 rounded"
              />
            </div>
            <div className="flex flex-col w-1/2 max-sm:w-full">
              <label>Last Name</label>
              <input
                type="text"
                value={newemploye.lastname}
                onChange={(e) => setnewemploye({ ...newemploye, lastname: e.target.value })}
                className="bg-gray-100 p-2 rounded"
              />
            </div>
          </div>
          <div className="flex flex-col mb-4">
            <label>Email</label>
            <input
              type="email"
              value={newemploye.email}
              onChange={(e) => setnewemploye({ ...newemploye, email: e.target.value })}
              className="bg-gray-100 p-2 rounded"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label>Organization Name</label>
            <input
              type="text"
              value={newemploye.organizationname}
              onChange={(e) => setnewemploye({ ...newemploye, organizationname: e.target.value })}
              className="bg-gray-100 p-2 rounded"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label>Contact</label>
            <input
              type="text"
              value={newemploye.contact}
              onChange={(e) => setnewemploye({ ...newemploye, contact: e.target.value })}
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

      <form onSubmit={handleChangePassword} className="mt-5 border p-5 rounded">
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
