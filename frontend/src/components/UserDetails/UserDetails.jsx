/* eslint-disable react/prop-types */
import './UserDetails.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import defaultImg from './../../assets/default_avatar.png';

import mainApi from '../../Api/main.api';

export default function UserDetails({
  currentUser,
  allUsers,
  setAllUsers,
  downloadedUsersId,
  setDownloadedUsersId,
}) {
  const { userId } = useParams();

  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    birthday: '',
    email: '',
    avatar: '',
    city: '',
    creationDate: '',
  });

  const birthdayDate = new Date(userInfo.birthday);

  let birthdayString = userInfo.birthday
    ? `${birthdayDate.getUTCDate()} ${
        months[birthdayDate.getUTCMonth()]
      } ${birthdayDate.getUTCFullYear()}`
    : "User don't set any birthday";

  let creationDate = new Date(userInfo.creationDate);
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  //
  useEffect(() => {
    for (let i = 0; i < allUsers.length; i++) {
      const _user = allUsers[i];

      if (String(_user.id) === String(userId)) {
        setUserInfo(_user);

        if (!downloadedUsersId.includes(_user.id)) {
          // download all messages if open chat first time
          mainApi
            .getOneUserInfoById(currentUser.token, _user.id)
            .then((res) => {
              const newState = [...allUsers];
              for (let i = 0; i < newState.length; i++) {
                if (String(newState[i].id) === String(userId)) {
                  newState[i] = res.data;
                }
              }

              setAllUsers(newState);
              setUserInfo(res.data);
              setDownloadedUsersId((preState) => [...preState, _user.id]);
            })
            .catch((errRes) => console.error(errRes.error));
        }

        break;
      }
    }
  }, [userId]);

  return (
    <div className='userdetails_container'>
      <div className='userdetails_header'>
        <h2 className='userdetails_h2'>
          {userInfo.firstName === '' || userInfo.firstName === null
            ? 'User'
            : userInfo.firstName}{' '}
          info&apos;s
        </h2>
      </div>
      <div className='userdetails_content'>
        <div className='userdetails_img_content'>
          <img
            className='userdetails_img'
            src={
              userInfo.avatar === '' || userInfo.avatar === null
                ? defaultImg
                : userInfo.avatar
            }
            alt=''
          />
        </div>
        <div className='userdetails_text_content'>
          <p className='userdetails_text'>
            <b>Firstname :</b>{' '}
            {userInfo.firstName || "User doesn't have firstName"}
          </p>
          <p className='userdetails_text'>
            <b>Lastname :</b>{' '}
            {userInfo.lastName || "User doesn't have LastName"}
          </p>
          <p className='userdetails_text'>
            <b>eMail :</b> {userInfo.email || "User doesn't have email"}
          </p>
          <p className='userdetails_text'>
            <b>Birthday :</b> {birthdayString}
          </p>
          <p className='userdetails_text'>
            <b>City :</b> {userInfo.city || "User doesn't set city"}
          </p>
          <p className='userdetails_text'>
            <b>Account creation :</b>{' '}
            {creationDate.getUTCDate() +
              ' ' +
              months[creationDate.getUTCMonth()] +
              ' ' +
              creationDate.getUTCFullYear()}
          </p>
        </div>
      </div>
    </div>
  );
}
