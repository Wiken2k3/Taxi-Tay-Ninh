import instance from "../api/api";


const fetchAllTotal = async () => {
    return await instance.get(`/api/statistics/allTotal`);

};

const fetchWeeklyStatisticsTour = async () => {
    return await instance.get(`/api/statistics/weekly-tour`);

};

const fetchWeeklyStatisticsTaxi = async () => {
    return await instance.get(`/api/statistics/weekly-taxi`);

};

const fetchMonthlyRevenue = async () => {
    return await instance.get(`/api/statistics/revenue-month`);

};

export default {
    fetchAllTotal, fetchWeeklyStatisticsTour, fetchWeeklyStatisticsTaxi, fetchMonthlyRevenue
};