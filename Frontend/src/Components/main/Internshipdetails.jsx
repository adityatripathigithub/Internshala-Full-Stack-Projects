import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { index } from "../context/Indexxontext";
import { toast } from "react-toastify";

const Internshipdetails = () => {
  const { employe, studentdets } = useContext(index);
  console.log(studentdets.student.internship);
  console.log(studentdets.student.internships);
  const { id } = useParams();
  const navigate = useNavigate();
  const [internship, setInternship] = useState({});
  console.log(internship._id);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    profile: "",
    location: "",
    amount: "",
    status: "",
    duration: "",
    perks: "",
    skills: "",
    salary: "",
    startDate: "",
    endDate: "",
    openings: "",
    resposibility: "",
  });

  const fetchdets = async () => {
    try {
      const { data } = await axios.post(`/employe/internship/read/${id}`);
      setInternship(data.internship);
      setFormData({
        profile: data.internship.profile || "",
        location: data.internship.location || "",
        amount: data.internship.stipend?.amount || "",
        status: data.internship.stipend?.status || "",
        duration: data.internship.duration || "",
        perks: data.internship.perks || "",
        skills: data.internship.skills || "",
        salary: data.internship.salary || "",
        startDate: data.internship.startDate || "",
        endDate: data.internship.endDate || "",
        openings: data.internship.openings || "",
        resposibility: data.internship.resposibility || "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchdets();
  }, []);

  const handleDelete = async () => {
    try {
      await axios.post(`/employe/internship/delete/${id}`);
      navigate("/employe/postedinternship");
      // Redirect to the internships list page after deletion
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.post(`/employe/internship/update/${id}`, {
        profile: formData.profile,
        location: formData.location,
        amount: formData.amount,
        status: formData.status,
        duration: formData.duration,
        perks: formData.perks,
        skills: formData.skills,
        salary: formData.salary,
        startDate: formData.startDate,
        endDate: formData.endDate,
        openings: formData.openings,
        resposibility: formData.resposibility,
      });
      setIsEditing(false); // Close the form after a successful update
      fetchdets(); // Refresh internship details
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handelapply = async () => {
    try {
      const { data } = await axios.post(`/student/apply/internship/${id}`);
      console.log(data);
      toast.success("Applide successfully");
      navigate("/student/internshipapplied");
      // Redirect to the internships list page after deletion
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="pb-10 px-10">
      <h1 className="text-2xl font-semibold text-center my-10 capitalize">
        {internship.profile}
      </h1>
      <div className="details-part w-[90%] mx-auto border-2 rounded-xl p-10 max-sm:w-full max-sm:p-4">
        <div className="companyy flex items-center justify-between max-sm:flex-col-reverse ">
          <div className="companylist">
            <h1 className="text-lg font-semibold capitalize">
              {internship.profile}
            </h1>
          </div>
          <div className="companylogo w-[100px] rounded-full h-[100px] bg-lime-100">
            <img
              className="w-full h-full object-cover rounded-full"
              src={internship?.employe?.organizationlogo?.url}
              alt=""
            />
          </div>
        </div>
        <div className="location flex gap-3 max-sm:mt-2">
          <i className="ri-map-pin-line"></i>
          <p className="text-sm ">{internship.location}</p>
        </div>
        <div className="details flex gap-10 my-5 max-sm:flex-col max-sm:gap-2 max-sm:mt-2">
          <div className="startdata">
            <p>
              <i className="ri-play-circle-line mr-2"></i>Start Date
            </p>
            <p className="text-sm ml-6">{internship.startDate}</p>
          </div>
          <div className="startdata">
            <p>
              <i className="ri-calendar-line mr-2"></i>Duration
            </p>
            <p className="text-sm ml-6">{internship.duration}</p>
          </div>
          <div className="startdata">
            <p>
              <i className="ri-money-rupee-circle-line mr-2"></i>Stipend
            </p>
            <p className="text-sm ml-6">
              ₹ {internship?.stipend?.amount}/month{" "}
              {internship?.stipend?.status}
            </p>
          </div>
          <div className="startdata">
            <p>
              <i className="ri-time-line mr-2"></i>Apply By
            </p>
            <p className="text-sm ml-6">{internship.endDate}</p>
          </div>
        </div>
        <div className="dateposted-type flex items-center gap-3 justify-start">
          <p className="w-max bg-green-300 text-xs px-2 py-1 rounded">
            Posted {internship.createdAt?.split("T")[0]}
          </p>
          <p className="bg-slate-300 w-max text-xs px-2 py-1 rounded">
            Internship
          </p>
        </div>
        <hr className="my-4" />
        <div className="descriptiom">
          <h1 className="text-lg font-semibold mt-2">About Internship </h1>
          <p>{internship.description}</p>
        </div>
        <div className="salary">
          <h1 className="text-lg font-semibold mt-2">Internship Type </h1>
          <p className="text-xs">{internship.internshipType}</p>
        </div>
        <div className="opening">
          <h1 className="text-lg font-semibold mt-2">Number Of Opening </h1>
          <p className="text-sm">{internship.openings}</p>
        </div>

        <div className="opening">
          <h1 className="text-lg font-semibold mt-2">Responsibility</h1>
          <p className="text-sm">{internship.resposibility}</p>
        </div>
        <div className="opening">
          <h1 className="text-lg font-semibold mt-2">Perks</h1>
          <ul className="text-sm">
            {internship?.perks?.split(",").map((perk, index) => (
              <li key={index}>
                {index + 1}. {perk.trim()}
              </li>
            ))}
          </ul>
        </div>
        <div className="opening">
          <h1 className="text-lg font-semibold mt-2">Skills</h1>
          <ul className="text-sm">
            {internship?.skills?.split(",").map((skill, index) => (
              <li key={index}>
                {index + 1}. {skill.trim()}
              </li>
            ))}
          </ul>
        </div>

        {employe ? (
          <div className="delete-and-update flex gap-3 mt-10">
            <button
              className="bg-red-400 px-6 py-1 rounded"
              onClick={handleDelete}
            >
              Delete
            </button>
            <button
              className="bg-[#71D499] px-6 py-1 rounded"
              onClick={() => setIsEditing(!isEditing)}
            >
              Update
            </button>
          </div>
        ) : (
          <div>
            {studentdets.student.internships.find((obj) => obj._id === id) ? (
              <button
                
                className="bg-[#ef776a] px-6 py-1 rounded mt-10 "
              >
                All Ready Applied<i className="ri-arrow-right-s-line"></i>
              </button>
            ) : (
              <button onClick={handelapply} className="bg-[#71D499] px-6 py-1 rounded mt-10">
                Apply<i className="ri-arrow-right-s-line"></i>
              </button>
            )}
          </div>
        )}

        {isEditing && (
          <div className="mt-10">
            <h2 className="text-lg font-semibold">Update Internship</h2>
            <form className="flex flex-col gap-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Profile
                </label>
                <input
                  type="text"
                  name="profile"
                  value={formData.profile}
                  onChange={handleChange}
                  placeholder="Internship Title"
                  className="border p-2 rounded w-full"
                />
              </div>
              {/* <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Internship Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Internship Description" className="border p-2 rounded w-full"></textarea>
              </div> */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Location"
                  className="border p-2 rounded w-full"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Stipend Amount
                </label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="Stipend Amount"
                  className="border p-2 rounded w-full"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Stipend Status
                </label>
                {/* <input type="text" name="status" value={formData.status} onChange={handleChange} placeholder="Stipend Status" className="border p-2 rounded w-full" /> */}
                <select
                  name="status"
                  value={formData.status}
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
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Duration
                </label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="Duration"
                  className="border p-2 rounded w-full"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Perks
                </label>
                <input
                  type="text"
                  name="perks"
                  value={formData.perks}
                  onChange={handleChange}
                  placeholder="Perks"
                  className="border p-2 rounded w-full"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Skills
                </label>
                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="Skills"
                  className="border p-2 rounded w-full"
                />
              </div>
              {/* <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Salary</label>
                <input type="number" name="salary" value={formData.salary} onChange={handleChange} placeholder="Salary" className="border p-2 rounded w-full" />
              </div> */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  placeholder="Start Date"
                  className="border p-2 rounded w-full"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  End Date
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  placeholder="End Date"
                  className="border p-2 rounded w-full"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Number of Openings
                </label>
                <input
                  type="number"
                  name="openings"
                  value={formData.openings}
                  onChange={handleChange}
                  placeholder="Number of Openings"
                  className="border p-2 rounded w-full"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Responsibility
                </label>
                <textarea
                  name="resposibility"
                  value={formData.resposibility}
                  onChange={handleChange}
                  placeholder="Responsibility"
                  className="border p-2 rounded w-full"
                ></textarea>
              </div>
              <button
                type="button"
                onClick={handleUpdate}
                className="bg-[#71D499] px-6 py-1 rounded"
              >
                Save
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Internshipdetails;
