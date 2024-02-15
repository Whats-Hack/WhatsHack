import "./Welcome.css"
import Login from "../components/Login"
import Register from "../components/Register"
import { useState } from "react"

export default function Welcome() {
    const [showLoginPage, setShowLoginPage] = useState(true)

    return(<>
            <div className="bg" />
            <div className="bg bg2" />
            <div className="bg bg3" />
            <div className="container">
                <h1>WhatsHack</h1>
                <p>The most famous social network for <b>IronHackers!</b></p>
                {showLoginPage ? <Login setShowLoginPage={setShowLoginPage} /> : <Register setShowLoginPage={setShowLoginPage} />}
            </div>
        </>
    )
}