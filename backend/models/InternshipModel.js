// const{ default: mongoose} = require("mongoose");
const mongoose = require("mongoose");

const internshipModel = new mongoose.Schema(
  {
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "student",
      },
    ],
    employe: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "employe",
    },

    profile: {
      type: String,
    },

    skills: String,
    location: String,
    internshipType: {
      type: String,
      enum: ["In-office", "Remote"],
    },
    description: String,
    openings: Number,
    startDate: String,
    endDate: String,
    resposibility: String,
    stipend: {
      status: {
        type: String,
        enum: ["fixed", "negotiable", "performance based", "unpaid"],
      },
      amount: Number,
    },

    perks: String,
    assesments: String,

    duration: String,
  },
  { timestamps: true }
);

const internship = mongoose.model("internship", internshipModel);
module.exports = internship;
