"use client"

import React, { useState } from "react";
import Select, { MultiValue } from "react-select";
import CreatableSelect from "react-select/creatable";
import emailjs from '@emailjs/browser';
import Navbar from "@/components/src/navbar"
import { useRouter } from "next/navigation";

import { createProfile } from "./actions";

type FormDataType = {
  profile: {
    name: string;
    email: string;
    selectedPrograms: { value: string; label: string }[];
    selectedInternshipOptions: { value: string; label: string; price: number }[];
    selectedResumeOptions: { value: string; label: string; price: number }[];
    selectedSATPrep: { value: string; label: string; price: number };
    satOneHourCount: number;
    additionalInfo: string;
  }
};

const ArenaSignUpForm = () => {

  const router = useRouter(); 

  const [formData, setFormData] = useState<FormDataType>({
    profile: {
      name: "",
      email: "",
      selectedPrograms: [],
      selectedInternshipOptions: [],
      selectedResumeOptions: [],
      selectedSATPrep: { value: "", label: "", price: 0 },
      satOneHourCount: 0,
      additionalInfo: "",
    }
  });

  const internshipOptions: { value: string, label: string, price: number }[] = [
    { value: "General Internship Help", label: "General Internship Help - $40", price: 40 },
    { value: "Guaranteed Internship Placement", label: "Guaranteed Internship Placement - $150", price: 150 },
    { value: "General Professor Internship Help", label: "General Professor Internship Help - $60", price: 60 },
  ];

  const resumeOptions: { value: string, label: string, price: number }[] = [
    { value: "Resume & Cover Letter Review", label: "Resume & Cover Letter Review - $25", price: 25 },
    { value: "Interview Prep", label: "Interview Prep - $30", price: 30 },
  ];

  const satPrepOptions: { value: string, label: string, price: number }[] = [
    { value: "10 Hours", label: "10 Hours - $149", price: 149 },
    { value: "25 Hours", label: "25 Hours - $359", price: 359 },
    { value: "50 Hours", label: "50 Hours - $699", price: 699 },
  ];

  const summerProgramOptions: { value: string, label: string }[] = [
    { value: "AI4ALL (Bay Area)", label: "AI4ALL (Bay Area)" },
    { value: "Alameda County 4-H Summer Camp (Bay Area)", label: "Alameda County 4-H Summer Camp (Bay Area)" },
    { value: "American Conservatory Theater Summer Training Congress (San Francisco)", label: "American Conservatory Theater Summer Training Congress (San Francisco)" },
    { value: "Amgen Scholars Program (National)", label: "Amgen Scholars Program (National)" },
    { value: "Art Camp at Richmond Art Center (Bay Area)", label: "Art Camp at Richmond Art Center (Bay Area)" },
    { value: "AspireIT Summer Camp (Bay Area)", label: "AspireIT Summer Camp (Bay Area)" },
    { value: "ATDP at UC Berkeley (Bay Area)", label: "ATDP at UC Berkeley (Bay Area)" },
    { value: "Astronomy Academy at Chabot Space & Science Center (Oakland)", label: "Astronomy Academy at Chabot Space & Science Center (Oakland)" },
    { value: "Bay Area Writing Project Young Writers Camp (Berkeley)", label: "Bay Area Writing Project Young Writers Camp (Berkeley)" },
    { value: "Berkeley Lab Summer Student Program (Berkeley)", label: "Berkeley Lab Summer Student Program (Berkeley)" },
    { value: "Black Girls Code Summer Camp (San Francisco)", label: "Black Girls Code Summer Camp (San Francisco)" },
    { value: "Brandeis University Precollege Online Program (National)", label: "Brandeis University Precollege Online Program (National)" },
    { value: "Brookhaven National Lab Summer High School Internship (National)", label: "Brookhaven National Lab Summer High School Internship (National)" },
    { value: "Camp BizSmart (Silicon Valley)", label: "Camp BizSmart (Silicon Valley)" },
    { value: "Camp Galileo (Bay Area)", label: "Camp Galileo (Bay Area)" },
    { value: "Camp Kesem (Stanford) (Bay Area)", label: "Camp Kesem (Stanford) (Bay Area)" },
    { value: "Camp Unalayee Wilderness (Bay Area)", label: "Camp Unalayee Wilderness (Bay Area)" },
    { value: "Carnegie Mellon University Pre-College Programs (National)", label: "Carnegie Mellon University Pre-College Programs (National)" },
    { value: "COSMOS (UC campuses)", label: "COSMOS (UC campuses)" },
    { value: "Coursera Summer Learning Program (National, online)", label: "Coursera Summer Learning Program (National, online)" },
    { value: "Davidson THINK Summer Institute (Reno, NV)", label: "Davidson THINK Summer Institute (Reno, NV)" },
    { value: "Design Quest at The Tech Interactive (San Jose)", label: "Design Quest at The Tech Interactive (San Jose)" },
    { value: "Discovery Internships (National)", label: "Discovery Internships (National)" },
    { value: "Earthwatch Institute Teen Expeditions (Bay Area/National)", label: "Earthwatch Institute Teen Expeditions (Bay Area/National)" },
    { value: "Experiences in Research at Berkeley Labs (Berkeley)", label: "Experiences in Research at Berkeley Labs (Berkeley)" },
    { value: "Exploring Computer Science at SRI International (Menlo Park)", label: "Exploring Computer Science at SRI International (Menlo Park)" },
    { value: "EXPLO at Yale Summer Programs (National)", label: "EXPLO at Yale Summer Programs (National)" },
    { value: "Farm Academy Live Summer Program (Bay Area)", label: "Farm Academy Live Summer Program (Bay Area)" },
    { value: "Foothill College Summer Programs for High Schoolers (Bay Area)", label: "Foothill College Summer Programs for High Schoolers (Bay Area)" },
    { value: "Future Stars Summer Camps (Athletics) (Bay Area)", label: "Future Stars Summer Camps (Athletics) (Bay Area)" },
    { value: "Future Problem Solvers International Conference (National)", label: "Future Problem Solvers International Conference (National)" },
    { value: "Girls Who Code Summer Immersion Program (Bay Area)", label: "Girls Who Code Summer Immersion Program (Bay Area)" },
    { value: "Golden Gate National Parks Conservancy Summer Programs (Bay Area)", label: "Golden Gate National Parks Conservancy Summer Programs (Bay Area)" },
    { value: "Gustavus Adolphus College Summer Speech Institute (National)", label: "Gustavus Adolphus College Summer Speech Institute (National)" },
    { value: "Harker School Summer Programs (San Jose)", label: "Harker School Summer Programs (San Jose)" },
    { value: "Haas School of Business Entrepreneurship Program for Youth (Berkeley)", label: "Haas School of Business Entrepreneurship Program for Youth (Berkeley)" },
    { value: "Head-Royce School Summer Programs (Oakland)", label: "Head-Royce School Summer Programs (Oakland)" },
    { value: "High School Summer Internship Program at UCSF (San Francisco)", label: "High School Summer Internship Program at UCSF (San Francisco)" },
    { value: "Humanities Summer Program at Stanford (Stanford)", label: "Humanities Summer Program at Stanford (Stanford)" },
    { value: "iD Tech Camps (Stanford, UC Berkeley, SF State) (Bay Area)", label: "iD Tech Camps (Stanford, UC Berkeley, SF State) (Bay Area)" },
    { value: "Internships at NASA Ames Research Center (Mountain View)", label: "Internships at NASA Ames Research Center (Mountain View)" },
    { value: "International Diplomacy Program by Envision (National)", label: "International Diplomacy Program by Envision (National)" },
    { value: "Intro to Design Thinking at Stanford D-School (Stanford)", label: "Intro to Design Thinking at Stanford D-School (Stanford)" },
    { value: "Ivy League Edge Summer Leadership Program (National)", label: "Ivy League Edge Summer Leadership Program (National)" },
    { value: "Johns Hopkins Center for Talented Youth (CTY) (National)", label: "Johns Hopkins Center for Talented Youth (CTY) (National)" },
    { value: "Juma Ventures Youth Summer Employment Program (San Francisco)", label: "Juma Ventures Youth Summer Employment Program (San Francisco)" },
    { value: "Khan Academy Summer Challenge (Online/National)", label: "Khan Academy Summer Challenge (Online/National)" },
    { value: "KIPP King Summer Leadership Institute (Bay Area)", label: "KIPP King Summer Leadership Institute (Bay Area)" },
    { value: "Lawrence Hall of Science Summer Camps (Berkeley)", label: "Lawrence Hall of Science Summer Camps (Berkeley)" },
    { value: "Leadership in Action Program at Stanford Pre-Collegiate Studies (Stanford)", label: "Leadership in Action Program at Stanford Pre-Collegiate Studies (Stanford)" },
    { value: "Lick-Wilmerding High School Summerbridge (San Francisco)", label: "Lick-Wilmerding High School Summerbridge (San Francisco)" },
    { value: "Loyola Marymount University Pre-College Summer Programs (National)", label: "Loyola Marymount University Pre-College Summer Programs (National)" },
    { value: "MIT Research Science Institute (RSI) (National)", label: "MIT Research Science Institute (RSI) (National)" },
    { value: "Marine Science Institute Summer Camps (Redwood City)", label: "Marine Science Institute Summer Camps (Redwood City)" },
    { value: "Mills College Summer Arts Program (Oakland)", label: "Mills College Summer Arts Program (Oakland)" },
    { value: "Monterey Bay Aquarium Teen Internship (Bay Area)", label: "Monterey Bay Aquarium Teen Internship (Bay Area)" },
    { value: "NASA’s SEES (STEM Enhancement in Earth Science) Summer Program (National)", label: "NASA’s SEES (STEM Enhancement in Earth Science) Summer Program (National)" },
    { value: "National Student Leadership Conference (National)", label: "National Student Leadership Conference (National)" },
    { value: "National Youth Leadership Forum: Engineering (National)", label: "National Youth Leadership Forum: Engineering (National)" },
    { value: "Northwestern University Pre-Collegiate Programs (National)", label: "Northwestern University Pre-Collegiate Programs (National)" },
    { value: "NSLC on Medicine & Health Care (UC Berkeley) (Berkeley)", label: "NSLC on Medicine & Health Care (UC Berkeley) (Berkeley)" },
    { value: "Oakland Zoo Teen Wild Guides Summer Program (Oakland)", label: "Oakland Zoo Teen Wild Guides Summer Program (Oakland)" },
    { value: "Outward Bound California Summer Programs (Bay Area)", label: "Outward Bound California Summer Programs (Bay Area)" },
    { value: "Pacific Boychoir Academy Summer Camps (Oakland)", label: "Pacific Boychoir Academy Summer Camps (Oakland)" },
    { value: "Peninsula Youth Theater Summer Program (Mountain View)", label: "Peninsula Youth Theater Summer Program (Mountain View)" },
    { value: "Pioneers in Engineering (PiE) Summer Robotics Program (Berkeley)", label: "Pioneers in Engineering (PiE) Summer Robotics Program (Berkeley)" },
    { value: "Princeton University Summer Journalism Program (National)", label: "Princeton University Summer Journalism Program (National)" },
    { value: "Quantum Computing Summer School by Qubit by Qubit (National, online)", label: "Quantum Computing Summer School by Qubit by Qubit (National, online)" },
    { value: "Research Science Institute (RSI) by MIT (National)", label: "Research Science Institute (RSI) by MIT (National)" },
    { value: "Rice University STEM Summer Programs (National)", label: "Rice University STEM Summer Programs (National)" },
    { value: "Rosetta Institute of Biomedical Research Molecular Medicine Summer Camp (San Francisco)", label: "Rosetta Institute of Biomedical Research Molecular Medicine Summer Camp (San Francisco)" },
    { value: "Santa Clara University Summer Engineering Seminar (SES) (Bay Area)", label: "Santa Clara University Summer Engineering Seminar (SES) (Bay Area)" },
    { value: "San Francisco Conservatory of Music Pre-College Program (San Francisco)", label: "San Francisco Conservatory of Music Pre-College Program (San Francisco)" },
    { value: "San Jose State University Aviation Summer Camp (San Jose)", label: "San Jose State University Aviation Summer Camp (San Jose)" },
    { value: "Sequoia Teen Entrepreneur Program (Bay Area)", label: "Sequoia Teen Entrepreneur Program (Bay Area)" },
    { value: "Shakespeare Camp at the California Shakespeare Theater (Bay Area)", label: "Shakespeare Camp at the California Shakespeare Theater (Bay Area)" },
    { value: "Silicon Valley Youth Climate Action Summer Program (Bay Area)", label: "Silicon Valley Youth Climate Action Summer Program (Bay Area)" },
    { value: "Smithsonian Summer Camps (National)", label: "Smithsonian Summer Camps (National)" },
    { value: "Stanford Pre-Collegiate Summer Institutes (Stanford)", label: "Stanford Pre-Collegiate Summer Institutes (Stanford)" },
    { value: "Stanford University Mathematics Camp (SUMaC) (Stanford)", label: "Stanford University Mathematics Camp (SUMaC) (Stanford)" },
    { value: "Stevenson School Summer Camps (Pebble Beach)", label: "Stevenson School Summer Camps (Pebble Beach)" },
    { value: "Summer Discovery Programs (UCLA, UC Berkeley, etc.) (Bay Area)", label: "Summer Discovery Programs (UCLA, UC Berkeley, etc.) (Bay Area)" },
    { value: "Summer Immersion Program at Columbia University (National)", label: "Summer Immersion Program at Columbia University (National)" },
    { value: "Summer Research Academy at the Lawrence Berkeley National Lab (Berkeley)", label: "Summer Research Academy at the Lawrence Berkeley National Lab (Berkeley)" },
    { value: "Summer Science Internship Program at Stanford (Stanford)", label: "Summer Science Internship Program at Stanford (Stanford)" },
    { value: "Teen Advocates for Science Communication at the California Academy of Sciences (San Francisco)", label: "Teen Advocates for Science Communication at the California Academy of Sciences (San Francisco)" },
    { value: "The Crucible Industrial Arts Camps (Oakland)", label: "The Crucible Industrial Arts Camps (Oakland)" },
    { value: "The Harker School STEM Institute (San Jose)", label: "The Harker School STEM Institute (San Jose)" },
    { value: "UC Davis Young Scholars Program (Davis)", label: "UC Davis Young Scholars Program (Davis)" },
    { value: "UCLA Pre-College Summer Institute (Los Angeles)", label: "UCLA Pre-College Summer Institute (Los Angeles)" },
    { value: "UCSF Internships for Teen Scientists (San Francisco)", label: "UCSF Internships for Teen Scientists (San Francisco)" },
    { value: "USC Summer Programs for High School Students (Los Angeles)", label: "USC Summer Programs for High School Students (Los Angeles)" },
    { value: "Youth Leadership Summit for Math and Science (National)", label: "Youth Leadership Summit for Math and Science (National)" },
    { value: "Yosemite Institute High School Programs (Yosemite)", label: "Yosemite Institute High School Programs (Yosemite)" },
  ];

  const handleInputChange = (e: { target: { name: string; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        [name]: value
      }
    }));
  };
  const handleMultiSelectChange = (name: string, options: MultiValue<{ value: string, label: string, price: number }>) => {
    const values = options ? options.map((option) => ({ value: option.value, label: option.label, price: option.price })) : [];
    setFormData((prev) => ({ 
      ...prev, 
      profile: {
        ...prev.profile, 
        [name]: values
      }
    }));
  };

  const calculateTotalPrice = () => {
    let total: number = 0;

    total += formData.profile.selectedPrograms.length > 0 ? 35 + (formData.profile.selectedPrograms.length - 1) * 15 : 0;

    total += formData.profile.selectedInternshipOptions.reduce((acc, cv) => acc + cv.price, 0);

    formData.profile.selectedResumeOptions.forEach((option) => {
      total += option.price; 
    })
  
    total += formData.profile.selectedSATPrep.price ? formData.profile.selectedSATPrep.price : 0;

    total += formData.profile.satOneHourCount * 22;

    console.log(total); 
    return total;
  };


  const handleFormSubmit = async(e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!formData.profile.name || !formData.profile.email) {
      alert("Please fill out all required fields.");
      return;
    }

    const emailParams = {
      ...formData.profile,
      selectedPrograms: formData.profile.selectedPrograms.join(", "),
      speculatedPrice: calculateTotalPrice(),
    };

    let response = await createProfile(formData); 

    if(response.success == true){
      console.log("horray"); 
    } else {
      console.log("anirudh ramakrishna is baheind htind."); 
    }


    emailjs
      .send("service_2wckxjr", "template_xugiogj", emailParams, "Q1b_pv0uG9JEXJhAl")
      .then(
        () => {
          alert("Form submitted successfully!");
          router.push("/"); 
        },
        (error) => {
          console.error("EmailJS Error:", error.text);
          alert("An error occurred. Please try again.");
        }
      );
  };


  return (
      <div>
      <Navbar />
      <div className=" bg-white flex items-center justify-center  mt-12">
        <div className="w-full   bg-white p-6 rounded-lg mb-8 ">
          
         <h1 className = "text-5xl font-bold mb-4 ">Sign-Up</h1>
      <p className="text-sm italic text-gray-700 mb-4">This form is designed to gauge your interest and help us better understand how we can support you. Through this program, we offer a variety of services tailored to meet your goals, including personalized guidance, expert consultations, hands-on resources, and collaborative opportunities to bring your vision to life. Simply select all the options that align with your interests and leave any additional information or details in the space provided below. Once we receive your response, we’ll follow up via email to schedule a meeting where we can dive deeper into your plans, answer your questions, and explore how our program can best assist you.
  </p>
          <form onSubmit={handleFormSubmit} className="space-y-6">
            {/* User Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.profile.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.profile.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md"
                  required
                />
              </div>
            </div>
  
            {/* Summer Programs */}
  <div>
    <label className="block text-sm font-semibold mb-2">
      Summer Programs You're Interested In Applying To
    </label>
    <CreatableSelect
      isMulti
      options={summerProgramOptions}
      onChange={(options) => setFormData((prevdata) => ({
        ...prevdata, 
        profile: {
          ...prevdata.profile,
          selectedPrograms: options ? options.map((option) => ({ value: option.value, label: option.label })) : []
        }
      }))}
      className="w-full"
      placeholder="Type to add your own program or select from the list"
      formatCreateLabel={(inputValue) => `Select "${inputValue}"`}
    />
  </div>
  
  
  
            {/* Internship Options */}
            <div>
              <label className="block text-sm font-semibold mb-2">Internship Services You're Interested In</label>
              <Select
                isMulti
                options={internshipOptions}
                onChange={(options) => setFormData((prevdata) => ({
                  ...prevdata, 
                  profile: {
                    ...prevdata.profile, 
                    selectedInternshipOptions: options ? options.map((option) => ({ value: option.value, label: option.label, price: option.price })) : []
                  }
                }))}
                className="w-full"
              />
            </div>
  
            {/* Resume Options */}
            <div>
              <label className="block text-sm font-semibold mb-2">Resume Services You're Interested In</label>
              <Select
                isMulti
                options={resumeOptions}
                onChange={(options) => setFormData((prevdata) => ({
                  ...prevdata, 
                  profile: {
                    ...prevdata.profile, 
                    selectedResumeOptions: options ? options.map((option) => ({ value: option.value, label: option.label, price: option.price })) : []
                  }
                }))}
                className="w-full"
              />
            </div>
  
            {/* SAT/ACT Prep */}
            <div>
              <label className="block text-sm font-semibold mb-2">SAT/ACT Prep Options You're Interested In</label>
              <Select
                options={satPrepOptions}
                onChange={(option) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    profile: {
                      ...prevData.profile,
                      selectedSATPrep: option
                        ? { value: option.value, label: option.label, price: option.price }
                        : { value: "", label: "", price: 0 }, 
                    },
                  }))
                }
                className="w-full"
              />
            </div>
  
            <div>
              <label className="block text-sm font-semibold mb-2">Add Individual SAT/ACT Hours</label>
              <input
                type="number"
                name="satOneHourCount"
                value={formData.profile.satOneHourCount}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Enter hours"
              />
            </div>
          {/* Additional Info Section */}
        <div style={{ marginTop: "20px", marginBottom: "20px" }}>
          <label className="block text-sm font-semibold mb-2">
            Additional Information:
          </label>
          <textarea
            id="additionalInfo"
            name="additionalInfo"
            value={formData.profile.additionalInfo}
            onChange={handleInputChange}
            placeholder="Please provide any additional information here..."
            style={{
              width: "100%",
              height: "150px",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "16px",
              resize: "vertical",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)"
            }}
          />
        </div>
            {/* Submit Button */}
            <button type="submit" className="w-full py-3 bg-black text-white rounded-md">
              Submit
            </button>
          </form>
        </div>
      </div>
      <footer className="bg-white dark:bg-white">
        <div className="px-4 pb-8 sm:px-6 lg:px-8">
          <div className="border-t border-gray-100 pt-8 dark:border-gray-200">
            <div className="items-center">
              <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                © Company 2025 ARENA. All rights reserved.
              </p>
              
            </div>
          </div>
        </div>
      </footer>
      </div>
    );
};

export default ArenaSignUpForm;