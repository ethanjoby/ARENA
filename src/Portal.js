import React, { useState, useEffect } from "react";
import { getFirestore, getDocs, deleteDoc, query, where, orderBy, getDoc } from "firebase/firestore";
import { doc, updateDoc } from 'firebase/firestore';
import { addDoc, collection } from 'firebase/firestore';
import { app } from "./firebase";
import { Trash2, Edit } from "lucide-react";

const Portal = () => {
    const [inputemail, setinputemail] = useState("");
    const [loggedin, isloggedin] = useState(false);
    const [meetings, setmeetings] = useState([]);
    const [username, setusername] = useState("");
    const [useremail, setuseremail] = useState("");
    const [error, setError] = useState("");
    
    const getData = async (email) => {

        try {
            const db = getFirestore(app);
            const meetingref = query(collection(db, "meetings"), where("email", "==", email)); 
            
            let middle = []; 
    
            const usermeetings = await getDocs(meetingref); 
            
            if(!usermeetings.empty){
                usermeetings.forEach((doc) => {
                    middle.push(doc.data()); 
                }); 

                setmeetings(middle); 
            } else {
                console.log("no meetings found of you lmafoasosoao"); 
                setmeetings([]); 
            }
    
        } catch (error) {
            console.error("Error fetching user data:", error);
            setError("Failed to fetch meetings");
        }
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const db = getFirestore(app);
            const selectuser = query(
                collection(db, "arenaSignUps"),
                where("email", "==", inputemail)
            );
            const selectuserdoc = await getDocs(selectuser);
            
            console.log("selectuserdoc:", selectuserdoc);
            
            if (!selectuserdoc.empty) {
                const doc = selectuserdoc.docs[0];
                const userData = doc.data();
                
                console.log("userData:", userData);
                
                isloggedin(true);
                localStorage.setItem('userLoggedIn', 'true');
                setusername(userData.name);
                setuseremail(userData.email);
                await getData(userData.email);
            } else {
                setError("User not found");
            }
        } catch (error) {
            console.error("Error during login:", error);
            setError("An error occurred");
        }
    };

    const [requestMeeting, setRequestMeeting] = useState({
        name: "",
        email: "",
        purpose: "",
        comments: "",
        date: "",
        time: "",
    });

    return (
        <div className="w-screen h-screen">
            {loggedin ? (
                <div className="flex justify-center items-center w-full h-full">
                    <nav className="absolute top-0 left-0 w-screen h-14 border-b border-b-gray-400 flex items-center px-4 gap-4">
                        <li className="list-none">Account: <strong>{username}</strong></li>
                        <li className="list-none">Email: <strong>{useremail}</strong></li>
                    </nav>
                    <div className="fixed right-4 top-16 w-1/2 h-[calc(100vh-5rem)] overflow-auto rounded-lg bg-white shadow-sm border border-gray-200">
        <table className="w-full">
          <thead className="sticky top-0 bg-white shadow-sm">
            <tr>
              <th className="py-3 px-4 text-left font-medium text-gray-700 border-b">Name</th>
              <th className="py-3 px-4 text-left font-medium text-gray-700 border-b">Email</th>
              <th className="py-3 px-4 text-left font-medium text-gray-700 border-b">Date</th>
              <th className="py-3 px-4 text-left font-medium text-gray-700 border-b">Link</th>
              <th className="py-3 px-4 text-left font-medium text-gray-700 border-b">Purpose</th>
              <th className="py-3 px-4 text-left font-medium text-gray-700 border-b">Hosts</th>
            </tr>
          </thead>
          <tbody>
            {meetings.map((meeting, index) => (
              <tr 
                key={index}
                className={`
                  hover:bg-gray-50 transition-colors
                  ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                `}
              >
                <td className="py-3 px-4 border-b border-gray-100">{meeting.name}</td>
                <td className="py-3 px-4 border-b border-gray-100">{meeting.email}</td>
                <td className="py-3 px-4 border-b border-gray-100">{meeting.date.toDate().toLocaleString()}</td>
                <td className="py-3 px-4 border-b border-gray-100">
                  <a href={meeting.link} className="text-blue-600 hover:text-blue-800 hover:underline">
                    {meeting.link}
                  </a>
                </td>
                <td className="py-3 px-4 border-b border-gray-100">{meeting.meetingType}</td>
                <td className="py-3 px-4 border-b border-gray-100">{meeting.hosts}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
                </div>
            ) : (
                <div className="flex justify-center items-center w-full h-full">
                    <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-lg w-96">
                        <h2 className="text-2xl font-bold mb-4">User Login</h2>
                        <input
                            type="email"
                            placeholder="email@gmail.com"
                            value={inputemail}
                            onChange={(e) => setinputemail(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mb-4"
                        />
                        {error && <p className="text-red-500 mb-4">{error}</p>}
                        <button type="submit" className="w-full py-2 bg-black text-white rounded hover:bg-gray-800">
                            Login
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Portal;