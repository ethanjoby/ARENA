import React, { useState, useEffect } from "react";
import { getFirestore, getDocs, deleteDoc, query, orderBy } from "firebase/firestore";
import { doc, updateDoc } from 'firebase/firestore'; 
import { addDoc, collection } from 'firebase/firestore';
import { app } from "./firebase";
import {Trash2, Edit } from "lucide-react";
import { Timestamp } from "firebase/firestore";

const AdminPage = () => {
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState([]);
  const [activeMeetingTab, setActiveMeetingTab] = useState("consultation");
  const [meetings, setMeetings] = useState({
    consultation: [],
    summerProgram: [],
    satAct: [],
    ec: []
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
    date: "",
    hosts: "",
    link: "",
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
      }));

      const meetingsList = meetingsBooked.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().date?.toDate() || new Date(), // Ensure date is a JavaScript Date
        hosts: doc.data().hosts || "",
      }));
      
      setQuestions(questionList);
      setResponses(responsesList);
      const categorizedMeetings = {
        consultation: meetingsList.filter(m => m.meetingType === "Consultation"),
        summerProgram: meetingsList.filter(m => m.meetingType === "Summer Program"),
        satAct: meetingsList.filter(m => m.meetingType === "SAT/ACT"),
        ec: meetingsList.filter(m => m.meetingType === "Extracurriculars")
      };
      
      setMeetings(categorizedMeetings);
      
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

  const handleMeetingDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this meeting?");
    
    if (confirmDelete) {
      try {
        const db = getFirestore(app);
        await deleteDoc(doc(db, "meetings", id));
  
        setMeetings((prev) => ({
          ...prev,
          [activeMeetingTab]: prev[activeMeetingTab]?.filter(meeting => meeting.id !== id) || []
        }));
  
        console.log("Meeting deleted successfully!");
  
      } catch (error) {
        console.error("Error deleting meeting:", error);
      }
    }
  };
  
  

  const addMeeting = async () => {
    try {
      console.log("Trying to add a meeting...");
  
      if (!meetingsdata.name.trim() || 
          !meetingsdata.email.trim() || 
          !meetingsdata.date.trim() || 
          !meetingsdata.link.trim()) {
        alert("Please fill in all required fields.");
        console.error("Missing required fields:", meetingsdata);
        return;
      }
  
      const db = getFirestore(app);
      const meetingsCollection = collection(db, "meetings");
  
      // Convert date to Firestore Timestamp
      const meetingDateTime = Timestamp.fromDate(new Date(meetingsdata.date));
  
      console.log("Formatted date:", meetingDateTime);
  
      // Properly format the meeting type
      const formattedMeetingType = {
        consultation: "Consultation",
        summerProgram: "Summer Program",
        satAct: "SAT/ACT",
        ec: "Extracurriculars"
      }[activeMeetingTab] || "Other"; // Fallback in case of unexpected input
  
      const newMeeting = {
        name: meetingsdata.name,
        email: meetingsdata.email,
        date: meetingDateTime, 
        hosts: meetingsdata.hosts || "N/A",
        link: meetingsdata.link,
        meetingType: formattedMeetingType // Ensure correct format
      };
  
      // Add to Firestore
      const docRef = await addDoc(meetingsCollection, newMeeting);
      newMeeting.id = docRef.id;
  
      console.log("Meeting added to Firestore with ID:", newMeeting.id);
  
      // Update state properly for all meeting types
      setMeetings((prev) => ({
        ...prev,
        [activeMeetingTab]: [...(prev[activeMeetingTab] || []), newMeeting],
      }));
  
      // Clear input fields after adding
      setmeetingsdata({
        name: "",
        email: "",
        date: "",
        hosts: "",
        link: ""
      });
  
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
    date: "",
    hosts: "",
    link: "" // ✅ Include Meeting Link in edit state
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

          <div className="grid grid-cols-3 gap-4 mb-6">
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
  
</div>

<div className="bg-white rounded-lg shadow-lg p-6">
  {activeView === 'contact' ? (
    <>
      <h2 className="text-2xl font-bold mb-4">Contact Form Messages</h2>
      {questions.length > 0 ? (
        <div className="overflow-x-auto w-full">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Phone</th>
                <th className="py-3 px-4">Grade Level</th>
                <th className="py-3 px-4">Message</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Delete</th>
                <th className="py-3 px-4">Notes</th>
              </tr>
            </thead>
            <tbody>
  {questions.map((question, index) => (
    <tr key={question.id} className={index % 2 === 0 ? "bg-gray-50" : ""}>
      <td className="py-3 px-4">{question.name}</td>
      <td className="py-3 px-4">{question.email}</td>
      <td className="py-3 px-4">{question.phone}</td>
      <td className="py-3 px-4">{question.grade}</td>
      <td className="py-3 px-4">{question.info}</td>
      <td className="py-3 px-4">{question.createdAt.toDateString()}</td>
      <td className="py-3 px-4">
        <button onClick={() => handleDeleteContact(question.id)} className="text-red-500 hover:text-red-700">
          <Trash2 size={20} />
        </button>
      </td>
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
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Contact</th>
                <th className="py-3 px-4">Grade</th>
                <th className="py-3 px-4">Details</th>
                <th className="py-3 px-4">Notes</th>
                <th className="py-3 px-4">Save</th>
                <th className="py-3 px-4">Delete</th>
              </tr>
            </thead>
            <tbody>
              {responses.map((response, index) => (
                <tr key={response.id} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                  <td className="py-3 px-4">{response.name}</td>
                  <td className="py-3 px-4">
                    <strong>Student Email:</strong> {response.email}
                    <br />
                    <strong>Parent Email: </strong>
                    {response.parentEmail}
                    <br />
                    <strong>Phone Number:</strong>
                    <br />
                    {response.phone}
                  </td>
                  <td className="py-3 px-4">{response.grade}</td>
                  <td className="py-3 px-4">
                    <details className="cursor-pointer">
                      <summary className="text-blue-600 hover:text-blue-800">View Details</summary>
                      <div className="mt-2 text-sm">
                        <p>
                          <strong>Summer Programs:</strong>{" "}
                          {Array.isArray(response.selectedPrograms)
                            ? response.selectedPrograms.join(", ")
                            : response.selectedPrograms || "N/A"}
                        </p>
                        <p>
                          <strong>Internship:</strong>{" "}
                          {Array.isArray(response.selectedInternshipOptions)
                            ? response.selectedInternshipOptions.join(", ")
                            : response.selectedInternshipOptions || "N/A"}
                        </p>
                        <p>
                          <strong>Olympiads:</strong>{" "}
                          {Array.isArray(response.selectedOlympiadOptions)
                            ? response.selectedOlympiadOptions.join(", ")
                            : response.selectedOlympiadOptions || "N/A"}
                        </p>
                        <p>
                          <strong>Resume:</strong>{" "}
                          {Array.isArray(response.selectedResumeOptions)
                            ? response.selectedResumeOptions.join(", ")
                            : response.selectedResumeOptions || "N/A"}
                        </p>
                        <p>
                          <strong>SAT Prep:</strong>{" "}
                          {Array.isArray(response.selectedSATPrep)
                            ? response.selectedSATPrep.join(", ")
                            : response.selectedSATPrep || "N/A"}
                        </p>
                        {response.additionalInfo && (
                          <p>
                            <strong>Additional Info:</strong> {response.additionalInfo}
                          </p>
                        )}
                      </div>
                    </details>
                  </td>
                  <td className="py-3 px-4">
  {editingNotesId === response.id ? (
    <input
      type="text"
      value={response.notes || ""}
      onChange={(e) => handleNotesChange(response.id, e.target.value)}
      className="border p-1 rounded w-full"
      autoFocus
    />
  ) : (
    <div 
      onClick={() => setEditingNotesId(response.id)} 
      className="cursor-pointer p-1 min-w-[100px] border rounded bg-gray-100"
    >
      {response.notes || "Click to add notes"}
    </div>
  )}
</td>
                  <td className="py-3 px-4">
                    {editingNotesId === response.id && (
                      <button
                        onClick={() => handleSaveNotes(response.id)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
                      >
                        Save
                      </button>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleDelete(response.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-600">No sign-up responses available.</p>
      )}
              </>
            ) : activeView === 'meetings' ? (
                 <>
      <h2 className="text-2xl font-bold mb-4">Customer Next Meeting</h2>
      <div className="flex space-x-4 mb-4">
  {["consultation", "summerProgram", "satAct", "ec"].map((tab) => (
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

    </>
            ) : activeView === 'customers' ? (
              <>
              
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
