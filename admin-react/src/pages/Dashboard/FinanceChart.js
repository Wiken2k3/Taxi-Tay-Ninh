import React, { PureComponent, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Chart.css'

import { useDispatch, useSelector } from 'react-redux';
import { fetchRevenue } from '../../redux/slices/statisticsSlice';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';



const FinanceChart = () => {
    const dispatch = useDispatch();
    const { listRevenue, isLoading, isError, isSuccess, errorMessage, actionType } = useSelector(state => state.statistics);

    useEffect(() => {
        dispatch(fetchRevenue())
    }, [dispatch]);

    if (isLoading) {
        return <LoadingSpinner />
    }
    if (isError) {
        return <div>Error: {errorMessage}</div>;
    }

    return (

            <div className='chart'>
                <div className='header'>
                    <h4>Doanh thu</h4>
                </div>
           
            <ResponsiveContainer width="100%" height={400} style={{
                
            }}>
                <LineChart
    
                    data={listRevenue}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 70,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                        dataKey="month" 
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
                    />
                    <Tooltip />
                    <Legend align='center' verticalAlign='top' wrapperStyle={{ paddingTop: "10px", paddingBottom: "30px" }} />
                    <Line type="monotone" dataKey="taxibooking" stroke="#8884d8" activeDot={{ r: 8 }} name='Taxi Booking' strokeWidth={5} />
                    <Line type="monotone" dataKey="tourbooking" stroke="#82ca9d" name='Tour Booking' strokeWidth={5} />
                </LineChart>
            </ResponsiveContainer>
            </div>
        );
    }

export default FinanceChart;