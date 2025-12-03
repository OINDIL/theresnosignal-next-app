"use client";

import { useThemeSelect } from "@/hooks/useThemeSelect";


type modeType = "dark mode" | "bright mode";

export function ShowThemeSelector() {
    const { setTheme } = useThemeSelect()

    function handleThemeSelector(theme: modeType) {
        if (theme === "bright mode") {
            setTheme("bright")
        } else {
            setTheme("dark");
        }
    }


    return (
        <div className="landing-page-bright border-15 border-[#B7F346] bg-black text-[#B7F346]">
            <h1 className="uppercase text-xl">Choose your vibe</h1>

            <div className="flex justify-center gap-16 w-full text-xl mt-10 h-full">
                {["dark mode", "bright mode"].map((item, i) => (
                    <button className="cursor-pointer uppercase" key={i} onClick={() => handleThemeSelector(item as modeType)}>{item}</button>
                ))}
            </div>
        </div>
    )
}