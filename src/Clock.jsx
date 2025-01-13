import { useState, useEffect } from "react";

const Clock = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <div
            className="w-11/12 md:w-3/4 lg:w-2/3 p-8 bg-white dark:bg-gray-800 shadow-xl rounded-lg flex justify-center">
            <div className="text-left p-4">
                <h1 className="text-3xl md:text-3xl font-extrabold text-gray-500 dark:text-gray-300 mb-6">
                    当前时间
                </h1>
                <h2 className="text-5xl md:text-9xl font-semibold font-mono text-indigo-700 dark:text-indigo-300">
                    {time.toLocaleTimeString()}
                </h2>
            </div>
        </div>


    );
};

export default Clock;
