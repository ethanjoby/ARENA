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
  
      // Check if a customer with the same name already exists
      const existingCustomerQuery = query(meetingsCollection, where("customerName", "==", meetingsdata.customerName));
      const existingCustomerSnapshot = await getDocs(existingCustomerQuery);
  
      if (!existingCustomerSnapshot.empty) {
        // Customer exists, update the existing record
        const existingCustomerDoc = existingCustomerSnapshot.docs[0];
        const existingCustomerData = existingCustomerDoc.data();
  
        const updatedCustomer = {
          ...existingCustomerData,
          service: meetingsdata.service,
          hours: meetingsdata.hours,
          paid: meetingsdata.paid,
          summerProgram: meetingsdata.summerProgram || existingCustomerData.summerProgram || "N/A",
          extracurricularPrograms: meetingsdata.extracurricularPrograms || existingCustomerData.extracurricularPrograms || "N/A",
          satActTutoring: meetingsdata.satActTutoring || existingCustomerData.satActTutoring || "N/A",
          olympiadApTutoring: meetingsdata.olympiadApTutoring || existingCustomerData.olympiadApTutoring || "N/A",
          guaranteedInternships: meetingsdata.guaranteedInternships || existingCustomerData.guaranteedInternships || "N/A",
          generalGuidance: meetingsdata.generalGuidance || existingCustomerData.generalGuidance || "N/A",
          resumePackage: meetingsdata.resumePackage || existingCustomerData.resumePackage || "N/A"
        };
  
        await updateDoc(doc(db, "meetings", existingCustomerDoc.id), updatedCustomer);
  
        // Update local state
        setMeetings(prev => ({
          ...prev,
          [activeMeetingTab]: prev[activeMeetingTab].map(meeting =>
            meeting.id === existingCustomerDoc.id ? { ...meeting, ...updatedCustomer } : meeting
          )
        }));
  
        alert("Customer details updated successfully!");
      } else {
        // Customer does not exist, create a new record
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
      }
  
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
      console.error("Error adding/updating customer:", error);
      alert("Error adding/updating customer. Please try again.");
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

          <div className="grid grid-cols-4 gap-4 mb-6">
  <button
    onClick={() => setActiveView('contact')}
    className={`w-full px-6 py-3 rounded-lg font-semibold transition-colors ${
      activeView === 'contact'
        ? 'bg-black text-white'
        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
    }`}
  >
    Contact Messages
  </button>
  <button
    onClick={() => setActiveView('signup')}
    className={`w-full px-6 py-3 rounded-lg font-semibold transition-colors ${
      activeView === 'signup'
        ? 'bg-black text-white'
        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
    }`}
  >
    Program Sign-ups
  </button>
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
  {activeView === 'contact' ? (
    <>
      <h2 className="text-2xl font-bold mb-4">Contact Form Messages</h2>
      {questions.length > 0 ? (
        <div className="overflow-x-auto w-full rounded ">
          
          <table className="w-full border-collapse rounded-xl shadow-lg bg-white/80 backdrop-blur-md overflow-hidden transition-all duration-300 hover:shadow-2xl">


            <thead>
              <tr className="bg-gray-50 text-left">
              <th className="sticky top-0 bg-gray-100 px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider rounded-t-lg">Name</th>
              <th className="sticky top-0 bg-gray-100 px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider rounded-t-lg">Info</th>
              <th className="sticky top-0 bg-gray-100 px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider rounded-t-lg">Message</th>
              <th className="sticky top-0 bg-gray-100 px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider rounded-t-lg">Date</th>
              <th className="sticky top-0 bg-gray-100 px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider rounded-t-lg">Notes</th>
              <th className="sticky top-0 bg-gray-100 px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider rounded-t-lg">Save</th>
              <th className="sticky top-0 bg-gray-100 px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider rounded-t-lg">Delete</th>
                
                
              </tr>
            </thead>
            <tbody>
  {questions.map((question, index) => (
    <tr key={question.id} className={index % 2 === 0 ? "bg-gray-50" : ""}>
      <td className="py-3 px-4">{question.name}</td>
      <td className="py-3 px-4"><strong>Email:</strong> {question.email}<br/> <strong>Phone: </strong>{question.phone}<br/> <strong>Grade: </strong><strong/>{question.grade}</td>
      <td className="py-3 px-4">{question.info}</td>
      <td className="py-3 px-4">{question.createdAt.toDateString()}</td>
      
      <td className="py-3 px-4">
        {editingNotesId === question.id ? (
          <input
            type="text"
            value={question.notes || ""}
            onChange={(e) => handleNotesChange(question.id, e.target.value)}
            className="border p-1 rounded w-full"
            autoFocus
          />
        ) : (
          <div 
            onClick={() => setEditingNotesId(question.id)} 
            className="cursor-pointer p-1 min-w-[100px] border rounded bg-gray-100"
          >
            {question.notes || "Click to add notes"}
          </div>
        )}
      </td>
      <td className="py-3 px-4">
        {editingNotesId === question.id && (
          <button
            onClick={() => handleSaveNotes(question.id)}
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
          >
            Save
          </button>
        )}
      </td>
      <td className="py-3 px-4">
        <button onClick={() => handleDeleteContact(question.id)} className="text-red-500 hover:text-red-700">
          <Trash2 size={20} />
        </button>
      </td>
    </tr>
  ))}
</tbody>

          </table>
        </div>
      ) : (
        <p className="text-gray-600">No contact form messages available.</p>
      )}
              </>
            ) : activeView === 'signup' ? (
              <>
                <h2 className="text-2xl font-bold mb-4">Program Sign-ups</h2>
                
{responses.length > 0 ? (
  <div className="overflow-x-auto">
    <table className="w-full border-collapse">
    <thead>
  <tr className="bg-gray-50 border-b border-gray-200">
    <th className="sticky top-0 bg-gray-100 px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider rounded-t-lg">
      <div className="flex items-center space-x-2">
        <span>Name</span>
        <button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
          {sortOrder === 'asc' ? '↓' : '↑'}
        </button>
      </div>
    </th>
    <th className="sticky top-0 bg-gray-100 px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider rounded-t-lg">Contact Info</th>
    <th className="sticky top-0 bg-gray-100 px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider rounded-t-lg">Program Details</th>
    <th className="sticky top-0 bg-gray-100 px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider rounded-t-lg">Status</th>
    <th className="sticky top-0 bg-gray-100 px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider rounded-t-lg">Notes</th>
    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Actions</th>
  </tr>
</thead>
      <tbody>
      {responses.map((response, index) => (
  <tr
    key={response.id}
    className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100 transition`}
  >
    {editingSignupId === response.id ? (
      <>
        <td className="py-3 px-4">
          <input
            type="text"
            value={editSignupData.name}
            onChange={(e) => handleSignupEditChange(e, 'name')}
            className="border p-3 w-full rounded-lg bg-white/60 backdrop-blur-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          />
        </td>
        <td className="py-3 px-4">
          <input
            type="text"
            placeholder="Student Email"
            value={editSignupData.email}
            onChange={(e) => handleSignupEditChange(e, 'email')}
            className="w-full p-3 text-white transition-all duration-300 bg-white/10 backdrop-blur-lg rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-300"
          />
          <input
            type="text"
            placeholder="Parent Email"
            value={editSignupData.parentEmail}
            onChange={(e) => handleSignupEditChange(e, 'parentEmail')}
            className="w-full p-3 text-white transition-all duration-300 bg-white/10 backdrop-blur-lg rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-300"
          />
          <input
            type="text"
            placeholder="Phone"
            value={editSignupData.phone}
            onChange={(e) => handleSignupEditChange(e, 'phone')}
            className="w-full p-3 text-white transition-all duration-300 bg-white/10 backdrop-blur-lg rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-300"
          />
          <input
            type="text"
            placeholder="Grade"
            value={editSignupData.grade}
            onChange={(e) => handleSignupEditChange(e, 'grade')}
            className="border p-3 w-full rounded-lg bg-white/60 backdrop-blur-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          />
        </td>
        <td className="py-3 px-4">
          <textarea
            value={editSignupData.additionalInfo}
            onChange={(e) => handleSignupEditChange(e, 'additionalInfo')}
            className="border p-3 w-full rounded-lg bg-white/60 backdrop-blur-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            rows="4"
          />
        </td>
        <td className="py-3 px-4">
        <select
  value={signupStatuses[response.id] || ""}
  onChange={(e) => handleStatusChange(response.id, e.target.value)}
  className={`w-full rounded-full px-4 py-2 border-2 transition-colors ${
    signupStatuses[response.id] === 'Did payment'
      ? 'bg-green-50 border-green-500 text-green-700'
      : signupStatuses[response.id] === 'Contacted Us in some way shape or form'
      ? 'bg-blue-50 border-blue-500 text-blue-700'
      : signupStatuses[response.id] === 'Are scheduled with tutors/people'
      ? 'bg-purple-50 border-purple-500 text-purple-700'
      : 'border-gray-200'
  }`}
>
  <option value="" disabled>Select Status</option>
  {statusOptions.map((status) => (
    <option key={status} value={status} className="py-2">
      {status}
    </option>
  ))}
</select>
        </td>
        <td className="py-3 px-4">
          <textarea
            value={editSignupData.notes}
            onChange={(e) => handleSignupEditChange(e, 'notes')}
            className="border p-3 w-full rounded-lg bg-white/60 backdrop-blur-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            rows="4"
          />
        </td>
        <td className="py-3 px-4">
          <button
            onClick={saveSignupEdit}
            className="bg-green-500 text-white px-3 py-1 rounded mr-2"
          >
            Save
          </button>
          <button
            onClick={() => setEditingSignupId(null)}
            className="bg-gray-500 text-white px-3 py-1 rounded"
          >
            Cancel
          </button>
        </td>
      </>
    ) : (
      <>
        <td className="py-3 px-4 text-sm font-medium text-gray-700">{response.name}</td>
        <td className="py-3 px-4 text-sm text-gray-600 align-top">
          <strong>Student Email:</strong> {response.email}
          <br />
          <strong>Parent Email:</strong> {response.parentEmail}
          <br />
          <strong>Phone:</strong> {response.phone}
          <br />
          <strong>Grade:</strong> {response.grade}
        </td>
        <td className="py-3 px-4 text-sm">
        <details className="cursor-pointer group">
  <summary className="text-blue-600 hover:text-blue-800 font-medium list-none">
    <div className="flex items-center space-x-2">
      <span>View Details</span>
      <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </summary>
  <div className="mt-2 text-gray-600 bg-gray-50 p-4 rounded-lg">
    {/* Keep your existing detail items but add these classes */}
    <p className="mb-2"><strong className="font-medium">Summer Programs:</strong> {response.selectedPrograms?.join(", ") || "N/A"}</p>
    <p className="mb-2"><strong className="font-medium">Internship:</strong> {response.selectedInternshipOptions?.join(", ") || "N/A"}</p>
    <p className="mb-2"><strong className="font-medium">Olympiads:</strong> {response.selectedOlympiadOptions?.join(", ") || "N/A"}</p>
    <p className="mb-2"><strong className="font-medium">Resume:</strong> {response.selectedResumeOptions?.join(", ") || "N/A"}</p>
    <p className="mb-2"><strong className="font-medium">SAT Prep:</strong> {Array.isArray(response.selectedSAT) ? response.selectedSAT.join(", ") : response.selectedSAT || "N/A"}</p>
    {response.additionalInfo && <p><strong className="font-medium">Additional Info:</strong> {response.additionalInfo}</p>}
  </div>
</details>
        </td>
        <td className="py-3 px-4 w-1/5">
          <select
            value={signupStatuses[response.id] || ""}
            onChange={(e) => handleStatusChange(response.id, e.target.value)}
            className="w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          >
            <option value="" disabled>Select Status</option>
            {statusOptions.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </td>
        <td className="py-3 px-4">{response.notes || "No notes"}</td>
        <td className="py-3 px-4 text-center">
        <div className="flex space-x-2">
  <button
    onClick={() => startSignupEditing(response)}
    className="group relative p-2 rounded-full hover:bg-blue-50 transition-colors"
  >
    <Edit className="h-5 w-5 text-blue-600" />
    <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
      Edit
    </span>
  </button>
  <button
    onClick={() => handleDelete(response.id)}
    className="group relative p-2 rounded-full hover:bg-red-50 transition-colors"
  >
    <Trash2 className="h-5 w-5 text-red-600" />
    <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
      Delete
    </span>
  </button>
</div>
        </td>
      </>
    )}
  </tr>
))}
      </tbody>

      <tfoot>
      <tr className="group transition-all duration-300 hover:scale-[1.02] hover:bg-blue-500/10 hover:shadow-md">
    <td className="py-3 px-4">
      <input
        type="text"
        placeholder="Name"
        className="border p-3 w-full rounded-lg bg-white/60 backdrop-blur-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
        value={signupData.name}
        onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
      />
    </td>
    <td className="py-3 px-4">
      <input
        type="text"
        placeholder="Info"
        className="border p-3 w-full rounded-lg bg-white/60 backdrop-blur-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
        value={signupData.info}
        onChange={(e) => setSignupData({ ...signupData, info: e.target.value })}
      />
    </td>
    <td className="py-3 px-4">
      <input
        type="text"
        placeholder="Details"
        className="border p-3 w-full rounded-lg bg-white/60 backdrop-blur-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
        value={signupData.details}
        onChange={(e) => setSignupData({ ...signupData, details: e.target.value })}
      />
    </td>
    <td className="py-3 px-4">
      <select
        className="border p-2 rounded-md w-full"
        value={signupData.status}
        onChange={(e) => setSignupData({ ...signupData, status: e.target.value })}
      >
        <option value="" disabled>Select Status</option>
        {statusOptions.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
    </td>
    <td className="py-3 px-4">
      <input
        type="text"
        placeholder="Notes"
        className="border p-3 w-full rounded-lg bg-white/60 backdrop-blur-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
        value={signupData.notes}
        onChange={(e) => setSignupData({ ...signupData, notes: e.target.value })}
      />
    </td>
    <td className="py-3 px-4 text-right" colSpan="2">
      <button
        onClick={addSignup}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
      >
        Add Sign-up
      </button>
    </td>
  </tr>
</tfoot>

    </table>
  </div>
) : (
  <p className="text-gray-600">No sign-up responses available.</p>
)}


              </>
            ) : activeView === 'meetings' ? (
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
    .map((meeting, index) => (
      <tr className={`group transition-all duration-300 ${index % 2 === 0 ? "bg-white/80" : "bg-gray-50/80"} hover:bg-blue-100 hover:scale-[1.02] shadow-md hover:shadow-2xl backdrop-blur-lg rounded-xl`}>
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
              <div className="text-sm text-gray-900">{meeting.hours}</div>
            </td>
            <td className="px-6 py-4">
              <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                meeting.paid === 'Yes' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {meeting.paid === 'Yes' ? 'Paid' : 'Unpaid'}
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
    ))}
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