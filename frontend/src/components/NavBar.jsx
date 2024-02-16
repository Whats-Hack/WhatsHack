import "./NavBar.css"
import chatImg from "../assets/chat.png";
import addUserImg from "../assets/add-user.png";
import about from "../assets/about.png";
import param from "../assets/param.png";
import logout from "../assets/logout.png";

export default function NavBar({setLogged, setCurrentUser}) {

    return (
    <div className="navbar_container">
        <div className="navbar_image_container"><img className="navbar_image" src={chatImg} alt="ChatImg" /></div>
        <div className="navbar_image_container"><img className="navbar_image" src={addUserImg} alt="ChatImg" /></div>
        <div className="navbar_image_container"><img className="navbar_image" src={param} alt="ChatImg" /></div>
        <div className="navbar_image_container"><img className="navbar_image" src={about} alt="ChatImg" /></div>
        <div className="navbar_image_container logout_image"><img className="navbar_image" src={logout} alt="ChatImg" /></div>
    </div>
    )
}