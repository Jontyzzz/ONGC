import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import Navbar from '../Navbar/Navbar';
import 'chartjs-plugin-zoom';
import { grey } from '@mui/material/colors';
import { format, parseISO } from 'date-fns';

function Temperature_works() {
    const [chartData, setChartData] = useState([]);
    const [socket, setSocket] = useState(null);
    const [timeGranularity, setTimeGranularity] = useState('hour');
    const [loading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const dateValue = useSelector((state) => state.dateManager.value);
    const [visibleRange, setVisibleRange] = useState({ min: 0, max: 11 });
    const [lineColors, setLineColors] = useState({});

    useEffect(() => {
        const token = localStorage.getItem('token');

        const fetchData = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await axios.get('/api/fetchData?date=' + dateValue, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const initialLineColors = {};
                for (let i = 1; i <= 7; i++) {
                    const label = `TT${i}`;
                    initialLineColors[label] = getRandomColor();
                }

                setLineColors(initialLineColors);
                setChartData(response.data);
                setIsLoading(false);
            } catch (err) {
                setError('Error fetching data. Please try again.');
                setIsLoading(false);
            }
        };

        const initializeSocket = () => {
            const socket = io();

            socket.on('connect', () => {
                console.log('Socket connected');
            });

            socket.on('message', (data) => {
                console.log('Received message:', data);
                fetchData(); // Refetch data on socket message
            });

            socket.on('disconnect', () => {
                console.log('Socket disconnected');
            });

            setSocket(socket);
        };

        initializeSocket();
        fetchData();

        return () => {
            socket && socket.close();
        };
    }, [dateValue]);

    const generateDatasets = () => {
        if (!chartData || chartData.length === 0) {
            return [];
        }

        const datasets = [];

        for (let i = 1; i <= 7; i++) {
            const label = `TT${i}`;
            const data = chartData.slice(visibleRange.min, visibleRange.max + 1).map((entry) => entry[label]);
            const color = lineColors[label];

            datasets.push({
                label: label,
                data: data,
                borderColor: color,
                backgroundColor: color,
                hoverOffset: 3,
            });
        }

        return datasets;
    };

    // const generateTimeLabels = () => {
    //     if (!chartData || chartData.length === 0) {
    //         return [];
    //     }

    //     const timeLabels = [];
    // const step = timeGranularity === 'hour' ? 1 : 0.5;

    // for (let hour = 0; hour < 24; hour += step) {
    //     const formattedHour = hour < 10 ? `0${hour}` : hour;
    //     timeLabels.push(`${formattedHour}:00`);
    // }

    // return timeLabels;
    //     for (let i = 0; i < chartData.length; i++) {
    //         const timestamp = chartData[i].timestamp; // Assuming timestamp is in minutes
    //         const hour = Math.floor(timestamp / 60);
    //         const minute = timestamp % 60;

    //         const formattedHour = hour < 10 ? `0${hour}` : hour;
    //         const formattedMinute = minute < 10 ? `0${minute}` : minute;

    //         timeLabels.push(`${formattedHour}:${formattedMinute}`);
    //     }

    //     return timeLabels;
    // };


    const generateTimeLabels = () => {
        if (!chartData || chartData.length === 0) {
            return [];
        }
    
        const timeLabels = chartData.slice(visibleRange.min, visibleRange.max + 1).map((entry) => {
            const dateTimeString = entry.DateTime;
    
            if (!dateTimeString) {
                return '';
            }
    
            try {
                const date = parseISO(dateTimeString); // Parse the datetime string
                const formattedTime = format(date, 'HH:mm'); // Format the time part
    
                return formattedTime;
            } catch (error) {
                console.error(`Error parsing datetime: ${dateTimeString}`, error);
                return ''; // Handle parsing errors
            }
        });
    
        return timeLabels;
    };
    //   const handleWheelScroll = (e) => {
    //     const dataLength = chartData.length;
    //     const { min, max } = visibleRange;

    //     if (e.deltaY > 0) {
    //       if (max < dataLength - 1) {
    //         setVisibleRange((prevRange) => ({ min: prevRange.min + 1, max: prevRange.max + 1 }));
    //       }
    //     } else if (e.deltaY < 0) {
    //       if (min > 0) {
    //         setVisibleRange((prevRange) => ({ min: prevRange.min - 1, max: prevRange.max - 1 }));
    //       }
    //     }
    //   };

    const handleScrollUp = () => {
        const { min, max } = visibleRange;
        const dataLength = chartData.length;

        if (max < dataLength - 1) {
            setVisibleRange((prevRange) => ({ min: prevRange.min + 1, max: prevRange.max + 1 }));
        }
    };

    const handleScrollDown = () => {
        const { min, max } = visibleRange;

        if (min > 0) {
            setVisibleRange((prevRange) => ({ min: prevRange.min - 1, max: prevRange.max - 1 }));
        }
    };
    const getRandomColor = () => {
        return '#' + Math.floor(Math.random() * 16777215).toString(16);
    };

    const handleToggleGranularity = () => {
        setTimeGranularity((prevGranularity) =>
            prevGranularity === 'hour' ? 'minute' : 'hour'
        );
    };
    return (
        <div className='BGTemp'>
            <Navbar />
            <div className="container-fluid ">
                <div>
                    <div className="col-md-10 mb-4 mt-4 ml-4 Tempp" style={{ overflowX: 'auto' }}>
                        {loading && <p>Loading...</p>}
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <button onClick={handleScrollUp} className="buttonDecorative" style={{ marginRight: '8px', backgroundColor: 'grey', color: 'black' }}>
                                {'<<'}
                            </button>
                            <button onClick={handleScrollDown} className="buttonDecorative" style={{ backgroundColor: 'grey', color: 'black' }}>
                                {'>>'}
                            </button>
                        </div>
                        <div>
                            <Line
                                data={{
                                    labels: generateTimeLabels(),
                                    datasets: generateDatasets(),
                                }}
                                options={{
                                    responsive: true,
                                    plugins: {
                                        legend: {},
                                        title: {
                                            display: true,
                                            text: `TT1 TO TT7 Parameters - ${timeGranularity.toUpperCase()} wise`,
                                            font: { size: 25, color: 'rgba(0, 0, 0, 1)' },
                                        },
                                        zoom: {
                                            pan: {
                                                enabled: true,
                                                mode: 'x',
                                            },
                                            zoom: {
                                                pinch: {
                                                    enabled: false, // Disable pinch zoom
                                                },
                                                wheel: {
                                                    enabled: true,
                                                },
                                                mode: 'x',
                                                sensitivity: 0.5,
                                            },
                                        },
                                    },
                                    scales: {
                                        x: {
                                            position: 'bottom',
                                            min: visibleRange.min,
                                            max: visibleRange.max,
                                            grid: {
                                                display: true,
                                            },
                                            title: {
                                                display: true,
                                                text: 'Data According to Time',
                                                font: { size: 20, color: 'rgba(0, 0, 0, 1)' },
                                            },
                                            // Enable scrollbar
                                            scrollbar: {
                                                enabled: true,
                                                mode: 'x',
                                            },
                                        },
                                        y: {
                                            beginAtZero: true,
                                            grid: {
                                                display: true,
                                            },
                                            title: {
                                                display: true,
                                                text: 'Data in Range',
                                                font: { size: 20, color: 'rgba(0, 0, 0, 1)' },
                                            },
                                        },
                                    },
                                }}
                            />
                        </div>
                        <button onClick={handleToggleGranularity} className="buttonDecorative">
                            Minutes OR Hours
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Temperature_works;
