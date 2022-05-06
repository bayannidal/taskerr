import { useEffect, useState } from "react";
import DarkLogo from "../img/DarkLogo.svg";
import LightLogo from "../img/LightLogo.svg";
export default function useDarkMode() {
    const [logo, setLogo] = useState(localStorage.getItem('theme') === "dark" ? DarkLogo : LightLogo)
    // const logoColor = logo === DarkLogo ? LightLogo : DarkLogo

    const theme = localStorage.getItem('theme')
    useEffect(() => {
        const image = document.getElementById('logo');
        if (logo === DarkLogo) {
            setLogo(LightLogo)
        }
        if (logo === LightLogo) {
            setLogo(DarkLogo)
        }
        image.src = logo

    }, [theme])
    return [logo, setLogo]
}