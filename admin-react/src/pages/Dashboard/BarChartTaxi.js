import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { fetchWeekTaxi } from '../../redux/slices/statisticsSlice';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

const BarChartTaxi = () => {
    const dispatch = useDispatch();
    const { listWeekTaxi, isLoading, isError, errorMessage } = useSelector(state => state.statistics);

    useEffect(() => {
        dispatch(fetchWeekTaxi());
    }, [dispatch]);

    if (isLoading) {
        return <LoadingSpinner/>
    }

    if (isError) {
        return <div>Error: {errorMessage}</div>;
    }

    if (!isLoading && listWeekTaxi.length === 0) {
        return <div>No data available for the week.</div>;
    }

    return (
        <div className='chart'>
            <div className='header'>
                <h4>Tình trạng đơn Taxi</h4>
            </div>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart
                    barSize={20}
                    data={listWeekTaxi}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" vertical={true} stroke="#ddd" />
                    <XAxis dataKey="date"
                        axisLine={true}
                        tick={{ fill: "black" }}
                        tickLine={true}
                        tickMargin={10}
                    />
                    <YAxis
                        axisLine={true}
                        tick={{ fill: "black" }}
                        tickLine={true}
                        tickMargin={20}
                        label={{ value: 'Số đơn', angle: -90, position: 'insideLeft' }} // Thêm label nếu cần
                    />
                    <Tooltip />
                    <Legend align='center' verticalAlign='top' wrapperStyle={{ paddingTop: "10px", paddingBottom: "30px" }} />
                    <Bar dataKey="pending" fill="#f0ad4e" legendType='circle' name="Chờ Duyệt" />
                    <Bar dataKey="approved" fill="#4caf50" legendType='circle' name="Thành Công" />
                    <Bar dataKey="rejected" fill="#d9534f" legendType='circle' name="Huỷ Đơn" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default BarChartTaxi;
