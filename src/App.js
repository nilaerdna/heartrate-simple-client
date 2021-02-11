import React, { useEffect, useState } from 'react';
import { IconContext } from "react-icons";
import { FaHeartbeat } from 'react-icons/fa';
import axios from 'axios';

function App() {
    const [heartRate, setHeartRate] = useState('');
    const [time, setTime] = useState('');

    const getDataFromServer = () => {
        axios
            .get('https://heartrate-server.andrealin3110.repl.co/get/1')
            .then((response) => {
                const responseJson = response['data'];
                setHeartRate(responseJson['data'][0]['hr']);
                setTime(new Date(responseJson['data'][0]['time']).toLocaleString());
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        getDataFromServer();
    }, []);

    return (
        <>
            {/* Main container */}
            <div className="h-screen relative bg-blue-500 dark:bg-gray-900 flex justify-center items-center overflow-hidden">
                <span className="animate-ping absolute h-64 w-64 rounded-full bg-white opacity-25 z-0 pulse-delay" />
                <span className="animate-ping absolute h-72 w-72 rounded-full bg-white opacity-25 z-0" />
                <div className="p-5 rounded-full bg-gradient-to-b from-white dark:from-gray-700 to-transparent flex justify-center items-center z-10">
                    {/* Background White Circle */}
                    <div className="p-5 rounded-full bg-white dark:bg-gray-600 flex justify-center items-center">
                        {/* Background Gradient Circle */}
                        <div className="p-32 rounded-full bg-gradient-to-t from-blue-200 dark:from-gray-700 to-transparent flex justify-center items-center text-center flex-col">
                            {/* Content Circle */}
                            <div className="h-1 w-1 rounded-full flex justify-center items-center text-center flex-col">
                                <div className="rounded-full flex justify-center items-center text-center flex-row space-x-1">
                                    <IconContext.Provider value={{ color: '#EF4444' }}>
                                        <FaHeartbeat />
                                    </IconContext.Provider>
                                    <p className="bpm text-gray-500 dark:text-gray-400">BPM</p>
                                </div>
                                <p className="heartRate dark:text-gray-300 text-8xl">{heartRate}</p>
                                <p className="bpm whitespace-nowrap text-gray-500 dark:text-gray-400">{time}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
