import React, { useState, useEffect } from "react";
import { getFirestore, getDocs, deleteDoc, query, orderBy } from "firebase/firestore";
import { doc, updateDoc } from 'firebase/firestore'; 
import { addDoc, collection } from 'firebase/firestore';
import { app } from "./firebase";
import {Trash2, Edit } from "lucide-react";
import { Timestamp } from "firebase/firestore";
import GoogleFormEmbed from "./GoogleFormEmbed";

const AdminPage = () => {
  const [signupStatuses, setSignupStatuses] = useState({});
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
    name: "", 
    email: "", 
    meetingType: "", 
    subject: "",
    hosts: "",
    hours: "",
  }); ;
  const fetchData = async () => {
    try {
      const db = getFirestore(app);
      const questionCollection = collection(db, "contactus");
      const responsesCollection = collection(db, "arenaSignUps");
      const meetingsCollection = collection(db, "meetings");

      //const questionorder = query(questionCollection, orderBy("createdAt", "asc"));
      //const responsesOrder = query(responsesCollection,orderBy("createdAt", "asc")); 
      const meetingsOrder = query(meetingsCollection, orderBy("date", "asc")); 
      
      const contactQuestions = await getDocs(questionCollection);
      const signupResponses = await getDocs(responsesCollection);
      const meetingsBooked = await getDocs(meetingsOrder); 
      
      const questionList = contactQuestions.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date() //make the thung into a javascript date to read out
      }));

      const responsesList = signupResponses.docs.map((doc) => ({ 
        id: doc.id, 
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        status: doc.data().status || "" // ✅ Load status from Firestore
      }));
      
      // ✅ Set signupStatuses state with Firestore data
      const statusMap = {};
      responsesList.forEach((response) => {
        statusMap[response.id] = response.status || "";
      });
      
      setSignupStatuses(statusMap);
      
      

      const meetingsList = meetingsBooked.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().date?.toDate() || new Date(), // Ensure date is a JavaScript Date
        hosts: doc.data().hosts || "",
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
      if (!meetingsdata.name || !meetingsdata.email || !meetingsdata.subject || !meetingsdata.hours) {
          alert("Please fill in all required fields.");
          return;
      }

      const db = getFirestore(app);
      const meetingsCollection = collection(db, "meetings");

      // Create the new meeting object
      const newMeeting = {
          name: meetingsdata.name,
          email: meetingsdata.email,
          subject: meetingsdata.subject,
          hosts: meetingsdata.hosts || "N/A",
          hours: meetingsdata.hours,
          meetingType: activeMeetingTab, // Use the active tab as the meeting type
          date: Timestamp.fromDate(new Date()) // Add current timestamp
      };

      // Add to Firestore
      const docRef = await addDoc(meetingsCollection, newMeeting);
      
      // Update local state
      setMeetings(prev => ({
          ...prev,
          [activeMeetingTab]: [...(prev[activeMeetingTab] || []), { ...newMeeting, id: docRef.id }]
      }));

      // Clear form
      setmeetingsdata({
          name: "",
          email: "",
          subject: "",
          hosts: "",
          hours: ""
      });

      console.log("Meeting added successfully!");
      
  } catch (error) {
      console.error("Error adding meeting: ", error);
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
    name: "",
    email: "",
    subject: "",
    hosts: "",
    hours: "" // ✅ Include Meeting Link in edit state
  });
  
  const updateMeeting = async (id, updatedData) => {
    try {
      const db = getFirestore(app);
      const meetingRef = doc(db, "meetings", id);
  
      await updateDoc(meetingRef, updatedData);
  
      setMeetings((prevMeetings) =>
        prevMeetings.map((meeting) =>
          meeting.id === id ? { ...meeting, ...updatedData } : meeting
        )
      );
  
      console.log("Meeting updated successfully!");
    } catch (error) {
      console.error("Error updating meeting:", error);
    }
  };
  

  const startEditing = (meeting) => {
    setEditingId(meeting.id);
    setEditData(meeting);
  };

  const handleEditChange = (e, field) => {
    setEditData({ ...editData, [field]: e.target.value });
  };
  

  const saveEdit = async () => {
    try {
      const db = getFirestore(app);
      const meetingRef = doc(db, "meetings", editingId);
  
      await updateDoc(meetingRef, editData);
  
      // Fix: Ensure prevMeetings is treated as an array
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
          
          <table className="w-full">
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
            className="border p-2 w-full rounded-md"
          />
        </td>
        <td className="py-3 px-4">
          <input
            type="text"
            placeholder="Student Email"
            value={editSignupData.email}
            onChange={(e) => handleSignupEditChange(e, 'email')}
            className="border p-2 w-full rounded-md mb-2"
          />
          <input
            type="text"
            placeholder="Parent Email"
            value={editSignupData.parentEmail}
            onChange={(e) => handleSignupEditChange(e, 'parentEmail')}
            className="border p-2 w-full rounded-md mb-2"
          />
          <input
            type="text"
            placeholder="Phone"
            value={editSignupData.phone}
            onChange={(e) => handleSignupEditChange(e, 'phone')}
            className="border p-2 w-full rounded-md mb-2"
          />
          <input
            type="text"
            placeholder="Grade"
            value={editSignupData.grade}
            onChange={(e) => handleSignupEditChange(e, 'grade')}
            className="border p-2 w-full rounded-md"
          />
        </td>
        <td className="py-3 px-4">
          <textarea
            value={editSignupData.additionalInfo}
            onChange={(e) => handleSignupEditChange(e, 'additionalInfo')}
            className="border p-2 w-full rounded-md"
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
            className="border p-2 w-full rounded-md"
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
  <tr className="bg-gray-100">
    <td className="py-3 px-4">
      <input
        type="text"
        placeholder="Name"
        className="border p-2 w-full rounded-md"
        value={signupData.name}
        onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
      />
    </td>
    <td className="py-3 px-4">
      <input
        type="text"
        placeholder="Info"
        className="border p-2 w-full rounded-md"
        value={signupData.info}
        onChange={(e) => setSignupData({ ...signupData, info: e.target.value })}
      />
    </td>
    <td className="py-3 px-4">
      <input
        type="text"
        placeholder="Details"
        className="border p-2 w-full rounded-md"
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
        className="border p-2 w-full rounded-md"
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
      <h2 className="text-2xl font-bold mb-4">Customer Next Meeting</h2>
      
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
  
{/*
{meetings[activeMeetingTab]?.length > 0 ? (
  <>

  
  <table className="w-full mt-4 border-collapse border border-gray-300">
    <thead className="bg-gray-100 text-gray-700">
      <tr>
        <th className="py-3 px-4 text-left border-b border-gray-300">Name</th>
        <th className="py-3 px-4 text-left border-b border-gray-300">Email</th>
        <th className="py-3 px-4 text-left border-b border-gray-300">Date/Time</th>
        <th className="py-3 px-4 text-left border-b border-gray-300">Hosts</th>
        <th className="py-3 px-4 text-left border-b border-gray-300">Meeting Link</th>
        <th className="py-3 px-4 text-center border-b border-gray-300">Actions</th>
      </tr>
    </thead>
    <tbody>
      {meetings[activeMeetingTab].map((meeting, index) => (
        <tr key={meeting.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
          {editingId === meeting.id ? (
            <>
              <td className="py-2 px-4 border-b"><input type="text" value={editData.name} onChange={(e) => handleEditChange(e, 'name')} className="border p-2 w-full rounded-md" /></td>
              <td className="py-2 px-4 border-b"><input type="email" value={editData.email} onChange={(e) => handleEditChange(e, 'email')} className="border p-2 w-full rounded-md" /></td>
              <td className="py-2 px-4 border-b"><input type="datetime-local" value={editData.date} onChange={(e) => handleEditChange(e, 'date')} className="border p-2 w-full rounded-md" /></td>
              <td className="py-2 px-4 border-b"><input type="text" value={editData.hosts} onChange={(e) => handleEditChange(e, 'hosts')} className="border p-2 w-full rounded-md" /></td>
              <td className="py-2 px-4 border-b"><input type="text" value={editData.link} onChange={(e) => handleEditChange(e, 'link')} className="border p-2 w-full rounded-md" /></td>
              <td className="py-2 px-4 border-b text-center">
                <button onClick={saveEdit} className="text-green-500 hover:text-green-700 font-bold mr-2">Save</button>
                <button onClick={() => setEditingId(null)} className="text-gray-500 hover:text-gray-700">Cancel</button>
              </td>
            </>
          ) : (
            <>
              <td className="py-3 px-4 border-b">{meeting.name}</td>
              <td className="py-3 px-4 border-b">{meeting.email}</td>
              <td className="py-3 px-4 border-b">{new Date(meeting.date).toLocaleString()}</td>
              <td className="py-3 px-4 border-b">{meeting.hosts}</td>
              <td className="py-3 px-4 border-b text-center">
  <a 
    href={meeting.link} 
    target="_blank" 
    rel="noopener noreferrer" 
    className="inline-flex items-center bg-green-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-green-600 transition duration-300"
  >
    <span className="mr-2">Join</span>
    ➜
  </a>
</td>

              <td className="py-3 px-4 border-b text-center">
                <button onClick={() => startEditing(meeting)} className="text-blue-500 hover:text-blue-700 font-bold mr-2">
                  <Edit size={20} />
                </button>
                <button onClick={() => handleMeetingDelete(meeting.id)} className="text-red-500 hover:text-red-700 font-bold">
                  <Trash2 size={20} />
                </button>
              </td>
            </>
          )}
        </tr>
      ))}
    </tbody>
  </table>
  </>
) : (
  <p className="text-gray-600 text-center py-4">No meetings available for this category.</p>
)}


 
        <>
        <table className="w-full mt-4">
        <thead>
              <tr className="bg-gray-50 text-left">
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Hosts</th>
                <th className="py-3 px-4">Date/Time</th>
                <th className="py-3 px-4">Link</th>
                <th className="py-3 px-4"></th>
              </tr>
            </thead>
            <tfoot>
  <tr className="bg-gray-50">
    <td className="py-2 px-4">
      <input
        type="text"
        placeholder="Name"
        className="border p-2 w-full rounded-md"
        value={meetingsdata.name}
        onChange={(e) => setmeetingsdata({ ...meetingsdata, name: e.target.value })}
      />
    </td>
    <td className="py-2 px-4">
      <input
        type="email"
        placeholder="Email"
        className="border p-2 w-full rounded-md"
        value={meetingsdata.email}
        onChange={(e) => setmeetingsdata({ ...meetingsdata, email: e.target.value })}
      />
    </td>
    <td className="py-2 px-4">
      <input
        type="text"
        placeholder="Hosts"
        className="border p-2 w-full rounded-md"
        value={meetingsdata.hosts}
        onChange={(e) => setmeetingsdata({ ...meetingsdata, hosts: e.target.value })}
      />
    </td>
    <td className="py-2 px-4">
      <input
        type="datetime-local"
        className="border p-2 w-full rounded-md"
        value={meetingsdata.date}
        onChange={(e) => setmeetingsdata({ ...meetingsdata, date: e.target.value })}
      />
    </td>
    <td className="py-2 px-4">
      <input
        type="text"
        placeholder="Meeting Link"
        className="border p-2 w-full rounded-md"
        value={meetingsdata.link}
        onChange={(e) => setmeetingsdata({ ...meetingsdata, link: e.target.value })}
      />
    </td>
    <td className="py-2 px-4 text-right">
      <button
        onClick={addMeeting}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
      >
        Add Meeting
      </button>
    </td>
  </tr>
</tfoot>



  </table>
      </>
*/}
    </>
            ) : activeView === 'customers' ? (
              <>
      <h2 className="text-2xl font-bold mb-4">Customer Next Meeting</h2>
      <div className="flex space-x-4 mb-4">
  {["Tutoring", "SummerProgram", "Internship", "SAT/ACT"].map((tab) => (
    <button
      key={tab}
      className={`px-4 py-2 rounded ${activeMeetingTab === tab ? "bg-blue-500 text-white" : "bg-gray-200"}`}
      onClick={() => setActiveMeetingTab(tab)}
    >
      {tab.replace(/([A-Z])/g, " $1")} {/* Formats "summerProgram" to "Summer Program" */}
    </button>
  ))}
</div>

{meetings[activeMeetingTab]?.length > 0 ? (
  <table className="overflow-x-auto w-full">
    <thead className="bg-gray-100 text-gray-700">
      <tr>
        <th className="py-3 px-4 text-left">Name</th>
        <th className="py-3 px-4 text-left ">Email</th>
        <th className="py-3 px-4 text-left ">Topic</th>
        <th className="py-3 px-4 text-left">Tutor</th>
        <th className="py-3 px-4 text-left ">Hours Left</th>
        <th className="py-3 px-4 text-center ">Actions</th>
      </tr>
    </thead>
    <tbody>
      {meetings[activeMeetingTab].map((meeting, index) => (
        <tr key={meeting.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
          {editingId === meeting.id ? (
            <>
              <td className="py-2 px-4 "><input type="text" value={editData.name} onChange={(e) => handleEditChange(e, 'name')} className="border p-2 w-full rounded-md" /></td>
              <td className="py-2 px-4 "><input type="email" value={editData.email} onChange={(e) => handleEditChange(e, 'email')} className="border p-2 w-full rounded-md" /></td>
              <td className="py-2 px-4 "><input type="text" value={editData.subject} onChange={(e) => handleEditChange(e, 'subject')} className="border p-2 w-full rounded-md" /></td>
              <td className="py-2 px-4 "><input type="text" value={editData.hosts} onChange={(e) => handleEditChange(e, 'hosts')} className="border p-2 w-full rounded-md" /></td>
              <td className="py-2 px-4 "><input type="text" value={editData.hours} onChange={(e) => handleEditChange(e, 'hours')} className="border p-2 w-full rounded-md" /></td>
              <td className="py-2 px-4  text-center">
                <button onClick={saveEdit} className="text-green-500 hover:text-green-700 font-bold mr-2">Save</button>
                <button onClick={() => setEditingId(null)} className="text-gray-500 hover:text-gray-700">Cancel</button>
              </td>
            </>
          ) : (
            <>
              <td className="py-3 px-4 ">{meeting.name}</td>
              <td className="py-3 px-4 ">{meeting.email}</td>
              <td className="py-3 px-4">{meeting.subject}</td>
              
              <td className="py-3 px-4 ">{meeting.hosts}</td>
              <td className="py-3 px-4">{meeting.hours}</td>
             

              <td className="py-3 px-4 text-center">
                <button onClick={() => startEditing(meeting)} className="text-blue-500 hover:text-blue-700 font-bold mr-2">
                  <Edit size={20} />
                </button>
                <button onClick={() => handleMeetingDelete(meeting.id)} className="text-red-500 hover:text-red-700 font-bold">
                  <Trash2 size={20} />
                </button>
              </td>
            </>
          )}
        </tr>
      ))}
    </tbody>
  </table>
) : (
  <p className="text-gray-600 text-center py-4">No meetings available for this category.</p>
)}


 
        <>
        <table className="w-full mt-4">
        <thead>
              <tr className="bg-gray-50 text-left">
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Tutor</th>
                <th className="py-3 px-4">Topic</th>
                <th className="py-3 px-4">Hours</th>
                <th className="py-3 px-4"></th>
              </tr>
            </thead>
            <tfoot>
  <tr className="bg-gray-50">
    <td className="py-2 px-4">
      <input
        type="text"
        placeholder="Name"
        className="border p-2 w-full rounded-md"
        value={meetingsdata.name}
        onChange={(e) => setmeetingsdata({ ...meetingsdata, name: e.target.value })}
      />
    </td>
    <td className="py-2 px-4">
      <input
        type="email"
        placeholder="Email"
        className="border p-2 w-full rounded-md"
        value={meetingsdata.email}
        onChange={(e) => setmeetingsdata({ ...meetingsdata, email: e.target.value })}
      />
    </td>
    <td className="py-2 px-4">
      <input
        type="text"
        placeholder="Hosts"
        className="border p-2 w-full rounded-md"
        value={meetingsdata.hosts}
        onChange={(e) => setmeetingsdata({ ...meetingsdata, hosts: e.target.value })}
      />
    </td>
    <td className="py-2 px-4">
      <input
        type="text"
        placeholder="Subject"
        className="border p-2 w-full rounded-md"
        value={meetingsdata.subject}
        onChange={(e) => setmeetingsdata({ ...meetingsdata, subject: e.target.value })}
      />
    </td>
    <td className="py-2 px-4">
      <input
        type="text"
        placeholder="Hours Left"
        className="border p-2 w-full rounded-md"
        value={meetingsdata.hours}
        onChange={(e) => setmeetingsdata({ ...meetingsdata, hours: e.target.value })}
      />
    </td>
    
    <td className="py-2 px-4 text-right">
      <button
        onClick={addMeeting}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
      >
        Add Meeting
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
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full py-2 bg-black text-white rounded hover:bg-gray-800"
          >
            Login
          </button>
        </form>
      </div>
    );
  }
};

export default AdminPage;