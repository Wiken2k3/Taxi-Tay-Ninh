// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer, { resetSuccess as resetUserSuccess } from './slices/userSlice';
import tourReducer, { resetSuccess as resetTourSuccess } from './slices/tourSlice';
import authReducer, { resetSuccess as resetAuthSuccess } from './slices/authSlice';
import tourBookingReducer, { resetSuccess as resetTourBookingSuccess } from './slices/tourBookingSlice';
import taxiBookingReducer, { resetSuccess as resetTaxiBookingSuccess } from './slices/taxiBookingSlice';
import carReducer, { resetSuccess as resetCarSuccess }from './slices/carSlice';
import contactReducer, { resetSuccess as resetContactSuccess } from './slices/contactSlice';
import paymentReducer, { resetSuccess as resetPaymentSuccess } from './slices/paymentSlice';
import commentReducer, { resetSuccess as resetCommentSuccess } from './slices/commentSlice';
import newsReducer, { resetSuccess as resetNewsSuccess } from './slices/newsSlice';
import statisticsReducer, { resetSuccess as resetStatisticsSuccess } from './slices/statisticsSlice';

const resetSuccessMiddleware = store => next => action => {
    const result = next(action);
    if (action.type.endsWith('/fulfilled')) {
        setTimeout(() => {
            if (action.type.startsWith('users/')) {
                store.dispatch(resetUserSuccess());
            } else if (action.type.startsWith('tours/')) {
                store.dispatch(resetTourSuccess());
            } else if (action.type.startsWith('auth/')) {
                store.dispatch(resetAuthSuccess());
            }
            else if (action.type.startsWith('tourbooking/')) {
                store.dispatch(resetTourBookingSuccess());
            }
            else if (action.type.startsWith('taxibooking/')) {
                store.dispatch(resetTaxiBookingSuccess());
            }
            else if (action.type.startsWith('cars/')) {
                store.dispatch(resetCarSuccess());
            }
            else if (action.type.startsWith('contact/')) {
                store.dispatch(resetContactSuccess());
            }
            else if (action.type.startsWith('payment/')) {
                store.dispatch(resetPaymentSuccess());
            }
            else if (action.type.startsWith('comment/')) {
                store.dispatch(resetCommentSuccess());
            }
            else if (action.type.startsWith('news/')) {
                store.dispatch(resetNewsSuccess());
            }
            else if (action.type.startsWith('statistics/')) {
                store.dispatch(resetStatisticsSuccess());
            }
            
            
            
        }, 0);
    }
    return result;
};

const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer ,
        tour: tourReducer,
        tourBooking: tourBookingReducer,
        taxiBooking: taxiBookingReducer,
        car: carReducer,
        contact: contactReducer,
        payment: paymentReducer,
        comment: commentReducer,
        news: newsReducer,
        statistics: statisticsReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(resetSuccessMiddleware),

});

export default store;
