import './UserDetails.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import defaultImg from './../../assets/default_avatar.png'

import mainApi from '../../Api/main.api';

export default function UserDetails({ currentUser }) {
    const { userId } = useParams();

    const [userInfo, setUserInfo] = useState({
        firstName: "",
        lastName: "",
        birthday: "",
        email: "",
        avatar: "",
        city: "",
        creationDate: "",
    })

    let birthdayDate = new Date(userInfo.birthday);
    let creationDate = new Date(userInfo.creationDate);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


    useEffect(() => {
        mainApi.
            getOneUserInfoById(currentUser.token, userId)
            .then((result) => {setUserInfo(result.data)})
            .catch((resErr) => console.log(resErr))
    }, [userId])
    

    return (
        <div className='userdetails_container'>
            <div className='userdetails_header'>
                <h2 className='userdetails_h2'>{userInfo.firstName === "" || userInfo.firstName === null ? "User": userInfo.firstName} info's</h2>
            </div>
            <div className='userdetails_content'>
                <div className='userdetails_img_content'>
                    <img className='userdetails_img' src={userInfo.avatar === "" || userInfo.avatar === null ? defaultImg : userInfo.avatar} alt="" />
                </div>
                <div className='userdetails_text_content'>
                    <p className='userdetails_text'><b>Firstname :</b> {userInfo.firstName}</p>
                    <p className='userdetails_text'><b>Lastname :</b> {userInfo.lastName}</p>
                    <p className='userdetails_text'><b>eMail :</b> {userInfo.email}</p>
                    <p className='userdetails_text'><b>Birthday :</b> {birthdayDate.getUTCDate() + " " + months[birthdayDate.getUTCMonth()] + " " + birthdayDate.getUTCFullYear()}</p>
                    <p className='userdetails_text'><b>City :</b> {userInfo.city}</p>
                    <p className='userdetails_text'><b>Account creation :</b> {creationDate.getUTCDate() + " " + months[creationDate.getUTCMonth()] + " " + creationDate.getUTCFullYear()}</p>
                </div>
            </div>
        </div>
    )
}