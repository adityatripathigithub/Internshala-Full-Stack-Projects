import React from "react";
import logo from "../../assets/joblogo.jpg";

const Footer = () => {
  return (
    <div className="w-full px-20 pt-10 bg-slate-100 max-sm:px-2 ">
      <div className="fotterp1 w-full flex gap-10 max-sm:w-full max-sm:flex-col max-sm:gap-2">
        <div className="left w-1/2 max-sm:w-full">
          <img className="w-[300px] my-2" src={logo} alt="" />
          <h1 className="font-semibold">About</h1>
          <p className="text-sm">
            Your go-to platform for finding your next career opportunity. We
            connect job seekers with top employers in various industries.
          </p>
        </div>
        <div className="links w-1/2 flex max-md:w-full max-sm:flex-col">
          <div className="part1 w-max px-5 max-sm:w-full max-sm:px-0">
            <h2 className="font-semibold"> Quick Links </h2>
            <p className="text-sm">Home </p>
            <p className="text-sm">Home </p>
            <p className="text-sm">Home </p>
            <p className="text-sm">Home </p>
          </div>
          <div className="part2 w-max px-5 max-sm:w-full max-sm:px-0">
            <h2 className="font-semibold"> Follow Us</h2>
            <p className="text-sm">Facebook</p>
            <p className="text-sm">Facebook</p>
            <p className="text-sm">Facebook</p>
            <p className="text-sm">Facebook</p>
          </div>
          <div className="part3 w-max px-5 max-sm:w-full max-sm:px-0">
            <h2 className="font-semibold">Contact Us</h2>
            <p>Email : support@yourjobwebsite.com</p>
            <p>Phone : 1-800-123-4567</p>
          </div>
        </div>
      </div>
      <div className="canterpart text-center my-8">
        <h2 className="font-semibold text-lg leading-3">Subscribe to Our Newsletter</h2>
        <p className="text-sm">Stay updated with the latest job postings and career tips.</p>
      </div>
      <p className="text-center border-t-2 py-2">Your Job Website © 2024. All rights reserved.</p>
    </div>
  );
};

export default Footer;
