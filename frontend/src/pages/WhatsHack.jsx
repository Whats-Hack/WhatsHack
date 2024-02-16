import "./WhatsHack.css"
import { useState } from "react"
import NavBar from "../components/NavBar"
import About from "../components/About"

export default function WhatsHack({setLogged, setCurrentUser}) {

    return(
        <div className="whatshack_container">
            <NavBar />
            <About />
        </div>
    )
}