import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import React, { useState, useEffect, createContext } from "react";
import NavBar from "./NavBar";
import Home from "./Home";
import FindStudents from "./FindStudents";
import Students from "./Students";
import AssignWork from "./AssignWork";
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import Profile from "./Profile";
import StudentAssignments from "./StudentAssignments";

export const UserContext = createContext();

function App() {
  const [errors, setErrors] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [students, setStudents] = useState([]);
  const [avatar, setAvatar] = useState(null);

  const navigate = useNavigate();

  // fetch current user if exists
  useEffect(() => {
    fetch("/me").then((resp) => {
      if (resp.ok) {
        resp.json().then((user) => {
          setCurrentUser(user);
          if (user.type === "Tutor") {
            // new hash map to get unique students
            let studentsList = [
              ...new Map(
                user.students.map((student) => [student["id"], student])
              ).values(),
            ];
            setStudents(studentsList);
            setErrors([]);
          } else {
            // let tutorsList = [
            //   ...new Map(
            //     user.tutors.map((tutor) => [tutor["id"], tutor])
            //   ).values(),
            // ];
            setErrors([]);
          }
          setAvatar(user.image_url);
        });
      } else {
        resp.json().then((error) => setErrors(error));
      }
    });
  }, []);

  // log out current user and reset state
  function handleLogOut() {
    fetch("/logout", {
      method: "DELETE",
    });
    setCurrentUser({});
    setStudents([]);
    navigate("/");
  }

  return (
    <div className='App'>
      <UserContext.Provider
        value={{
          currentUser,
          setCurrentUser,
          students,
          setStudents,
          avatar,
          setAvatar,
          handleLogOut,
          setErrors,
        }}
      >
        <NavBar />
        <div>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/students' element={<Students />} />
            <Route path='/assignwork' element={<AssignWork />} />
            <Route path='/findstudents' element={<FindStudents />} />
            <Route path='/assignments' element={<StudentAssignments />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/login' element={<LogIn />} />
            <Route
              path='*'
              element={
                <>
                  <h1>404 path not found</h1>
                </>
              }
            />
          </Routes>
        </div>
      </UserContext.Provider>
    </div>
  );
}

export default App;
