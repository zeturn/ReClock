// api/weather.js

export default async function handler(req, res) {
    const { CITY } = req.query;

    if (!CITY) {
        return res.status(400).json({ error: "City is required" });
    }

    const API_KEY = process.env.WEATHER_API_KEY_1;
    //const url = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${apiKey}`;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric&lang=zh_cn`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`OpenWeatherMap API error: ${response.statusText}`);
        }

        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to fetch weather data" });
    }
}
