import React, { useEffect, useState, useRef } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";


import "./App.css";
import 'react-toastify/dist/ReactToastify.css';
import AppRoutes from "./routes/routes";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser } from "./redux/slices/authSlice";
import Login from "./pages/Auth/Login";
import ToastConfig from "./config/toastConfig";
import AppNavbar from "./components/Header/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";






const  App =() => {
  const [toggle, setToggle] = useState(false);
  const sidebarRef = useRef(null);
  const dispatch = useDispatch();
  const { isLoggedIn, isLoading, currentUser } = useSelector(state => state.auth);

  useEffect(()=>{
    dispatch(fetchCurrentUser())
  },[dispatch])
  
  const Toggle = () => {

    setToggle(!toggle); 
  };

  useEffect(() => {
    const handleSize = () => {
      if (window.innerWidth > 768) {
        setToggle(false);
      } else {
        setToggle(true);
      }
    };

    const handleClickOutside = (event) => {
      if (window.innerWidth <= 768) {
  
        if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
          setToggle(true);
        }
      }
    };

    window.addEventListener("resize", handleSize);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("resize", handleSize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);



  return (
    <Router basename="/admin">
      <ToastConfig />
      {!isLoggedIn ? (
        <Login />
      ) : (
        <>
          <AppNavbar Toggle={Toggle} />
          <div ref={sidebarRef} className={`sidebar ${toggle ? "d-none" : "w-auto position-fixed"}`}>
            <Sidebar />
          </div>
          <div className="content">
            <AppRoutes Toggle={Toggle} setToggle={setToggle} currentUser={currentUser} />
          </div>
        </>
      )}
    </Router>
  );


}
export default App;
