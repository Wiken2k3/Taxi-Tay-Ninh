import React from "react";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {  logoutUser } from "../redux/slices/authSlice"; // Thay đổi đường dẫn đến action logout của bạn

const ProtectedRoute = ({ element, allowedRoles, currentUser }) => {
    const dispatch = useDispatch();

    if (!currentUser || !allowedRoles.includes(currentUser.role)) {
        // Xóa dữ liệu đăng nhập
        dispatch(logoutUser());

        // Chuyển hướng người dùng đến trang đăng nhập
        return <Navigate to="/login" />;
    }

    return element;
};

export default ProtectedRoute;
