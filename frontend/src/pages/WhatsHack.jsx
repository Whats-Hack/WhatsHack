import "./WhatsHack.css"
import { useState } from "react"
import NavBar from "../components/NavBar"
import About from "../components/About"

export default function WhatsHack({children, setLogged, setCurrentUser}) {

    return(
        <div className="whatshack_container">
            <NavBar setLogged={setLogged} setCurrentUser={setCurrentUser} />
            {children}
        </div>
    )
}