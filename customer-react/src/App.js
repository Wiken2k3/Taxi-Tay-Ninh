import "./App.css";
import NavBar from "./components/Header/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser } from "./redux/slices/authSlice";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import AppRoutes from "./routes/routes";
import ToastConfig from "./config/toastConfig"


const App =()=> {

  return (
    <>
    <Router>
      <div className="App">
        <NavBar />
        <AppRoutes/>
      </div>
      <Footer/>
    </Router>
    <ToastConfig />
    </>
  );
}

export default App;
