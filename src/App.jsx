import React, { useState, useEffect } from "react";

import Task from "./components/Task";
import Nav from "./components/Nav";
import LeftSideBar from "./components/LeftSideBar";
import Signup from "./auth/Signup";
import Login from "./auth/Login";
import AddTask from "./components/AddTask";
import Completed from "./components/Completed";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState("");
  const [isLeftOpen, setIsLeftOpen] = useState(false); // Sidebar state

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      setUser(loggedInUser);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setUser("");
    setIsLoggedIn(false);
  };

  return (
    <>
      <Nav isLeftOpen={isLeftOpen} setIsLeftOpen={setIsLeftOpen} />
     
        {isLoggedIn && isLeftOpen && (
          <LeftSideBar user={user} handleLogout={handleLogout} setIsLeftOpen={setIsLeftOpen} />
        )}
       
          {!isLoggedIn ? (
            <div className="flex justify-center items-center gap-2 mt-10">
              <Signup setIsLoggedIn={setIsLoggedIn} setUser={setUser} />
              <h1 className="text-xl font-bold">Join to track your task</h1>
              <Login setIsLoggedIn={setIsLoggedIn} setUser={setUser} />
            </div>
          ) : (
            <>
            <AddTask/>
            <Task user={user} />
             <Completed/>
            </> 
          )}
       
      
    </>
  );
};

export default App;
