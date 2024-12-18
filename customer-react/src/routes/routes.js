import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import BooKing from "../pages/Booking/Booking";
import Contact from "../pages/Contact/Contact";
import SignUp from "../pages/Auth/SignUp/SignUp";
import PaymentCallBack from "../pages/Payment/PaymentCallBack";
import News from "../pages/News/News";
import History from "../pages/History/History";
import Login from "../pages/Auth/Login/Login";
import NewsDetail from "../pages/News/NewsDetail";
import Tour from "../pages/Product/Tour/Tour";
import Profile from "../pages/Auth/Profile/Profile";
import SendOtpPassword from "../pages/Auth/Forgotpassword/SendOtpPassword";
import ConfirmOtp from "../pages/Auth/Forgotpassword/ConfirmOtp";
import ConfirmPassword from "../pages/Auth/Forgotpassword/ConfirmPassword";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import { fetchCurrentUser } from "../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";

const AppRoutes = () => {
    const dispatch = useDispatch();
    const { isLoggedIn } = useSelector(state => state.auth);
    const [isFetching, setIsFetching] = useState(true);

    // Callback để xử lý dữ liệu sau khi fetch xong
    // const handleFetchData = async () => {
    //     try {
    //         await dispatch(fetchCurrentUser()).unwrap();
    //     } catch (error) {
            
    //     } finally {
    //         // Cập nhật trạng thái khi dữ liệu đã được lấy xong
    //         setIsFetching(false);   
    //     }
    // };

    // useEffect(() => {
    //     handleFetchData();
    // }, [dispatch]);

    // if (isFetching) {
    //     return <LoadingSpinner />;
    // }


    const handleFetchData = useCallback(async () => {
        try {
            await dispatch(fetchCurrentUser()).unwrap();
        } catch (error) {
            // Xử lý lỗi nếu cần
        } finally {
            // Cập nhật trạng thái khi dữ liệu đã được lấy xong
            setIsFetching(false);
        }
    }, [dispatch]);

    useEffect(() => {
        handleFetchData();
    }, [handleFetchData]);

    if (isFetching) {
        return <LoadingSpinner />;
    }


    return (    
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/booking" element={<BooKing />} />
            <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login />} />
            <Route path="/signup" element={isLoggedIn ? <Navigate to="/" /> : <SignUp />} />
            <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/" />} />
            <Route path="/forgotpassword" element={isLoggedIn ? <Navigate to="/" /> : <SendOtpPassword />} />
            <Route path="/forgotpassword/send_otp" element={isLoggedIn ? <Navigate to="/" /> : <ConfirmOtp />} />
            <Route path="/forgotpassword/reset" element={isLoggedIn ? <Navigate to="/" /> : <ConfirmPassword />} />
            <Route path="/vnpay_return" element={<PaymentCallBack />} />
            <Route path="/history" element={isLoggedIn ? <History /> : <Navigate to="/" />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/tour" element={<Tour />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/:id" element={<NewsDetail />} />
        </Routes>
    );
};
export default AppRoutes;
