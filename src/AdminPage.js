import React, { useState, useEffect } from "react";
import { getFirestore, getDocs, deleteDoc, query, orderBy } from "firebase/firestore";
import { doc, updateDoc } from 'firebase/firestore'; 
import { addDoc, collection } from 'firebase/firestore';
import { app } from "./firebase";
import {Trash2, Edit } from "lucide-react";

const AdminPage = () => {
  const [meetings, setmeetings] = useState([]); 
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState([]);

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
    interests: "", 
    consultationMeeting: false, 
    date: "",
    time: "",
    hosts: "",
  }); ;

  useEffect(() => {
    const storedLoginState = localStorage.getItem('adminLoggedIn');
    if (storedLoginState === 'true') {
      setIsLoggedIn(true);
    }

    if (isLoggedIn) {
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
          setmeetings(meetingsList); 
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      };

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

  const handleMeetingDelete = async(id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this meeting?");
    if(confirmDelete){
      try {
        const db = getFirestore(app); 
        await deleteDoc(doc(db, "meetings", id)); 
        setmeetings(meetings.filter((meeting) => meeting.id !== id)); 
      } catch (error) {
        console.error("Eerro deleting the meetings", error); 
      }
    }
  }

  const addMeeting = async () => {
    try {
        const db = getFirestore(app);
        const meetingsCollection = collection(db, "meetings");

        // Combine date and time into a single Date object
        const [hours, minutes] = meetingsdata.time.split(":");
        const meetingDateTime = new Date(`${meetingsdata.date}T${hours}:${minutes}:00`);

        const newMeeting = {
            name: meetingsdata.name,
            email: meetingsdata.email,
            interests: meetingsdata.interests,
            consultationMeeting: meetingsdata.meetingType,
            date: meetingDateTime, // Store correctly formatted date
            hosts: meetingsdata.hosts,
        };

        await addDoc(meetingsCollection, newMeeting);
        
        setmeetingsdata({
            name: "",
            email: "",
            interests: "",
            consultationMeeting: false,
            date: "",
            time: "", 
            hosts: "",
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
  
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const updateMeeting = async (id, updatedData) => {
    try {
      const db = getFirestore(app);
      const meetingRef = doc(db, "meetings", id);
  
      await updateDoc(meetingRef, updatedData);
  
      setmeetings((prevMeetings) =>
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

  const saveEdit = () => {
    updateMeeting(editingId, editData);
    setEditingId(null);
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
                          <th className="py-3 px-4">Check if responded</th>
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
                            <td className="py-3 px-4 ">
                              <input 
                                type="checkbox" 
                                checked={question.responded || false} 
                                onChange={() => handleResponseChange(question.id)} 
                              />
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
                          <th className="py-3 px-4"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {responses.map((response, index) => (
                          <tr key={response.id} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                            <td className="py-3 px-4">{response.name}</td>
                            <td className="py-3 px-4"><strong>Student Email:</strong> {response.email}<br/> <strong>Parent Email: </strong>{response.parentEmail}<br/> <strong>Phone Number:</strong> <br/>{response.phone}</td>
                            
                            
                            <td className="py-3 px-4">{response.grade}</td>
                            
                            
                            <td className="py-3 px-4">
                              <details className="cursor-pointer">
                                <summary className="text-blue-600 hover:text-blue-800">View Details</summary>
                                <div className="mt-2 text-sm">
                                <p><strong>Summer Programs:</strong> {Array.isArray(response.selectedPrograms) 
                                ? response.selectedPrograms.join(", ") 
                                : response.selectedPrograms || "N/A"}</p>
                                  <p><strong>Internship:</strong> {Array.isArray(response.selectedInternshipOptions) 
                                    ? response.selectedInternshipOptions.join(", ") 
                                    : response.selectedInternshipOptions || "N/A"}</p>
                                    <p><strong>Olympiads:</strong> {Array.isArray(response.selectedOlympiadOptions) 
                                    ? response.selectedOlympiadOptions.join(", ") 
                                    : response.selectedOlympiadOptions || "N/A"}</p>
                                  <p><strong>Resume:</strong> {Array.isArray(response.selectedResumeOptions) 
                                    ? response.selectedResumeOptions.join(", ") 
                                    : response.selectedResumeOptions || "N/A"}</p>
                                  <p><strong>SAT Prep:</strong> {Array.isArray(response.selectedSATPrep) 
                                    ? response.selectedSATPrep.join(", ") 
                                    : response.selectedSATPrep || "N/A"}</p>
                                  {response.additionalInfo && (
                                    <p><strong>Additional Info:</strong> {response.additionalInfo}</p>
                                  )}
                                </div>
                              </details>
                            </td>
                            <td className="py-3 px-4">
                              <button onClick={() => handleDelete(response.id)} className="text-red-500 hover:text-red-700">
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
      {meetings.length > 0 ? (
        <div className="overflow-x-auto w-full">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-50 text-left w-full">
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Interests</th>
                <th className="py-3 px-4">Type Of Meeting</th>
                <th className="py-3 px-4">Date & Time</th>
                <th className="py-3 px-4">Meeting Host(s)</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
            {meetings.map((meeting, index) => (
              <tr key={meeting.id} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                {editingId === meeting.id ? (
                  <>
                    <td className="py-3 px-4"><input type="text" value={editData.name} onChange={(e) => handleEditChange(e, 'name')} className="border p-2 w-full" /></td>
                    <td className="py-3 px-4"><input type="email" value={editData.email} onChange={(e) => handleEditChange(e, 'email')} className="border p-2 w-full" /></td>
                    <td className="py-3 px-4"><input type="text" value={editData.interests} onChange={(e) => handleEditChange(e, 'interests')} className="border p-2 w-full" /></td>
                    <td className="py-3 px-4">
  <select value={editData.meetingType} onChange={(e) => handleEditChange(e, 'meetingType')} className="border p-2 w-full">
  <option value="None">Type Of meeting</option>
    <option value="Consultation">Consultation</option>
    <option value="Extracurricular">Extracurricular</option>
    <option value="Research">Research</option>
    <option value="School">Tutoring-School</option>
    <option value="SAT/ACT">Tutoring-SAT/ACT</option>
    <option value="Olympiad">Tutoring-Olympiad</option>
  </select>
</td>

                    <td className="py-3 px-4">
                      <input type="datetime-local" value={editData.date} onChange={(e) => handleEditChange(e, 'date')} className="border p-2 w-full" />
                    </td>
                    <td className="py-3 px-4"><input type="text" value={editData.hosts} onChange={(e) => handleEditChange(e, 'hosts')} className="border p-2 w-full" /></td>
                    <td className="py-3 px-4">
                      <button onClick={saveEdit} className="text-green-500 hover:text-green-700 mr-2">Save</button>
                      <button onClick={() => setEditingId(null)} className="text-gray-500 hover:text-gray-700">Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="py-3 px-4">{meeting.name}</td>
                    <td className="py-3 px-4">{meeting.email}</td>
                    <td className="py-3 px-4">{meeting.interests}</td>
                    <td className="py-3 px-4">{meeting.meetingType}</td>

                    <td className="py-3 px-4">{new Date(meeting.date).toLocaleString()}</td>
                    <td className="py-3 px-4">{meeting.hosts}</td>
                    <td className="py-3 px-4">
                      <button onClick={() => startEditing(meeting)} className="text-blue-500 hover:text-blue-700 mr-2">
                        <Edit size={20} />
                      </button>
                      <button onClick={() => handleMeetingDelete(meeting.id)} className="text-red-500 hover:text-red-700">
                        <Trash2 size={20} />
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
            </tbody>
            <tfoot className = "">
              <tr className="bg-gray-50">
              <td className="py-2 px-1">
      <input
        type="text"
        placeholder="Name"
        className="border p-2 w-full rounded-md"
        value={meetingsdata.name}
        onChange={(e) => setmeetingsdata({ ...meetingsdata, name: e.target.value })}
      />
    </td>
    <td className="py-2 px-1">
      <input
        type="email"
        placeholder="Email"
        className="border p-2 w-full rounded-md"
        value={meetingsdata.email}
        onChange={(e) => setmeetingsdata({ ...meetingsdata, email: e.target.value })}
      />
    </td>
    <td className="py-2 px-1">
      <input
        type="text"
        placeholder="Interests"
        className="border p-2 w-full rounded-md"
        value={meetingsdata.interests}
        onChange={(e) => setmeetingsdata({ ...meetingsdata, interests: e.target.value })}
      />
    </td>
    <td className="py-2 px-1">
  <select
    className="border p-2 w-full rounded-md"
    value={meetingsdata.meetingType}
    onChange={(e) =>
      setmeetingsdata({ ...meetingsdata, meetingType: e.target.value })
    }
  >
    <option value="None">Type Of meeting</option>
    <option value="Consultation">Consultation</option>
    <option value="Extracurricular">Extracurricular</option>
    <option value="Research">Research</option>
    <option value="School">Tutoring-School</option>
    <option value="SAT/ACT">Tutoring-SAT/ACT</option>
    <option value="Olympiad">Tutoring-Olympiad</option>
  </select>
</td>

    <td className="py-2 px-1">
      <div className="flex flex-col space-y-2">
        <input
          type="date"
          className="border p-2 rounded-md"
          value={meetingsdata.date}
          onChange={(e) => setmeetingsdata({ ...meetingsdata, date: e.target.value })}
        />
        <input
          type="time"
          className="border p-2 rounded-md"
          value={meetingsdata.time}
          onChange={(e) => setmeetingsdata({ ...meetingsdata, time: e.target.value })}
        />
      </div>
    </td>
    <td className="py-2 ">
      <input
        type="text"
        placeholder="Meeting Host(s)"
        className="border p-2 w-full rounded-md"
        value={meetingsdata.hosts}
        onChange={(e) => setmeetingsdata({ ...meetingsdata, hosts: e.target.value })}
      />
    </td>
    <td className="py-2 pl-4 ">
      <button
        onClick={addMeeting}
        className="font-bold text-white bg-green-500 px-4 py-2 rounded-md hover:bg-green-600 transition"
      >
        +
      </button>
    </td>
              </tr>
            </tfoot>
          </table>
        </div>
      ) : (
        <>
        <p>No meetings available.</p>
        <table className="w-full mt-4">
        <thead>
              <tr className="bg-gray-50 text-left">
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Interests</th>
                <th className="py-3 px-4">Is Consultation Meeting</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
    <tfoot className="w-full">
      <tr className="bg-gray-50">
        <td className="py-2 px-4">
          <input
            type="text"
            placeholder="Name"
            className="border p-2 w-full"
            value={meetingsdata.name}
            onChange={(e) => setmeetingsdata({ ...meetingsdata, name: e.target.value })}
          />
        </td>
        <td className="py-2 px-4">
          <input
            type="email"
            placeholder="Email"
            className="border p-2 w-full"
            value={meetingsdata.email}
            onChange={(e) => setmeetingsdata({ ...meetingsdata, email: e.target.value })}
          />
        </td>
        <td className="py-2 px-4">
          <input
            type="text"
            placeholder="Interests"
            className="border p-2 w-full"
            value={meetingsdata.interests}
            onChange={(e) => setmeetingsdata({ ...meetingsdata, interests: e.target.value })}
          />
        </td>
        <td className="py-2 px-1">
  <select
    className="border p-2 w-full rounded-md"
    value={meetingsdata.meetingType}
    onChange={(e) =>
      setmeetingsdata({ ...meetingsdata, meetingType: e.target.value })
    }
  >
    <option value="None">Type Of meeting</option>
    <option value="Consultation">Consultation</option>
    <option value="Extracurricular">Extracurricular</option>
    <option value="Research">Research</option>
    <option value="School">Tutoring-School</option>
    <option value="SAT/ACT">Tutoring-SAT/ACT</option>
    <option value="Olympiad">Tutoring-Olympiad</option>
  </select>
</td>
        <td className="py-2 px-4 w-1/3">
  <input
    type="text"
    placeholder="Edit Hosts"
    className="border p-2 w-full rounded-md"
    value={meetingsdata.hosts}
    onChange={(e) => setmeetingsdata({ ...meetingsdata, hosts: e.target.value })}
  />
</td>
<td className="py-2 px-4 text-right">
<div className="flex justify-end mt-4">
  <button
    onClick={addMeeting}
    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
  >
    Add Meeting
  </button>
</div>

</td>


      </tr>
    </tfoot>
  </table>
      </>
      )}
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
