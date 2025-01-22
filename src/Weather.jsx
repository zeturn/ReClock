import { useState, useEffect } from "react";
//import "/weather-icons/css/weather-icons.css"; // 引入 Weather Icons 样式表，使用@weather-icons/css包

const Weather = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY_1;
    const CITY = "Davis, CA, US"; // 替换为你的城市名称

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const response = await fetch(`/api/weather?CITY=${CITY}`);
                if (!response.ok) throw new Error("无法获取天气数据");
                const data = await response.json();
                setWeatherData(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchWeatherData();
    }, [CITY]);

    if (loading) return <div className="text-center text-lg">加载中...</div>;
    if (error) return <div className="text-center text-lg text-red-500">错误: {error}</div>;

    const { main, weather, sys, wind } = weatherData;
    const temperature = main.temp;
    const humidity = main.humidity;
    const description = weather[0].description;
    const sunrise = new Date(sys.sunrise * 1000).toLocaleTimeString();
    const sunset = new Date(sys.sunset * 1000).toLocaleTimeString();
    const windSpeed = wind.speed;

    const getWeatherIcon = (iconCode) => `wi wi-owm-${iconCode}`;

    return (

    <div className="max-w-4xl mx-auto m-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg flex items-center">
    <div className="flex-shrink-0 mr-6">
                <i className={`${getWeatherIcon(weather[0].id)} text-8xl text-blue-500`}></i>
            </div>
            <div className="flex-grow">
                <h1 className="text-2xl font-bold mb-4 text-gray-700 dark:text-gray-300 text-left">
                    Davis实况
                </h1>
                <div className="grid grid-cols-2 gap-4 text-left">
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">温度</p>
                        <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{temperature}°C</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">湿度</p>
                        <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{humidity}%</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">日出时间</p>
                        <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{sunrise}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">日落时间</p>
                        <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{sunset}</p>
                    </div>
                    <div className="col-span-2">
                        <p className="text-sm text-gray-500 dark:text-gray-400">风速</p>
                        <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{windSpeed} m/s</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Weather;
