import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function Register({setShowLoginPage, setLogged, setCurrentUser}) {
    const [errorMessage, setErrorMessage] = useState("");

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState("");
    const [birthday, setBirthday] = useState("");
    const [city, setCity] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!username.length || !password.length) {
            setErrorMessage("Username and password are required")
        } else {
            const userToAdd = {
                username: username,
                password: password,
                firstName: firstName,
                lastName: lastName,
                email: email,
                avatar: avatar,
                birthday: birthday,
                city: city
            }

            axios.post("https://whatshack.adaptable.app/api/auth/register", userToAdd)
            .then((result) => {
                console.log(result.data.token);
                userToAdd.token = result.data.token
                setCurrentUser(userToAdd);
                setLogged(true);
                navigate("/");
            })
            .catch((error) => setErrorMessage(error.response.data.error))
        }
    }

    return (<>
        <div className="login_container">
            <h2>Register :</h2>
            <p className="welcome_small_p">Already have a account ? Click <a className="welcome_a" onClick={() => setShowLoginPage(true)}>here</a> to login</p>
            {/* <div className="login-input-container"> */}
                <form className="welcome_form" onSubmit={handleSubmit}>
                    <div className="welcome_form_inputs">
                        <div className="welcome_form_input"><p><b>Username: </b></p><input className="welcome_input" type="text" name="username" value={username} onChange={e => setUsername(e.target.value)} /></div>
                        <div className="welcome_form_input"><p><b>Password: </b></p><input className="welcome_input" type="password" name="username" value={password} onChange={e => setPassword(e.target.value)} /></div>
                        <div className="welcome_form_input"><p>First Name: </p><input className="welcome_input" type="text" name="firstName" value={firstName} onChange={e => setFirstName(e.target.value)} /></div>
                        <div className="welcome_form_input"><p>Last Name: </p><input className="welcome_input" type="text" name="lastName" value={lastName} onChange={e => setLastName(e.target.value)} /></div>
                        <div className="welcome_form_input"><p>Image Link: </p><input className="welcome_input" type="link" name="avatar" value={avatar} onChange={e => setAvatar(e.target.value)} /></div>
                        <div className="welcome_form_input"><p>eMail: </p><input className="welcome_input" type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} /></div>
                        <div className="welcome_form_input"><p>Birthday: </p><input className="welcome_input" type="date" name="birthday" value={birthday} onChange={e => setBirthday(e.target.value)} /></div>
                        <div className="welcome_form_input"><p>City: </p><input className="welcome_input" type="text" name="city" value={city} onChange={e => setCity(e.target.value)} /></div>
                    </div>
                    <div className="welcome_form_btn">
                        <button className="welcome_button" type="submit">SUBMIT</button>
                    </div>
                </form>
            {/* </div> */}
            <p className="welcome_error">{errorMessage}</p>
        </div>
    </>
    )
}