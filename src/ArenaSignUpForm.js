import React, { useState } from "react";
import Select from "react-select";
import CreatableSelect from 'react-select/creatable';
import emailjs from "emailjs-com";
import { useNavigate } from "react-router-dom";
import NAVBAR1 from "./navbar";
import { db } from './firebase';
import { Timestamp } from 'firebase/firestore';
import { addDoc, collection } from 'firebase/firestore';
import { doc, updateDoc } from "firebase/firestore"; // Import directly from firebase/firestore

function ArenaSignUpForm() {
 const [formData, setFormData] = useState({
   name: "",
   email: "",
   parentEmail: "",
   phone: "",
   grade: "",
   selectedPrograms: [],
   selectedInternshipOptions: [],
   selectedOlympiadOptions: [],
   selectedResumeOptions: [],
   selectedSATPrep: "",
   satOneHourCount: 0,
   additionalInfo: "",
   createdAt: "", 
 });

 const handleNoneForNow = async (field) => {
   setFormData((prev) => ({
     ...prev,
     [field]: Array.isArray(prev[field]) ? ["None"] : "None"
   }));
    try {
     const userRef = doc(db, "arenaSignUps", formData.email); // Identifies the user's entry
     await updateDoc(userRef, { [field]: Array.isArray(formData[field]) ? ["None"] : "None" });
     console.log(`Updated ${field} to "None" in Firestore`);
   } catch (error) {
     console.error(`Error updating ${field}:`, error);
   }
 };
  const navigate = useNavigate();


 const gradeOptions = [
   { value: "8th", label: "8th Grade" },
   { value: "9th", label: "9th Grade" },
   { value: "10th", label: "10th Grade" },
   { value: "11th", label: "11th Grade" },
   { value: "12th", label: "12th Grade" }
 ];


 const internshipOptions = [
   { value: "General Internship Help", label: "General Internship Help", price: 40 },
   { value: "Guaranteed Internship Placement", label: "Guaranteed Internship Placement", price: 150 },
   { value: "General Professor Internship Help", label: "General Professor Internship Help", price: 60 },
 ];


 const olympiadOptions = [
   { value: "AMC", label: "AMC", price: 50 },
   { value: "USABO", label: "USABO", price: 60 },
   { value: "USACO", label: "USACO", price: 55 },
   { value: "USNCO", label: "USNCO", price: 65 },
];




 const resumeOptions = [
   { value: "Resume & Cover Letter Review", label: "Resume & Cover Letter Review", price: 25 },
   { value: "Interview Prep", label: "Interview Prep", price: 30 },
 ];


 const satPrepOptions = [
   { value: "5 Hours", label: "5 one-hour meetings and 1 practice test", price: 150 },
   { value: "15 Hours", label: "15 one-hour meetings and 3 practice tests", price: 360 },
   { value: "30 Hours", label: "30 one-hour meetings and 6 practice tests", price: 680 },
 ];


 const summerProgramOptions = [
   { value: "AI4ALL (Bay Area)", label: "AI4ALL (Bay Area)" },
   { value: "AI4ALL Bootcamp", label: "AI4ALL Bootcamp: Artificial Intelligence for all students" },
   { value: "AIMI AI Bootcamp", label: "AIMI AI Bootcamp: Hands-on AI training" },
   { value: "AIMI AI Internship", label: "AIMI AI Internship: Artificial Intelligence in Medicine" },
   { value: "Alameda County 4-H Summer Camp (Bay Area)", label: "Alameda County 4-H Summer Camp (Bay Area)" },
   { value: "American Conservatory Theater Summer Training Congress (San Francisco)", label: "American Conservatory Theater Summer Training Congress (San Francisco)" },
   { value: "Amgen Scholars Program (National)", label: "Amgen Scholars Program (National)" },
   { value: "ARC STEM Academy", label: "ARC STEM Academy" },
   { value: "Art & Anatomy", label: "Art & Anatomy: Intersection of medicine and art" },
   { value: "Art Camp at Richmond Art Center (Bay Area)", label: "Art Camp at Richmond Art Center (Bay Area)" },
   { value: "AspireIT Summer Camp (Bay Area)", label: "AspireIT Summer Camp (Bay Area)" },
   { value: "Astronomy Academy at Chabot Space & Science Center (Oakland)", label: "Astronomy Academy at Chabot Space & Science Center (Oakland)" },
   { value: "ATDP at UC Berkeley (Bay Area)", label: "ATDP at UC Berkeley (Bay Area)" },
   { value: "Bay Area Writing Project Young Writers Camp (Berkeley)", label: "Bay Area Writing Project Young Writers Camp (Berkeley)" },
   { value: "Beaverworks", label: "Beaverworks: Hands-on STEM projects for students" },
   { value: "Berkeley Lab Summer Student Program (Berkeley)", label: "Berkeley Lab Summer Student Program (Berkeley)" },
   { value: "Black Girls Code Summer Camp (San Francisco)", label: "Black Girls Code Summer Camp (San Francisco)" },
   { value: "Brandeis University Precollege Online Program (National)", label: "Brandeis University Precollege Online Program (National)" },
   { value: "Brookhaven National Lab Summer High School Internship (National)", label: "Brookhaven National Lab Summer High School Internship (National)" },
   { value: "Camp BizSmart (Silicon Valley)", label: "Camp BizSmart (Silicon Valley)" },
   { value: "Camp Galileo (Bay Area)", label: "Camp Galileo (Bay Area)" },
   { value: "Camp Kesem (Stanford) (Bay Area)", label: "Camp Kesem (Stanford) (Bay Area)" },
   { value: "Camp Unalayee Wilderness (Bay Area)", label: "Camp Unalayee Wilderness (Bay Area)" },
   { value: "Carnegie Mellon University Pre-College Programs (National)", label: "Carnegie Mellon University Pre-College Programs (National)" },
   { value: "CCRI - Climate", label: "CCRI - Climate: Climate change-focused internship" },
   { value: "COSMOS (UC campuses)", label: "COSMOS (UC campuses)" },
   { value: "Coursera Summer Learning Program (National, online)", label: "Coursera Summer Learning Program (National, online)" },
   { value: "CSI Internship", label: "CSI Internship: Clinical Summer Internship" },
   { value: "Davidson THINK Summer Institute (Reno, NV)", label: "Davidson THINK Summer Institute (Reno, NV)" },
   { value: "Design Quest at The Tech Interactive (San Jose)", label: "Design Quest at The Tech Interactive (San Jose)" },
   { value: "Discovery Internships (National)", label: "Discovery Internships (National)" },
   { value: "Earthwatch Institute Teen Expeditions (Bay Area/National)", label: "Earthwatch Institute Teen Expeditions (Bay Area/National)" },
   { value: "EXPLO at Yale Summer Programs (National)", label: "EXPLO at Yale Summer Programs (National)" },
   { value: "EXPLORE Biomedical Research", label: "EXPLORE Biomedical Research: Lectures in biomedical science" },
   { value: "Exploring Computer Science at SRI International (Menlo Park)", label: "Exploring Computer Science at SRI International (Menlo Park)" },
   { value: "Experiences in Research at Berkeley Labs (Berkeley)", label: "Experiences in Research at Berkeley Labs (Berkeley)" },
   { value: "Farm Academy Live Summer Program (Bay Area)", label: "Farm Academy Live Summer Program (Bay Area)" },
   { value: "Foothill College Summer Programs for High Schoolers (Bay Area)", label: "Foothill College Summer Programs for High Schoolers (Bay Area)" },
   { value: "Future Problem Solvers International Conference (National)", label: "Future Problem Solvers International Conference (National)" },
   { value: "Future Stars Summer Camps (Athletics) (Bay Area)", label: "Future Stars Summer Camps (Athletics) (Bay Area)" },
   { value: "Girls Who Code Summer Immersion Program (Bay Area)", label: "Girls Who Code Summer Immersion Program (Bay Area)" },
   { value: "Golden Gate National Parks Conservancy Summer Programs (Bay Area)", label: "Golden Gate National Parks Conservancy Summer Programs (Bay Area)" },
   { value: "GRIPS", label: "GRIPS: Genomics Research Program" },
   { value: "Gustavus Adolphus College Summer Speech Institute (National)", label: "Gustavus Adolphus College Summer Speech Institute (National)" },
   { value: "Haas School of Business Entrepreneurship Program for Youth (Berkeley)", label: "Haas School of Business Entrepreneurship Program for Youth (Berkeley)" },
   { value: "HARRIS Internship", label: "HARRIS Internship: Advanced neuroscience training" },
   { value: "HAS Astronomy Program", label: "HAS Astronomy Program: Astronomy focus for high schoolers" },
   { value: "Harker School Summer Programs (San Jose)", label: "Harker School Summer Programs (San Jose)" },
   { value: "Head-Royce School Summer Programs (Oakland)", label: "Head-Royce School Summer Programs (Oakland)" },
   { value: "High School Summer Internship Program at UCSF (San Francisco)", label: "High School Summer Internship Program at UCSF (San Francisco)" },
   { value: "Humanities Summer Program at Stanford (Stanford)", label: "Humanities Summer Program at Stanford (Stanford)" },
   { value: "iD Tech Camps (Stanford, UC Berkeley, SF State) (Bay Area)", label: "iD Tech Camps (Stanford, UC Berkeley, SF State) (Bay Area)" },
   { value: "IFSS Shadowing", label: "IFSS Shadowing: Individual shadowing opportunities" },
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
   { value: "Ross Mathematics Program (National)", label: "Ross Mathematics Program (National)" },
   { value: "Santa Clara University Summer Engineering Seminar (SCU SES) (Santa Clara)", label: "Santa Clara University Summer Engineering Seminar (SCU SES) (Santa Clara)" },
   { value: "San Francisco State University Summer College Prep Camps (San Francisco)", label: "San Francisco State University Summer College Prep Camps (San Francisco)" },
   { value: "San Jose State University Engineering Summer Program (San Jose)", label: "San Jose State University Engineering Summer Program (San Jose)" },
   { value: "Santa Clara County Library Teen Leadership Camp (San Jose)", label: "Santa Clara County Library Teen Leadership Camp (San Jose)" },
   { value: "Scripps College Academy Summer Program (National)", label: "Scripps College Academy Summer Program (National)" },
   { value: "Silicon Valley Community Foundation Summer Fellowship (Bay Area)", label: "Silicon Valley Community Foundation Summer Fellowship (Bay Area)" },
   { value: "Simons Summer Research Program (National)", label: "Simons Summer Research Program (National)" },
   { value: "Smithsonian Summer Camps (Washington, D.C.)", label: "Smithsonian Summer Camps (Washington, D.C.)" },
   { value: "Stanford Institutes of Medicine Summer Research Program (Stanford)", label: "Stanford Institutes of Medicine Summer Research Program (Stanford)" },
   { value: "Stanford Pre-Collegiate Studies Summer Institutes (Stanford)", label: "Stanford Pre-Collegiate Studies Summer Institutes (Stanford)" },
   { value: "Stanford University Mathematics Camp (SUMaC) (Stanford)", label: "Stanford University Mathematics Camp (SUMaC) (Stanford)" },
   { value: "Summer Academy for Math and Science (SAMS) at Carnegie Mellon (National)", label: "Summer Academy for Math and Science (SAMS) at Carnegie Mellon (National)" },
   { value: "Summer Engineering Exploration (SEE) at University of Michigan (National)", label: "Summer Engineering Exploration (SEE) at University of Michigan (National)" },
   { value: "Summer Science Program (SSP) (National)", label: "Summer Science Program (SSP) (National)" },
   { value: "Sustainable Summer Program (National)", label: "Sustainable Summer Program (National)" },
   { value: "Syracuse University Summer College for High School Students (National)", label: "Syracuse University Summer College for High School Students (National)" },
   { value: "Teen Leadership Corps at Exploratorium (San Francisco)", label: "Teen Leadership Corps at Exploratorium (San Francisco)" },
   { value: "Teen Research and Education in Environmental Science (TREES) (National)", label: "Teen Research and Education in Environmental Science (TREES) (National)" },
   { value: "Telluride Association Summer Seminar (TASS) (National)", label: "Telluride Association Summer Seminar (TASS) (National)" },
   { value: "The Tech Interactive Youth Programs (San Jose)", label: "The Tech Interactive Youth Programs (San Jose)" },
   { value: "University of California COSMOS Program (Various Campuses)", label: "University of California COSMOS Program (Various Campuses)" },
   { value: "University of Chicago Summer Session (National)", label: "University of Chicago Summer Session (National)" },
   { value: "University of Michigan Math and Science Scholars (UM-MSS) (National)", label: "University of Michigan Math and Science Scholars (UM-MSS) (National)" },
   { value: "University of Pennsylvania Summer Academies (National)", label: "University of Pennsylvania Summer Academies (National)" },
   { value: "University of Southern California Summer Programs (USC) (National)", label: "University of Southern California Summer Programs (USC) (National)" },
   { value: "UC Berkeley Pre-College Scholars (Berkeley)", label: "UC Berkeley Pre-College Scholars (Berkeley)" },
   { value: "UC Davis Young Scholars Program (National)", label: "UC Davis Young Scholars Program (National)" },
   { value: "UC Irvine High School Summer Institute of Law (Irvine)", label: "UC Irvine High School Summer Institute of Law (Irvine)" },
   { value: "UC Santa Cruz Science Internship Program (SIP) (Santa Cruz)", label: "UC Santa Cruz Science Internship Program (SIP) (Santa Cruz)" },
   { value: "Vanderbilt Summer Academy (National)", label: "Vanderbilt Summer Academy (National)" },
   { value: "Washington University in St. Louis Summer Programs (National)", label: "Washington University in St. Louis Summer Programs (National)" },
   { value: "Worcester Polytechnic Institute Frontiers Program (National)", label: "Worcester Polytechnic Institute Frontiers Program (National)" },
   { value: "Yale Young Global Scholars (YYGS) (National)", label: "Yale Young Global Scholars (YYGS) (National)" },
   { value: "Youth Climate Summit (Bay Area)", label: "Youth Climate Summit (Bay Area)" },
   { value: "Youth Empowered Action (YEA) Camp (National)", label: "Youth Empowered Action (YEA) Camp (National)" },
   { value: "Zoox Robotics High School Internship Program (Foster City)", label: "Zoox Robotics High School Internship Program (Foster City)" },
 ];


 const handleInputChange = (e) => {
   const { name, value } = e.target;
   setFormData((prev) => ({ ...prev, [name]: value }));
 };


 const handleMultiSelectChange = (name, options) => {
   const values = options ? options.map((option) => option.value) : [];
   setFormData((prev) => ({ ...prev, [name]: values }));
 };


 const calculateTotalPrice = () => {
   let total = 0;


   // Summer programs cost calculation
   total += formData.selectedPrograms.length > 0 ? 35 + (formData.selectedPrograms.length - 1) * 15 : 0;


   // Internship options cost
   total += formData.selectedInternshipOptions.reduce((acc, option) => {
     const selected = internshipOptions.find((o) => o.value === option);
     return acc + (selected ? selected.price : 0);
   }, 0);


   // Resume options cost
   total += formData.selectedResumeOptions.reduce((acc, option) => {
     const selected = resumeOptions.find((o) => o.value === option);
     return acc + (selected ? selected.price : 0);
   }, 0);


   // SAT/ACT prep cost
   const selectedSATOption = satPrepOptions.find((o) => o.value === formData.selectedSATPrep);
   total += selectedSATOption ? selectedSATOption.price : 0;


   // Add per-hour SAT/ACT prep cost
   total += formData.satOneHourCount * 22;


   return total;
 };


 const handleFormSubmit = (e) => {
   e.preventDefault();
    console.log(formData);
    const docRef = addDoc(collection(db, "arenaSignUps"), {
     name: formData.name,
     email: formData.email,
     parentEmail: formData.parentEmail,
     phone: formData.phone,
     grade: formData.grade,
     selectedPrograms: formData.selectedPrograms,
     selectedInternshipOptions: formData.selectedInternshipOptions,
     selectedOlympiadOptions: formData.selectedOlympiadOptions,
     selectedResumeOptions: formData.selectedResumeOptions,
     selectedSATPrep: formData.selectedSATPrep,
     satOneHourCount: formData.satOneHourCount,
     additionalInfo: formData.additionalInfo,
     createdAt: Timestamp.now(), 
   });
    console.log("Document written with ID: ", docRef.id);
    const emailParams = {
     ...formData,
     parentEmail: formData.parentEmail,
     selectedPrograms: formData.selectedPrograms.join(", "),
     speculatedPrice: calculateTotalPrice(),
   };
    emailjs
     .send("service_2wckxjr", "template_xugiogj", emailParams, "Q1b_pv0uG9JEXJhAl")
     .then(
       () => {
         navigate("/thank-you");  // Navigate to Thank You page on successful submission
       },
       () => alert("Submission failed. Please try again.")
     );
 };


 return (
   <div>
   <NAVBAR1/>
   <div className=" bg-white flex items-center justify-center  mt-12">
     <div className="w-full   bg-white p-6 rounded-lg mb-8 ">
      
      <h1 className = "text-5xl font-bold mb-4 ">Sign-Up</h1>
      <h2 className="text-3xl font-extrabold mb-6 tracking-wide">IMPORTANT: Please Read Description</h2>






      <p className="text-sm italic text-gray-700 mb-4">
 This form is designed to gauge your interest and help us better understand how we can support you. Through this program, we offer a variety of services tailored to meet your goals, including personalized guidance, expert consultations, hands-on resources, and collaborative opportunities to bring your vision to life. Simply select all the options that align with your interests and leave any additional information or details in the space provided below. Once we receive your response, we’ll follow up via email to schedule a <a href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1dNqQ-a8w_pPG0V-0I7Goj3SsWO0qM23ORt4XRrbTf1MLcUQLL_V8vVpKJiLHwODmkN69BoZYW" className="text-blue-500 underline">free consultation meeting</a> where we can dive deeper into your plans, answer your questions, and explore how our program can best assist you.
</p>


<form onSubmit={handleFormSubmit} className="space-y-6">
 {/* User Info */}
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
   <div>
     <label className="block text-sm font-semibold mb-2">Name</label>
     <input
       type="text"
       name="name"
       value={formData.name}
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
       value={formData.email}
       onChange={handleInputChange}
       className="w-full px-4 py-2 border rounded-md"
       required
     />
   </div>
 </div>


 {/* Parent Email, Phone, and Grade - Full Width */}
 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
   <div>
     <label className="block text-sm font-semibold mb-2">Parent Email</label>
     <input
       type="email"
       name="parentEmail"
       value={formData.parentEmail}
       onChange={handleInputChange}
       className="w-full px-4 py-2 border rounded-md"
       required
     />
   </div>


   <div>
     <label className="block text-sm font-semibold mb-2">Phone Number</label>
     <input
       type="tel"
       name="phone"
       value={formData.phone}
       onChange={handleInputChange}
       className="w-full px-4 py-2 border rounded-md"
       placeholder="e.g. (123) 456-7890"
       required
     />
   </div>


   <div>
     <label className="block text-sm font-semibold mb-2">Grade Level</label>
     <Select
       options={gradeOptions}
       value={gradeOptions.find(option => option.value === formData.grade)}
       onChange={(option) => setFormData({ ...formData, grade: option.value })}
       className="w-full"
       required
     />
   </div>




</div>


        {/* Summer Programs */}
<div>
 <label className="block text-sm font-semibold mb-2">Summer Programs You're Interested In Applying To</label>
 <CreatableSelect
   isMulti
   options={summerProgramOptions}
   value={formData.selectedPrograms.includes("None") ? [{ value: "None", label: "None" }] : formData.selectedPrograms.map(option => ({ value: option, label: option }))}
   onChange={(options) => handleMultiSelectChange("selectedPrograms", options)}
   className="w-full"
 />
 <button
   type="button"
   onClick={() => handleNoneForNow("selectedPrograms")}
   className="mt-2 px-4 py-2 text-sm bg-white text-gray-700 rounded-full border border-gray-300 shadow-md hover:bg-gray-100 hover:scale-105 transition-all duration-300"
 >
   None for now
 </button>
</div>


{/* Internship Options */}
<div>
 <label className="block text-sm font-semibold mb-2">Internship Services You're Interested In</label>
 <Select
   isMulti
   options={internshipOptions}
   value={formData.selectedInternshipOptions.includes("None") ? [{ value: "None", label: "None" }] : formData.selectedInternshipOptions.map(option => ({ value: option, label: option }))}
   onChange={(options) => handleMultiSelectChange("selectedInternshipOptions", options)}
   className="w-full"
 />
 <button
   type="button"
   onClick={() => handleNoneForNow("selectedInternshipOptions")}
   className="mt-2 px-4 py-2 text-sm bg-white text-gray-700 rounded-full border border-gray-300 shadow-md hover:bg-gray-100 hover:scale-105 transition-all duration-300"
 >
   None for now
 </button>
</div>
{/* Olympiad Prep Options */}
<div>
 <label className="block text-sm font-semibold mb-2">Olympiad Prep Services You're Interested In</label>
 <Select
   isMulti
   options={olympiadOptions}
   value={formData.selectedOlympiadOptions.includes("None") ? [{ value: "None", label: "None" }] : formData.selectedOlympiadOptions.map(option => ({ value: option, label: option }))}
   onChange={(options) => handleMultiSelectChange("selectedOlympiadOptions", options)}
   className="w-full"
 />
 <button
   type="button"
   onClick={() => handleNoneForNow("selectedOlympiadOptions")}
   className="mt-2 px-4 py-2 text-sm bg-white text-gray-700 rounded-full border border-gray-300 shadow-md hover:bg-gray-100 hover:scale-105 transition-all duration-300"
 >
   None for now
 </button>
</div>


{/* Resume Options */}
<div>
 <label className="block text-sm font-semibold mb-2">Resume Services You're Interested In</label>
 <Select
   isMulti
   options={resumeOptions}
   value={formData.selectedResumeOptions.includes("None") ? [{ value: "None", label: "None" }] : formData.selectedResumeOptions.map(option => ({ value: option, label: option }))}
   onChange={(options) => handleMultiSelectChange("selectedResumeOptions", options)}
   className="w-full"
 />
 <button
   type="button"
   onClick={() => handleNoneForNow("selectedResumeOptions")}
   className="mt-2 px-4 py-2 text-sm bg-white text-gray-700 rounded-full border border-gray-300 shadow-md hover:bg-gray-100 hover:scale-105 transition-all duration-300"
 >
   None for now
 </button>
</div>


{/* SAT/ACT Prep */}
<div>
 <label className="block text-sm font-semibold mb-2">SAT/ACT Prep Options You're Interested In</label>
 <Select
   options={satPrepOptions}
   value={formData.selectedSATPrep === "None" ? { value: "None", label: "None" } : satPrepOptions.find(o => o.value === formData.selectedSATPrep)}
   onChange={(option) => setFormData({ ...formData, selectedSATPrep: option ? option.value : "" })}
   className="w-full"
 />
 <button
   type="button"
   onClick={() => handleNoneForNow("selectedSATPrep")}
   className="mt-2 px-4 py-2 text-sm bg-white text-gray-700 rounded-full border border-gray-300 shadow-md hover:bg-gray-100 hover:scale-105 transition-all duration-300"
 >
   None for now
 </button>
</div>










       {/* Additional Info Section */}
     <div style={{ marginTop: "20px", marginBottom: "20px" }}>
       <label className="block text-sm font-semibold mb-2">
         Please tell us more about yourself. Ex: Career Interests, or Anything you feel is important for us to know:
       </label>
       <textarea
         id="additionalInfo"
         name="additionalInfo"
         value={formData.additionalInfo}
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
}


export default ArenaSignUpForm;
