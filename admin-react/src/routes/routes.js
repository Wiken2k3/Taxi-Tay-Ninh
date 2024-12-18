// src/router/AppRoutes.js

import React from 'react';
import { Routes, Route } from 'react-router-dom';



import Tour from '../pages/Tour/Tour';
import User from '../pages/User/User';
import Home from '../pages/Dashboard/Home';
import TourBooking from '../pages/TourBooking/TourBooking';
import TaxiBooking from '../pages/TaxiBooking/TaxiBooking';

import ProtectedRoute from './ProtectedRoute';
import { userRole } from '../enums/userRole.enum';
import Contact from '../pages/Contact/Contact';
import Payment from '../pages/Payment/Payment';
import Comment from '../pages/Comment/Comment';
import News from '../pages/News/News';
import Car from '../pages/Car/Car';





const AppRoutes = ({ Toggle, setToggle, currentUser }) => {
  return (
    <Routes>
      
      <Route
        path="/"
        element={
          <ProtectedRoute
            element={<Home Toggle={Toggle} setToggle={setToggle} />}
            allowedRoles={[userRole.ADMIN,userRole.STAFF]} // Allow all roles for Home
            currentUser={currentUser}
          />
        }
      />
      <Route
        path="/users"
        element={
          <ProtectedRoute
            element={<User Toggle={Toggle} setToggle={setToggle} />}
            allowedRoles={[userRole.ADMIN, userRole.STAFF]}
            currentUser={currentUser}
          />
        }
      />
      <Route
        path="/tours"
        element={
          <ProtectedRoute
            element={<Tour Toggle={Toggle} setToggle={setToggle} />}
            allowedRoles={[userRole.ADMIN, userRole.STAFF]}
            currentUser={currentUser}
          />
        }
      />
      <Route
        path="/taxibooking"
        element={
          <ProtectedRoute
            element={<TaxiBooking Toggle={Toggle} setToggle={setToggle} />}
            allowedRoles={[userRole.ADMIN, userRole.STAFF]}
            currentUser={currentUser}
          />
        }
      />
      <Route
        path="/tourbooking"
        element={
          <ProtectedRoute
            element={<TourBooking Toggle={Toggle} setToggle={setToggle} />}
            allowedRoles={[userRole.ADMIN, userRole.STAFF]}
            currentUser={currentUser}
          />
        }
      />
      <Route
        path="/car"
        element={
          <ProtectedRoute
            element={<Car Toggle={Toggle} setToggle={setToggle} />}
            allowedRoles={[userRole.ADMIN]}
            currentUser={currentUser}
          />
        }
      />
      <Route
        path="/payment"
        element={
          <ProtectedRoute
            element={<Payment Toggle={Toggle} setToggle={setToggle} />}
            allowedRoles={[userRole.ADMIN]}
            currentUser={currentUser}
          />
        }
      />
      <Route
        path="/news"
        element={
          <ProtectedRoute
            element={<News Toggle={Toggle} setToggle={setToggle} />}
            allowedRoles={[userRole.ADMIN]}
            currentUser={currentUser}
          />
        }
      />
      <Route
        path="/comment"
        element={
          <ProtectedRoute
            element={<Comment Toggle={Toggle} setToggle={setToggle} />}
            allowedRoles={[userRole.ADMIN]}
            currentUser={currentUser}
          />
        }
      />
      <Route
        path="/contact"
        element={
          <ProtectedRoute
            element={<Contact Toggle={Toggle} setToggle={setToggle} />}
            allowedRoles={[userRole.ADMIN]}
            currentUser={currentUser}
          />
        }
      />
      
    </Routes>
  );
};

export default AppRoutes;

