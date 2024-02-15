import "./Register.css";
import { useState } from "react";

export default function Register({setShowLoginPage}) {
    const [errorMessage, setErrorMessage] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [email, setEmail] = useState("");
    const [birtday, setBirtday] = useState("");
    const [city, setCity] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        !username.length || !password.length ? setErrorMessage("Username and password are required") : null;
    }

    return (<>
        <div className="login-container">
            <h2>Register :</h2>
            <p className="small">Already have a account ? Click <a onClick={() => setShowLoginPage(true)}>here</a> to login</p>
            <div className="login-input-container">
                <form onSubmit={handleSubmit}>
                    <span><b>Username: </b><input type="text" name="username" value={username} onChange={e => setUsername(e.target.value)} /></span>
                    <span><b>Password: </b><input type="password" name="username" value={password} onChange={e => setPassword(e.target.value)} /></span>
                    <span>Image Url: <input type="link" name="imageUrl" value={password} onChange={e => setPassword(e.target.value)} /></span>
                    <span>First Name: <input type="text" name="firstName" value={firstName} onChange={e => setFirstName(e.target.value)} /></span>
                    <span>Last Name: <input type="text" name="lastName" value={lastName} onChange={e => setLastName(e.target.value)} /></span>
                    <span>eMail: <input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} /></span>
                    <span>birtday: <input type="date" name="birtday" value={birtday} onChange={e => setBirtday(e.target.value)} /></span>
                    <span>City: <input type="text" name="city" value={city} onChange={e => setCity(e.target.value)} /></span>
                    <button type="submit">SUBMIT</button>
                </form>
            </div>
            <p className="error">{errorMessage}</p>
        </div>
    </>
    )
}