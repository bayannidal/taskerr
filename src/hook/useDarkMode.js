import { useEffect, useState } from "react";

export default function useDarkMode() {
    const [theme, setTheme] = useState(localStorage.getItem('theme') === null ? "light" : localStorage.getItem('theme'))
    const colorTheme = theme === 'dark' ? 'light' : 'dark'

    if (colorTheme === 'dark') {
        localStorage.setItem('theme', 'light')
        document
            .querySelector('meta[name="theme-color"]')
            .setAttribute("content", "#FEFFFE");
    }
    if (colorTheme === 'light') {
        localStorage.setItem('theme', 'dark')
        document
            .querySelector('meta[name="theme-color"]')
            .setAttribute("content", "#121212");
    }
    useEffect(() => {
        const root = window.document.documentElement;

        root.classList.remove(colorTheme)

        root.classList.add(theme)
    }, [theme, colorTheme])
    return [colorTheme, setTheme]
}