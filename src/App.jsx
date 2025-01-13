import { useState, useEffect } from "react";
import Clock from "./Clock"; // 假设 Clock 组件位于同一目录下的 Clock.js 文件
import { Analytics } from "@vercel/analytics/react";
import NoSleep from "nosleep.js";

const App = () => {
    const noSleep = new NoSleep();
    let wakeLockEnabled = false;

    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("theme") === "dark"
    );

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    useEffect(() => {
        const toggleEl = document.querySelector("#toggle");
        const handleToggle = () => {
            if (!wakeLockEnabled) {
                noSleep.enable(); // 保持屏幕常亮
                wakeLockEnabled = true;
                toggleEl.textContent = "屏幕常亮已开启";
                toggleEl.classList.add("bg-green-500", "hover:bg-green-600");
                toggleEl.classList.remove("bg-red-500", "hover:bg-red-600");
            } else {
                noSleep.disable(); // 允许屏幕熄灭
                wakeLockEnabled = false;
                toggleEl.textContent = "屏幕常亮已关闭";
                toggleEl.classList.add("bg-red-500", "hover:bg-red-600");
                toggleEl.classList.remove("bg-green-500", "hover:bg-green-600");
            }
        };

        toggleEl.addEventListener("click", handleToggle);

        // 清除事件监听器
        return () => {
            toggleEl.removeEventListener("click", handleToggle);
        };
    }, []);

    return (
        <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-100"} flex items-center justify-center`}>
            <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r w-full">
                <Clock />
                <button
                    id="toggle"
                    className="mt-8 px-6 py-3 text-lg font-bold text-white bg-red-500 rounded-lg shadow-lg hover:bg-red-600 transition duration-300"
                >
                    屏幕常亮已关闭
                </button>
                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="mt-4 px-6 py-3 text-lg font-bold text-white bg-blue-500 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
                >
                    切换到{darkMode ? "明亮模式" : "暗色模式"}
                </button>
            </div>
            <Analytics />
        </div>
    );
};

export default App;
