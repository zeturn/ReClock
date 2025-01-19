import { useState, useEffect } from "react";
import Clock from "./Clock"; // 假设 Clock 组件位于同一目录下的 Clock.js 文件
import { Analytics } from "@vercel/analytics/react";
import NoSleep from "nosleep.js";

const App = () => {
    const noSleep = new NoSleep();
    const [wakeLockEnabled, setWakeLockEnabled] = useState(false); // 控制屏幕常亮状态
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

    const toggleWakeLock = () => {
        if (!wakeLockEnabled) {
            noSleep.enable(); // 保持屏幕常亮
            setWakeLockEnabled(true);
        } else {
            noSleep.disable(); // 允许屏幕熄灭
            setWakeLockEnabled(false);
        }
    };

    return (
        <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-100"} flex items-center justify-center relative`}>
            {/* 图标按钮容器 */}
            <div className="absolute top-4 right-4 flex gap-4 items-center">
                {/* 屏幕常亮图标 */}
                <button
                    onClick={toggleWakeLock}
                    className={`p-2 rounded-full transition duration-300 text-gray-500 ${
                        darkMode ? "hover:bg-gray-600" : "hover:bg-gray-200"
                    }`}
                >
                    {wakeLockEnabled ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.412 15.655 9.75 21.75l3.745-4.012M9.257 13.5H3.75l2.659-2.849m2.048-2.194L14.25 2.25 12 10.5h8.25l-4.707 5.043M8.457 8.457 3 3m5.457 5.457 7.086 7.086m0 0L21 21" />
                        </svg>
                    )}
                </button>

                {/* 暗色/明亮模式切换图标 */}
                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className={`p-2 rounded-full transition duration-300 text-gray-500 ${
                        darkMode ? "hover:bg-gray-600" : "hover:bg-gray-200"
                    }`}
                >
                    {darkMode ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Clock 组件 */}
            <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r w-full">
                <Clock />
            </div>

            <Analytics />
        </div>
    );
};

export default App;
