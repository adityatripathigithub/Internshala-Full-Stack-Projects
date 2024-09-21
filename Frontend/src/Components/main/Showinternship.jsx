import React, { useEffect, useState } from "react";
import Card from "../Internship/Card";
import axios from "../api/axios";
import { Link, useLocation } from "react-router-dom";

const Showinternships = () => {
  const [internship, setinternship] = useState([]);
  const location = useLocation()
  console.log(location.pathname);

  const allinternship = async () => {
    try {
      const {data} = await axios.post("/student/allinternships");
      setinternship(data.internships);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(internship);
  useEffect(() => {
    allinternship();
  }, []);
  return (
    <div className="px-10">
      <h1 className="text-center my-16 text-4xl font-medium text-[#02203C]">Internships</h1>
      <div className="internship flex flex-wrap justify-center gap-4 pb-10">
        {internship.length > 0 ? (
          internship.map((internship) => <Card key={internship._id} job={internship} />)
        ) : (
          <div className="text-center text-2xl">Loading.....</div>
        )}
      </div>
      
      
     
    </div>
  );
};

export default Showinternships;
