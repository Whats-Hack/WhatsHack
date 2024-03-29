/* eslint-disable react/prop-types */
// ! modules
import { Link } from 'react-router-dom';

// ? styles
import './NavChats.css';

// ? assets
import arrowImg from './../../assets/arrow.png';
import defaultIcon from './../../assets/default_avatar.png';

export default function NavChats({ currentUser, allChats, allUsers }) {
  return (
    <>
      <input type='checkbox' id='toggleButton' />

      <label className='button' htmlFor='toggleButton' id='sideButton'>
        <img src={arrowImg} alt='toggle icons' />
      </label>

      <div className='navchats_container' id='panel'>
        <div className='navchats_h2_container'>
          <h2 className='navchats_h2'>Chats</h2>
        </div>
        <div className='navchats_container_limited'>
          {allChats.map((chat, index) => {
            /* chat
              {
                "id": 0,
                "owners": [ 0, 1 ],
                "messages": []
                }
              */

            /* message
              {
                "id": 2,
                "text": "He-he me also",
                "creationDate": "2024-02-19T16:53:53.189Z",
                "modifyDate": null,
                "owner": 1 // todo render is it ours message or not
              }
              */

            /* user
              {
                "id": 0,
                "avatar": "url",
                "username": "chyVacheck",
              },
              */

            const chatMater = {
              id: null,
              avatar: null,
              username: null,
            };
            const _message = chat.messages[chat.messages.length - 1];
            chatMater.id = chat.owners.filter(
              (item) => item !== currentUser.id,
            )[0];

            for (let i = 0; i < allUsers.length; i++) {
              const _user = allUsers[i];
              if (_user.id === chatMater.id) {
                chatMater.avatar = _user.avatar || defaultIcon;
                chatMater.username = _user.username;
              }
            }

            return (
              <Link
                to={`/chats/${chat.id}`}
                key={index}
                className='link navchats_chat_container'
              >
                <img
                  className='navchats_avatar'
                  src={chatMater.avatar}
                  alt={`avatar of ${chatMater.username}`}
                />
                <div className='navchats_text_container'>
                  <p className='navchats_name'>{chatMater.username}</p>
                  <p className='navchats_text'>
                    {_message
                      ? _message.isDeleted
                        ? 'message was deleted'
                        : _message.text
                      : 'Write me'}
                  </p>
                </div>
                <p className='navchats_time'>
                  {_message &&
                    new Date(_message?.creationDate).toLocaleTimeString()}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
