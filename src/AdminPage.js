import React, { useState, useEffect } from "react";
import { getFirestore, getDocs, deleteDoc, query, orderBy } from "firebase/firestore";
import { doc, updateDoc } from 'firebase/firestore'; 
import { addDoc, collection } from 'firebase/firestore';
import { app } from "./firebase";
import {Trash2, Edit } from "lucide-react";
import { Timestamp } from "firebase/firestore";
import GoogleFormEmbed from "./GoogleFormEmbed";
import {where} from "firebase/firestore";

const AdminPage = () => {
  const [signupStatuses, setSignupStatuses] = useState({});
  const [isEditingProgramDetails, setIsEditingProgramDetails] = useState(false);
  const [activeProgramDetails, setActiveProgramDetails] = useState(null);
  const statusOptions = [
    "Contacted Us in some way shape or form",
    "Scheduled a Consultation Meeting",
    "Finish Consultation Meeting",
    "Did payment",
    "Are scheduled with tutors/people"
  ];
  
  const [searchQuery, setSearchQuery] = useState("");
const [selectedFilter, setSelectedFilter] = useState("all");
const [sortOrder, setSortOrder] = useState("newest");
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState([]);
  const [activeMeetingTab, setActiveMeetingTab] = useState("Free Consultation");
  const [meetings, setMeetings] = useState({
    Ratul: [],
    Advay: [],
    Aaron: [],
    Aryan: [],
    Ethan: [],
    Nirav: []
  });
  const [activeView, setActiveView] = useState('contact');

  const presetUsername = "admin";
  const presetPassword = "password123";

  //console.log(meetings); 
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");

  const [meetingsdata, setmeetingsdata] = useState({
    customerName: "",
    email: "",
    service: "",
    subject: "",
    hours: "",
    paid: "No",
    summerProgram: "",
    extracurricularPrograms: "",
    satActTutoring: "",
    olympiadApTutoring: "",
    guaranteedInternships: "",
    generalGuidance: "",
    resumePackage: ""
  }); ;
  const parseNextContactDate = (hoursLeft) => {
    console.log("Hours Left:", hoursLeft); // Debugging log
    const nextContactMatch = hoursLeft?.match(/Next Contact (\d{1,2}\/\d{1,2}\/\d{2,4})/);
    if (nextContactMatch) {
        const [_, dateStr] = nextContactMatch;
        console.log("Extracted Date String:", dateStr); // Debugging log
        let [month, day, year] = dateStr.split('/').map(Number);

        // Handle two-digit year cases
        if (year < 100) {
            year += year < 50 ? 2000 : 1900; // Assume years below 50 are 2000+, otherwise 1900+
        }

        const date = new Date(year, month - 1, day);
        console.log("Parsed Date:", date); // Debugging log
        return date;
    }
    return null;
};

const isToday = (date) => {
    const today = new Date();
    console.log("Today's Date:", today); // Debugging log
    console.log("Next Contact Date:", date); // Debugging log
    return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
    );
};

  const fetchData = async () => {
    try {
      const db = getFirestore(app);
      const questionCollection = collection(db, "contactus");
      const responsesCollection = collection(db, "arenaSignUps");
      const meetingsCollection = collection(db, "meetings");
  
      const meetingsOrder = query(meetingsCollection, orderBy("date", "asc"));
  
      const contactQuestions = await getDocs(questionCollection);
      const signupResponses = await getDocs(responsesCollection);
      const meetingsBooked = await getDocs(meetingsOrder);
  
      const questionList = contactQuestions.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date()
      }));
  
      const responsesList = signupResponses.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        status: doc.data().status || ""
      }));
  
      const statusMap = {};
      responsesList.forEach((response) => {
        statusMap[response.id] = response.status || "";
      });
  
      setSignupStatuses(statusMap);
  
      const meetingsList = meetingsBooked.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().date?.toDate() || new Date(),
        hosts: doc.data().hosts || "",
        summerProgram: doc.data().summerProgram || "N/A",
        extracurricularPrograms: doc.data().extracurricularPrograms || "N/A",
        satActTutoring: doc.data().satActTutoring || "N/A",
        olympiadApTutoring: doc.data().olympiadApTutoring || "N/A",
        guaranteedInternships: doc.data().guaranteedInternships || "N/A",
        generalGuidance: doc.data().generalGuidance || "N/A",
        resumePackage: doc.data().resumePackage || "N/A"
      }));
  
      setQuestions(questionList);
      setResponses(responsesList);
  
      const categorizedMeetings = {
        Tutoring: [],
        SummerProgram: [],
        Internship: [],
        'SAT/ACT': [],
        'Free Consultation': [],
        Ratul: [],
        Aaron: [],
        Nirav: [],
        Advay: [],
        Ethan: [],
        Aryan: []
      };
  
      setMeetings(categorizedMeetings);
      meetingsList.forEach(meeting => {
        const category = meeting.meetingType || 'Uncategorized';
        if (categorizedMeetings.hasOwnProperty(category)) {
          categorizedMeetings[category].push(meeting);
        }
      });
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    const storedLoginState = localStorage.getItem('adminLoggedIn');
    if (storedLoginState === 'true') {
      setIsLoggedIn(true);
    }

    if (isLoggedIn) {
      

      fetchData();
    }
  }, [isLoggedIn]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === presetUsername && password === presetPassword) {
      setIsLoggedIn(true);
      localStorage.setItem('adminLoggedIn', 'true'); // Store the login state in localStorage
      setError("");
    } else {
      setError("Invalid username or password!");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('adminLoggedIn'); // Remove login state from localStorage
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      try {
        const db = getFirestore(app);
        await deleteDoc(doc(db, "arenaSignUps", id));
        setResponses(responses.filter((response) => response.id !== id));
      } catch (error) {
        console.error("Error deleting user: ", error);
      }
    }
  };

  const handleDeleteContact = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this message?");
    if (confirmDelete) {
      try {
        const db = getFirestore(app);
        await deleteDoc(doc(db, "contactus", id));
        setQuestions(questions.filter((question) => question.id !== id));
      } catch (error) {
        console.error("Error deleting message: ", error);
      }
    }
  };

  // FIND the handleMeetingDelete function and REPLACE it with:
const handleMeetingDelete = async (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this meeting?");
  
  if (confirmDelete) {
      try {
          const db = getFirestore(app);
          await deleteDoc(doc(db, "meetings", id));
          
          setMeetings(prev => ({
              ...prev,
              [activeMeetingTab]: prev[activeMeetingTab].filter(meeting => meeting.id !== id)
          }));
          
          console.log("Meeting deleted successfully!");
      } catch (error) {
          console.error("Error deleting meeting:", error);
      }
  }
};
  
  const [signupData, setSignupData] = useState({
    name: "",
    info: "",
    details: "",
    status: "",
    notes: "",
  });
  const saveProgramDetails = async () => {
    try {
      const db = getFirestore(app);
      const meetingRef = doc(db, "meetings", activeProgramDetails.id);
  
      await updateDoc(meetingRef, activeProgramDetails);
  
      // Update local state
      setMeetings((prev) => ({
        ...prev,
        [activeMeetingTab]: prev[activeMeetingTab].map((meeting) =>
          meeting.id === activeProgramDetails.id ? activeProgramDetails : meeting
        ),
      }));
  
      setIsEditingProgramDetails(false); // Exit edit mode
      alert("Program details updated successfully!");
    } catch (error) {
      console.error("Error updating program details:", error);
      alert("Error updating program details. Please try again.");
    }
  };
  const addSignup = async () => {
    if (!signupData.name || !signupData.status) {
      alert("Please fill in the required fields.");
      return;
    }
  
    try {
      const db = getFirestore(app);
      const docRef = await addDoc(collection(db, "arenaSignUps"), {
        name: signupData.name,
        info: signupData.info,
        details: signupData.details,
        status: signupData.status,
        notes: signupData.notes,
        createdAt: Timestamp.fromDate(new Date()), // Save timestamp for sorting
      });
  
      // Update UI by adding the new signup to state
      setResponses([...responses, { id: docRef.id, ...signupData }]);
  
      // Reset the form
      setSignupData({
        name: "",
        info: "",
        details: "",
        status: "",
        notes: "",
      });
  
      console.log("Sign-up added with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding sign-up: ", error);
    }
  };
  
  const [editingSignupId, setEditingSignupId] = useState(null);
const [editSignupData, setEditSignupData] = useState({
  name: "",
  email: "",
  parentEmail: "",
  phone: "",
  grade: "",
  selectedPrograms: [],
  selectedInternshipOptions: [],
  selectedOlympiadOptions: [],
  selectedResumeOptions: [],
  selectedSAT: [],
  additionalInfo: "",
  status: "",
  notes: ""
});
  

  // FIND the addMeeting function and REPLACE it with:
  const addMeeting = async () => {
    try {
      if (!meetingsdata.customerName || !meetingsdata.email || !meetingsdata.service || !meetingsdata.hours) {
        alert("Please fill in all required fields:\n- Customer Name\n- Email\n- Service\n- Hours");
        return;
      }
  
      const db = getFirestore(app);
      const meetingsCollection = collection(db, "meetings");
  
      // Create a new record without checking for existing names
      const newMeeting = {
        customerName: meetingsdata.customerName,
        email: meetingsdata.email,
        service: meetingsdata.service,
        subject: meetingsdata.subject || "N/A",
        hours: meetingsdata.hours,
        paid: meetingsdata.paid,
        meetingType: activeMeetingTab,
        date: Timestamp.fromDate(new Date()),
        summerProgram: meetingsdata.summerProgram || "N/A",
        extracurricularPrograms: meetingsdata.extracurricularPrograms || "N/A",
        satActTutoring: meetingsdata.satActTutoring || "N/A",
        olympiadApTutoring: meetingsdata.olympiadApTutoring || "N/A",
        guaranteedInternships: meetingsdata.guaranteedInternships || "N/A",
        generalGuidance: meetingsdata.generalGuidance || "N/A",
        resumePackage: meetingsdata.resumePackage || "N/A"
      };
  
      const docRef = await addDoc(meetingsCollection, newMeeting);
  
      setMeetings(prev => ({
        ...prev,
        [activeMeetingTab]: [...(prev[activeMeetingTab] || []), { ...newMeeting, id: docRef.id }]
      }));
  
      alert("Customer added successfully!");
  
      // Reset the form
      setmeetingsdata({
        customerName: "",
        email: "",
        service: "",
        subject: "",
        hours: "",
        paid: "No",
        summerProgram: "",
        extracurricularPrograms: "",
        satActTutoring: "",
        olympiadApTutoring: "",
        guaranteedInternships: "",
        generalGuidance: "",
        resumePackage: ""
      });
    } catch (error) {
      console.error("Error adding customer:", error);
      alert("Error adding customer. Please try again.");
    }
  };
  
  
  
  
  
  
  
  

  



  const handleResponseChange = (id) => {
    setQuestions(questions.map((question) =>
      question.id === id ? { ...question, responded: !question.responded } : question
    ));
  };
  const [editingNotesId, setEditingNotesId] = useState(null);

  const handleNotesChange = (id, value) => {
    if (activeView === "contact") {
      setQuestions((prevQuestions) =>
        prevQuestions.map((question) =>
          question.id === id ? { ...question, notes: value } : question
        )
      );
    } else if (activeView === "signup") {
      setResponses((prevResponses) =>
        prevResponses.map((response) =>
          response.id === id ? { ...response, notes: value } : response
        )
      );
    } else if (activeView === "meetings") {
      setMeetings((prevMeetings) => ({
        ...prevMeetings,
        [activeMeetingTab]: prevMeetings[activeMeetingTab].map((meeting) =>
          meeting.id === id ? { ...meeting, notes: value } : meeting
        ),
      }));
    }
  };
  
  const handleStatusChange = async (id, newStatus) => {
    try {
      const db = getFirestore(app);
      const docRef = doc(db, "arenaSignUps", id);
      
      await updateDoc(docRef, { status: newStatus }); // ✅ Update Firestore
  
      setSignupStatuses((prevStatuses) => ({
        ...prevStatuses,
        [id]: newStatus,
      }));
  
      console.log("Status updated successfully!");
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };
  
  

  const handleSaveNotes = async (id) => {
    try {
      const db = getFirestore(app);
      let collectionName;
      let dataToUpdate;
  
      if (activeView === "contact") {
        collectionName = "contactus";
        dataToUpdate = questions.find((q) => q.id === id);
      } else if (activeView === "signup") {
        collectionName = "arenaSignUps";
        dataToUpdate = responses.find((r) => r.id === id);
      } else if (activeView === "meetings") {
        collectionName = "meetings";
        dataToUpdate = meetings[activeMeetingTab].find((m) => m.id === id);
      }
  
      if (dataToUpdate) {
        const docRef = doc(db, collectionName, id);
        await updateDoc(docRef, { notes: dataToUpdate.notes || "" });
        console.log("Notes updated successfully!");
      }
  
      setEditingNotesId(null); // Exit edit mode after saving
    } catch (error) {
      console.error("Error updating notes:", error);
    }
  };
  
  

  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    customerName: "",
    email: "",
    service: "",
    subject: "",
    hours: "",
    paid: "No",
    summerProgram: "",
    extracurricularPrograms: "",
    satActTutoring: "",
    olympiadApTutoring: "",
    guaranteedInternships: "",
    generalGuidance: "",
    resumePackage: ""
  });
  
  const updateMeeting = async (id, updatedData) => {
    try {
      const db = getFirestore(app);
      const meetingRef = doc(db, "meetings", id);
  
      await updateDoc(meetingRef, updatedData);
  
      // Update local state
      setMeetings((prevMeetings) => ({
        ...prevMeetings,
        [activeMeetingTab]: prevMeetings[activeMeetingTab].map((meeting) =>
          meeting.id === id ? { ...meeting, ...updatedData } : meeting
        )
      }));
  
      console.log("Meeting updated successfully!");
    } catch (error) {
      console.error("Error updating meeting:", error);
    }
  };
  

  const startEditing = (meeting) => {
    setEditingId(meeting.id);
    setEditData({
      customerName: meeting.customerName,
      email: meeting.email,
      service: meeting.service,
      subject: meeting.subject || "N/A",
      hours: meeting.hours,
      paid: meeting.paid,
      summerProgram: meeting.summerProgram || "N/A",
      extracurricularPrograms: meeting.extracurricularPrograms || "N/A",
      satActTutoring: meeting.satActTutoring || "N/A",
      olympiadApTutoring: meeting.olympiadApTutoring || "N/A",
      guaranteedInternships: meeting.guaranteedInternships || "N/A",
      generalGuidance: meeting.generalGuidance || "N/A",
      resumePackage: meeting.resumePackage || "N/A"
    });
  };

  const handleEditChange = (e, field) => {
    setEditData({ ...editData, [field]: e.target.value });
  };
  

  const saveEdit = async () => {
    try {
      const db = getFirestore(app);
      const meetingRef = doc(db, "meetings", editingId);
  
      await updateDoc(meetingRef, editData);
  
      setMeetings((prev) => ({
        ...prev,
        [activeMeetingTab]: prev[activeMeetingTab]?.map((meeting) =>
          meeting.id === editingId ? { ...meeting, ...editData } : meeting
        ) || []
      }));
  
      setEditingId(null);
    } catch (error) {
      console.error("Error updating meeting:", error);
    }
  };
  
  const startSignupEditing = (response) => {
    setEditingSignupId(response.id);
    setEditSignupData(response);
  };
  
  const handleSignupEditChange = (e, field) => {
    setEditSignupData({ ...editSignupData, [field]: e.target.value });
  };
  
  const saveSignupEdit = async () => {
    try {
      const db = getFirestore(app);
      const signupRef = doc(db, "arenaSignUps", editingSignupId);
      
      await updateDoc(signupRef, editSignupData);
      
      setResponses(prev => 
        prev.map(response => 
          response.id === editingSignupId ? { ...response, ...editSignupData } : response
        )
      );
      
      setEditingSignupId(null);
      console.log("Sign-up updated successfully!");
    } catch (error) {
      console.error("Error updating sign-up:", error);
    }
  };
  const tabStyles = "relative px-6 py-3 rounded-lg font-semibold transition-all duration-300";
const activeTabStyles = "bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg transform scale-105";
const inactiveTabStyles = "bg-white text-gray-600 hover:bg-gray-50";
  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">Admin Dashboard</h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Logout
            </button>
            
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
  <button
    onClick={() => setActiveView('meetings')}
    className={`w-full px-6 py-3 rounded-lg font-semibold transition-colors ${
      activeView === 'meetings'
        ? 'bg-black text-white'
        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
    }`}
  >
    Meetings
  </button>
  <button
    onClick={() => setActiveView('customers')}
    className={`w-full px-6 py-3 rounded-lg font-semibold transition-colors ${
      activeView === 'customers'
        ? 'bg-black text-white'
        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
    }`}
  >
    Customers
  </button>
  
</div>

<div className="bg-white rounded-lg shadow-lg p-6">
 {activeView === 'meetings' ? (
                 <>
      <h2 className="text-3xl font-extrabold text-gray-900 mb-6 tracking-tight">
  📋 Meetings
</h2>
<p className="text-gray-500 mb-6 text-lg">Manage your customer bookings with ease.</p>

      
<div className="grid grid-cols-7 gap-4 mb-6">
  
  <button
    onClick={() => setActiveMeetingTab('Free Consultation')}
    className={`w-full px-6 py-1 rounded-lg font-semibold transition-colors ${
      activeMeetingTab === 'Free Consultation'
        ? 'bg-black text-white'
        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
    }`}
  >
    Free Consultation
  </button>
  <button
    onClick={() => setActiveMeetingTab('Ratul')}
    className={`w-full px-6 py-3 rounded-lg font-semibold transition-colors ${
      activeMeetingTab === 'Ratul'
        ? 'bg-black text-white'
        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
    }`}
  >
    Ratul
  </button>
  <button
    onClick={() => setActiveMeetingTab('Aaron')}
    className={`w-full px-6 py-3 rounded-lg font-semibold transition-colors ${
      activeMeetingTab === 'Aaron'
        ? 'bg-black text-white'
        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
    }`}
  >
    Aaron
  </button>
  <button
    onClick={() => setActiveMeetingTab('Nirav')}
    className={`w-full px-6 py-3 rounded-lg font-semibold transition-colors ${
      activeMeetingTab === 'Nirav'
        ? 'bg-black text-white'
        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
    }`}
  >
    Nirav
  </button>
  <button
    onClick={() => setActiveMeetingTab('Advay')}
    className={`w-full px-6 py-3 rounded-lg font-semibold transition-colors ${
      activeMeetingTab === 'Advay'
        ? 'bg-black text-white'
        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
    }`}
  >
    Advay
  </button>
  <button
    onClick={() => setActiveMeetingTab('Ethan')}
    className={`w-full px-6 py-3 rounded-lg font-semibold transition-colors ${
      activeMeetingTab === 'Ethan'
        ? 'bg-black text-white'
        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
    }`}
  >
    Ethan
  </button>
  <button
    onClick={() => setActiveMeetingTab('Aryan')}
    className={`w-full px-6 py-3 rounded-lg font-semibold transition-colors ${
      activeMeetingTab === 'Aryan'
        ? 'bg-black text-white'
        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
    }`}
  >
    Aryan
  </button>
  
</div>

{activeMeetingTab === 'Free Consultation' ? (
  
  <GoogleFormEmbed src="https://calendar.google.com/calendar/embed?src=arena.college.counseling%40gmail.com&ctz=America%2FLos_Angeles" />
  

  ) : activeMeetingTab === 'Ratul' ? (
    <GoogleFormEmbed src="https://calendar.google.com/calendar/embed?src=imratulc%40gmail.com&ctz=America%2FLos_Angeles" />
  ) : activeMeetingTab === 'Aaron' ? (
    <GoogleFormEmbed src="https://calendar.google.com/calendar/embed?src=aaron.rathore987%40gmail.com&ctz=America%2FLos_Angeles" />
  ) : activeMeetingTab === 'Nirav' ? (
    <GoogleFormEmbed src="https://calendar.google.com/calendar/embed?src=2b4eff80e6b801ca6346f6f804488edfe35665d0aa6538a18fc617d05e835c91%40group.calendar.google.com&ctz=America%2FLos_Angeles" />
  ) : activeMeetingTab === 'Advay' ? (
    <GoogleFormEmbed src="https://calendar.google.com/calendar/embed?src=advayb2018%40gmail.com&ctz=America%2FLos_Angeles" />
  
  ) : activeMeetingTab === 'Aryan' ? (
  <GoogleFormEmbed src="https://calendar.google.com/calendar/embed?src=mail.to.aryankumar%40gmail.com&ctz=America%2FLos_Angeles" />
) : activeMeetingTab === 'Ethan' ? (
  <GoogleFormEmbed src="https://calendar.google.com/calendar/embed?src=vargheseethan07%40gmail.com&ctz=America%2FLos_Angeles" />
):null}
  
{}
    </>
            ) : activeView === 'customers' ? (
              <>
      <h2 className="text-2xl font-bold mb-4">Customer Details</h2>
      <div className="flex space-x-4 mb-4">
      {["Ratul", "Advay", "Aaron", "Aryan", "Ethan", "Nirav"].map((tab) => (
  <button
  key={tab}
  className={`relative px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-md backdrop-blur-lg
    ${activeMeetingTab === tab 
      ? "bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-2xl scale-110 ring-2 ring-blue-300" 
      : "bg-gray-200 hover:bg-gray-300 text-gray-700 hover:scale-105"
    }`}
  onClick={() => setActiveMeetingTab(tab)}
>
  <span className="relative z-10">{tab}</span>
  {activeMeetingTab === tab && (
    <span className="absolute inset-0 bg-white opacity-10 rounded-full animate-ping"></span>
  )}
</button>



))}
</div>
{activeProgramDetails && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-4xl">
      <h2 className="text-2xl font-bold mb-4">
        Program Details for {activeProgramDetails.customerName}
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {/* Summer/Research Program */}
        <div>
          <h3 className="font-semibold">Summer/Research Program</h3>
          {isEditingProgramDetails ? (
            <input
              type="text"
              value={activeProgramDetails.summerProgram}
              onChange={(e) =>
                setActiveProgramDetails({
                  ...activeProgramDetails,
                  summerProgram: e.target.value,
                })
              }
              className="border p-2 w-full rounded-lg"
            />
          ) : (
            <p>{activeProgramDetails.summerProgram || "N/A"}</p>
          )}
        </div>

        {/* Extracurricular Programs */}
        <div>
          <h3 className="font-semibold">Extracurricular Programs</h3>
          {isEditingProgramDetails ? (
            <input
              type="text"
              value={activeProgramDetails.extracurricularPrograms}
              onChange={(e) =>
                setActiveProgramDetails({
                  ...activeProgramDetails,
                  extracurricularPrograms: e.target.value,
                })
              }
              className="border p-2 w-full rounded-lg"
            />
          ) : (
            <p>{activeProgramDetails.extracurricularPrograms || "N/A"}</p>
          )}
        </div>

        {/* SAT/ACT Tutoring */}
        <div>
          <h3 className="font-semibold">SAT/ACT Tutoring</h3>
          {isEditingProgramDetails ? (
            <input
              type="text"
              value={activeProgramDetails.satActTutoring}
              onChange={(e) =>
                setActiveProgramDetails({
                  ...activeProgramDetails,
                  satActTutoring: e.target.value,
                })
              }
              className="border p-2 w-full rounded-lg"
            />
          ) : (
            <p>{activeProgramDetails.satActTutoring || "N/A"}</p>
          )}
        </div>

        {/* Olympiad/AP Class Tutoring */}
        <div>
          <h3 className="font-semibold">Olympiad/AP Class Tutoring</h3>
          {isEditingProgramDetails ? (
            <input
              type="text"
              value={activeProgramDetails.olympiadApTutoring}
              onChange={(e) =>
                setActiveProgramDetails({
                  ...activeProgramDetails,
                  olympiadApTutoring: e.target.value,
                })
              }
              className="border p-2 w-full rounded-lg"
            />
          ) : (
            <p>{activeProgramDetails.olympiadApTutoring || "N/A"}</p>
          )}
        </div>

        {/* Guaranteed Internships */}
        <div>
          <h3 className="font-semibold">Guaranteed Internships</h3>
          {isEditingProgramDetails ? (
            <input
              type="text"
              value={activeProgramDetails.guaranteedInternships}
              onChange={(e) =>
                setActiveProgramDetails({
                  ...activeProgramDetails,
                  guaranteedInternships: e.target.value,
                })
              }
              className="border p-2 w-full rounded-lg"
            />
          ) : (
            <p>{activeProgramDetails.guaranteedInternships || "N/A"}</p>
          )}
        </div>

        {/* General Guidance */}
        <div>
          <h3 className="font-semibold">General Guidance</h3>
          {isEditingProgramDetails ? (
            <input
              type="text"
              value={activeProgramDetails.generalGuidance}
              onChange={(e) =>
                setActiveProgramDetails({
                  ...activeProgramDetails,
                  generalGuidance: e.target.value,
                })
              }
              className="border p-2 w-full rounded-lg"
            />
          ) : (
            <p>{activeProgramDetails.generalGuidance || "N/A"}</p>
          )}
        </div>

        {/* Resume Package */}
        <div>
          <h3 className="font-semibold">Resume Package</h3>
          {isEditingProgramDetails ? (
            <input
              type="text"
              value={activeProgramDetails.resumePackage}
              onChange={(e) =>
                setActiveProgramDetails({
                  ...activeProgramDetails,
                  resumePackage: e.target.value,
                })
              }
              className="border p-2 w-full rounded-lg"
            />
          ) : (
            <p>{activeProgramDetails.resumePackage || "N/A"}</p>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex justify-end space-x-4">
        {isEditingProgramDetails ? (
          <>
            <button
              onClick={saveProgramDetails}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Save Changes
            </button>
            <button
              onClick={() => setIsEditingProgramDetails(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditingProgramDetails(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Edit Details
            </button>
            <button
              onClick={() => setActiveProgramDetails(null)}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Close
            </button>
          </>
        )}
      </div>
    </div>
  </div>
)}
{meetings[activeMeetingTab]?.length > 0 ? (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden">
    <table className="w-full border-collapse rounded-xl shadow-lg bg-white/80 backdrop-blur-md overflow-hidden transition-all duration-300 hover:shadow-2xl">


    <thead className="bg-gradient-to-r from-gray-50 to-gray-200 border-b border-gray-300 shadow-md rounded-lg overflow-hidden">
  <tr className="text-gray-800 text-left text-sm font-bold uppercase tracking-wider">
    <th className="px-6 py-4 bg-opacity-50 backdrop-blur-lg">Customer Name</th>
    <th className="px-6 py-4 bg-opacity-50 backdrop-blur-lg">Email</th>
    <th className="px-6 py-4 bg-opacity-50 backdrop-blur-lg">Service</th>
    <th className="px-6 py-4 bg-opacity-50 backdrop-blur-lg">Hours Left</th>
    <th className="px-6 py-4 bg-opacity-50 backdrop-blur-lg">Status</th>
    <th className="px-6 py-4 bg-opacity-50 backdrop-blur-lg">Actions</th>
  </tr>
</thead>
<tbody className="divide-y divide-gray-200">
  {meetings[activeMeetingTab]
    .filter(meeting => {
      if (selectedFilter === 'paid') return meeting.paid === 'Yes';
      if (selectedFilter === 'unpaid') return meeting.paid === 'No';
      return true;
    })
    .filter(meeting => 
      meeting.customerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meeting.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meeting.service?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .map((meeting, index) => {
      const nextContactDate = parseNextContactDate(meeting.hours);
      const showReminder = nextContactDate && isToday(nextContactDate);

      return (
        <tr key={meeting.id} className={`group transition-all duration-300 ${index % 2 === 0 ? "bg-white/80" : "bg-gray-50/80"} hover:bg-blue-100 hover:scale-[1.02] shadow-md hover:shadow-2xl backdrop-blur-lg rounded-xl`}>
          {editingId === meeting.id ? (
            <>
              <td className="px-6 py-4">
                <input
                  type="text"
                  value={editData.customerName}
                  onChange={(e) => handleEditChange(e, 'customerName')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white/50 backdrop-blur-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                />
              </td>
              <td className="px-6 py-4">
                <input
                  type="email"
                  value={editData.email}
                  onChange={(e) => handleEditChange(e, 'email')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white/50 backdrop-blur-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                />
              </td>
              <td className="px-6 py-4">
                <input
                  type="text"
                  value={editData.service}
                  onChange={(e) => handleEditChange(e, 'service')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white/50 backdrop-blur-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                />
              </td>
              <td className="px-6 py-4">
                <input
                  type="text"
                  value={editData.hours}
                  onChange={(e) => handleEditChange(e, 'hours')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white/50 backdrop-blur-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                />
              </td>
              <td className="px-6 py-4">
                <select
                  value={editData.paid}
                  onChange={(e) => handleEditChange(e, 'paid')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white/50 backdrop-blur-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                >
                  <option value="Yes">Paid</option>
                  <option value="No">Unpaid</option>
                  <option value="Just Interested">Just Interested</option>
                </select>
              </td>
              <td className="px-6 py-4 text-center">
                <button
                  onClick={saveEdit}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 mr-2"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                >
                  Cancel
                </button>
              </td>
            </>
          ) : (
            <>
              <td className="px-6 py-4">
                <div className="text-sm font-medium text-gray-900">{meeting.customerName}</div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-500">{meeting.email}</div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900">{meeting.service}</div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900">
                  {meeting.hours}
                  {showReminder && (
  <div className="inline-flex items-center px-3 py-1 rounded-full bg-red-100 border border-red-200 shadow-sm">
    <svg className="w-4 h-4 mr-1 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <p>Contact Today!</p>
  </div>
)}

                </div>
              </td>
              <td className="px-6 py-4">
                <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                  meeting.paid === 'Yes' 
                    ? 'bg-green-100 text-green-800' 
                    : meeting.paid === 'No'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {meeting.paid === 'Yes' ? 'Paid' : meeting.paid === 'No' ? 'Unpaid' : 'Just Interested'}
                </span>
              </td>
              <td className="px-6 py-4 text-center">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => startEditing(meeting)}
                    className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-all duration-200 shadow-lg ring-1 ring-blue-300 hover:scale-110"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleMeetingDelete(meeting.id)}
                    className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-all duration-200 shadow-lg ring-1 ring-red-300 hover:scale-110"
                  >
                    <Trash2 size={18} />
                  </button>
                  <button
                    onClick={() => setActiveProgramDetails(meeting)}
                    className="p-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition-all duration-200 shadow-lg ring-1 ring-green-300 hover:scale-110"
                  >
                    View Details
                  </button>
                </div>
              </td>
            </>
          )}
        </tr>
      );
    })}
</tbody>
    </table>
  </div>
) : (
  <div className="text-center py-16 bg-white bg-opacity-50 backdrop-blur-lg rounded-2xl shadow-xl">
  <p className="text-gray-600 text-xl font-semibold">No customers found.</p>
  <p className="text-gray-400 text-sm mt-2">Try selecting another category or add a new customer.</p>
</div>


)}


 
        <>
        <table className="w-full mt-4">
        <thead>
              <tr className="bg-gray-50 text-left">
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Service</th>
                <th className="py-3 px-4">Hours Left</th>
                <th className="py-3 px-4">Paid?</th>
                <th className="py-3 px-4">Add Customer</th>
              </tr>
            </thead>
            <tfoot>
  <tr className="bg-gray-50">
    <td className="py-2 px-4">
      <input
        type="text"
        placeholder="Enter customer name"
        className="border p-3 w-full rounded-lg bg-white/60 backdrop-blur-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
        value={meetingsdata.customerName}
        onChange={(e) => setmeetingsdata({ ...meetingsdata, customerName: e.target.value })}
        required
      />
    </td>
    <td className="py-2 px-4">
      <input
        type="email"
        placeholder="Enter email"
        className="border p-3 w-full rounded-lg bg-white/60 backdrop-blur-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
        value={meetingsdata.email}
        onChange={(e) => setmeetingsdata({ ...meetingsdata, email: e.target.value })}
        required
      />
    </td>
    <td className="py-2 px-4">
      <input
        type="text"
        placeholder="Enter service"
        className="border p-3 w-full rounded-lg bg-white/60 backdrop-blur-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
        value={meetingsdata.service}
        onChange={(e) => setmeetingsdata({ ...meetingsdata, service: e.target.value })}
        required
      />
    </td>
    <td className="py-2 px-4">
      <input
        type="text"
        placeholder="Enter hours"
        className="border p-3 w-full rounded-lg bg-white/60 backdrop-blur-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
        value={meetingsdata.hours}
        onChange={(e) => setmeetingsdata({ ...meetingsdata, hours: e.target.value })}
        required
      />
    </td>
    <td className="py-2 px-4">
  <select
    className="border p-3 w-full rounded-lg bg-white/60 backdrop-blur-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
    value={meetingsdata.paid}
    onChange={(e) => setmeetingsdata({ ...meetingsdata, paid: e.target.value })}
  >
    <option value="No">Not Paid</option>
    <option value="Yes">Paid</option>
    <option value="Just Interested">Just Interested</option>
  </select>
</td>
    <td className="py-2 px-4 text-right">
      <button
        onClick={addMeeting}
        className="relative px-6 py-3 font-semibold text-white transition-all duration-300 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 shadow-[0px_5px_15px_rgba(0,0,0,0.3)] hover:shadow-[0px_8px_20px_rgba(0,0,0,0.4)] active:translate-y-[2px] active:shadow-[0px_4px_10px_rgba(0,0,0,0.3)] before:absolute before:inset-0 before:rounded-lg before:bg-white/20 before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100"
      >
        + Add Customer
      </button>
    </td>
  </tr>
</tfoot>



  </table>
  
      </>

    </>
            ) : null}
          </div>
          
        </div>
      </div>
      
    );
    
  } else {
    return(
      
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <form onSubmit={handleLogin} className="bg-white p-10 rounded-2xl shadow-xl w-96 border border-gray-200">

          <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
  type="submit"
  className="w-full py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-200 active:scale-95 shadow-md"
>
  Login
</button>

        </form>
      </div>
    );
  }
};

export default AdminPage;