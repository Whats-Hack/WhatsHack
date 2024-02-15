import "./Login.css";
import { useState } from "react";

export default function Login({setShowLoginPage}) {
    const [errorMessage, setErrorMessage] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        !username.length || !password.length ? setErrorMessage("Username and password are required") : null;
    }
    return (<>
        <div className="login-container">
            <h2>Login :</h2>
            <p className="small">You don't have a account ? Click <a onClick={() => setShowLoginPage(false)}>here</a> to create one</p>
            <div className="login-input-container">
                <form onSubmit={handleSubmit}>
                    <span>Username: <input type="text" name="username" value={username} onChange={e => setUsername(e.target.value)} /></span>
                    <span>Password: <input type="password" name="username" value={password} onChange={e => setPassword(e.target.value)} /></span>
                    <button type="submit">CONNECT</button>
                </form>
            </div>
            <p className="error">{errorMessage}</p>
        </div>
    </>
    )
}