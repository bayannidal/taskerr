import React from "react";
import MoonOutline from "@heroicons/react/solid/MoonIcon";
import SunOutline from "@heroicons/react/solid/SunIcon";
import useDarkMode from "../../hook/useDarkMode";

export const DarkModeBtn = () => {
  const [colorTheme, setTheme] = useDarkMode();
  return (
    <button
      className={` hidden  font-bold`}
      onClick={() => setTheme(colorTheme)}
    >
      {colorTheme === "light" ? (
        <SunOutline className="h-7 md:h-10 text-third " />
      ) : (
        <MoonOutline className="h-7 md:h-10 text-dPrimary" />
      )}
    </button>
  );
};
