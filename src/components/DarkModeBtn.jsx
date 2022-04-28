import React from "react";
import MoonOutline from "@heroicons/react/solid/MoonIcon";
import SunOutline from "@heroicons/react/solid/SunIcon";
import useDarkMode from "../hook/useDarkMode";

export const DarkModeBtn = () => {
  const [colorTheme, setTheme] = useDarkMode();

  return (
    <button
      className="fixed bottom-4 left-4 font-bold"
      onClick={() => setTheme(colorTheme)}
    >
      {colorTheme === "light" ? (
        <SunOutline className="h-7 md:h-10 text-dPrimary dark:text-third " />
      ) : (
        <MoonOutline className="h-7 md:h-10 text-dPrimary dark:text-third" />
      )}
    </button>
  );
};
