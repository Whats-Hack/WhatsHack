import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function Login({setShowLoginPage, setLogged, setCurrentUser}) {
    const [errorMessage, setErrorMessage] = useState("");

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!username.length || !password.length) {
            setErrorMessage("Username and password are required")
        } else {
            const userToLogin = {
                username: username,
                password: password
            }

            axios.post("https://whatshack.adaptable.app/api/auth/login", userToLogin)
            .then((result) => {
                userToLogin.token = result.data.token;
                setCurrentUser(userToLogin);
                setLogged(true);
                navigate("/");
            })
            .catch((error) => setErrorMessage(error.response.data.error))
        }
    }

    return (
        <div className="login_container">
            <h2>Login :</h2>
            <p className="welcome_small_p">You don't have a account ? Click <a className="welcome_a" onClick={() => setShowLoginPage(false)}>here</a> to create one</p>
                <form className="welcome_form" onSubmit={handleSubmit}>
                    <div className="welcome_form_input"><p>Username: </p><input className="welcome_input" type="text" name="username" value={username} onChange={e => setUsername(e.target.value)} /></div>
                    <div className="welcome_form_input"><p>Password: </p><input className="welcome_input" type="password" name="username" value={password} onChange={e => setPassword(e.target.value)} /></div>
                    <button className="welcome_button" type="submit">CONNECT</button>
                </form>
            <p className="welcome_error">{errorMessage}</p>
        </div>
    )
}