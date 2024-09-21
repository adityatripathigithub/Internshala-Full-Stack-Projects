import React, { createContext, useEffect, useState } from "react";
import axios from "../api/axios";

export const index = createContext();

const Indexxontext = (props) => {
  const [student, setStudent] = useState(false);
  const [employe, setEmploye] = useState(false);
  const [studentdets, setstudentdets] = useState({});
  const [employedets, setemployedets] = useState({});

  const isstudeentloggedin = async () => {
    try {
      const { data } = await axios.post("/student");
      if (data.student) {
        setStudent(true);
        setstudentdets(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const isemployeLoggedinv = async () => {
    try {
      const { data } = await axios.post("/employe/current");
      console.log(data);
      if (data) {
        setEmploye(true);
        setemployedets(data);
      }
    } catch (error) {}
  };

  const allfuction = {
    student,
    setEmploye,
    setStudent,
    employe,
    employedets,
    studentdets,
    isstudeentloggedin,
    isemployeLoggedinv,
    setstudentdets,
  };
  useEffect(() => {
    isstudeentloggedin();
    isemployeLoggedinv();
  }, [student, employe]);
  return <index.Provider value={allfuction}>{props.children}</index.Provider>;
};

export default Indexxontext;
