    // src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer, { resetSuccess as resetAuthSuccess } from './slices/authSlice';
import tourReducer, { resetSuccess as resetTourSuccess } from './slices/tourSlice';
import carReducer, { resetSuccess as resetCarSuccess } from './slices/carSlice';
import tourBookingReducer, { resetSuccess as resetTourBookingSuccess } from './slices/tourBookingSlice';
import commentReducer, { resetSuccess as resetCommentSuccess } from './slices/commentSlice';
import taxiBookingReducer, { resetSuccess as resetTaxiBookingSuccess } from './slices/taxiBookingSlice';
import newsReducer, { resetSuccess as resetNewsSuccess } from './slices/newsSlice';
import mapReducer from './slices/mapSlice';



const resetSuccessMiddleware = store => next => action => {
    const result = next(action);
    if (action.type.endsWith('/fulfilled')) {

        setTimeout(() => {
            if (action.type.startsWith('auth/')) {
                store.dispatch(resetAuthSuccess());

            } else 
            if (action.type.startsWith('tour/')) {
                store.dispatch(resetTourSuccess());
            } else if (action.type.startsWith('cars/')) {
                store.dispatch(resetCarSuccess());
            } else if (action.type.startsWith('tourbooking/')) {
                store.dispatch(resetTourBookingSuccess());
            } else if (action.type.startsWith('comment/')) {
                store.dispatch(resetCommentSuccess());
            } else if (action.type.startsWith('taxibooking/')) {
                store.dispatch(resetTaxiBookingSuccess());
            }
            else if (action.type.startsWith('news/')) {
                store.dispatch(resetNewsSuccess());
            }
        }, 0);
    }
    return result;
};


    const store = configureStore({
        reducer: {
            auth: authReducer,
            tour: tourReducer,
            car: carReducer,
            tourBooking: tourBookingReducer,
            taxiBooking: taxiBookingReducer,
            comment: commentReducer,
            map: mapReducer,
            news: newsReducer

        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(resetSuccessMiddleware),


    });

    export default store;
