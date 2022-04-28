import React from "react";
import MoonOutline from "@heroicons/react/solid/MoonIcon";
import SunOutline from "@heroicons/react/solid/SunIcon";
import useDarkMode from "../../hook/useDarkMode";
import { useSelector } from "react-redux";

export const DarkModeBtn = () => {
  const [colorTheme, setTheme] = useDarkMode();
  const { user } = useSelector((state) => state.auth);
  return (
    <button
      className={`hidden bottom-4 left-4 font-bold`}
      onClick={() => setTheme(colorTheme)}
    >
      {colorTheme === "light" ? (
        <SunOutline className="h-7 md:h-10 text-purple-500 " />
      ) : (
        <MoonOutline className="h-7 md:h-10 text-dPrimary" />
      )}
    </button>
  );
};
