/* eslint-disable react/prop-types */
// ! modules
import { Link, useNavigate } from 'react-router-dom';

// ? styles
import './UsersList.css';

// ? assets
import arrowImg from './../../assets/arrow.png';
import defaultIcon from './../../assets/default_avatar.png';
import chatImg from './../../assets/chat.png';
import mainApi from '../../Api/main.api';

export default function UsersList({
  currentUser,
  allUsers,
  allChats,
  setAllChats,
}) {
  const navigate = useNavigate();

  function goToChat(id) {
    navigate(`/chats/${id}`);
  }

  function createChat(userId) {
    mainApi
      .createOneChatByUserId(currentUser.token, userId)
      .then((res) => {
        const _preStateAllChats = [...allChats, res.data];

        setAllChats(_preStateAllChats);

        goToChat(res.data.id);
      })
      .catch((errRes) => {
        console.error(errRes);
        console.error(errRes.error);
      });
  }

  return (
    <>
      <input type='checkbox' id='toggleButton' />
      <label htmlFor='toggleButton' id='sideButton'>
        <img src={arrowImg} alt='arrow-image' />
      </label>
      <div className='userslist_container' id='panel'>
        <div className='userslist_h2_container'>
          <h2 className='userslist_h2'>Users List</h2>
        </div>
        <div className='userslist_container_limited'>
          {allUsers.map((user, index) => {
            if (user.id === currentUser.id) return;

            let chatId;

            for (let i = 0; i < allChats.length; i++) {
              const _chat = allChats[i];

              if (_chat.owners.includes(user.id)) {
                chatId = _chat.id;
              }
            }

            return (
              <div key={index} className='userslist_user_container'>
                <Link
                  to={`/users/${user.id}`}
                  key={index}
                  className='link userslist_user_info_container'
                >
                  <img
                    className='userslist_avatar'
                    src={user.avatar || defaultIcon}
                    alt={`avatar of ${user.username}`}
                  />
                  <div className='userslist_text_container'>
                    <p className='userslist_name'>{user.username}</p>
                  </div>
                </Link>

                <div className='userslist_img_container'>
                  <button
                    onClick={
                      chatId === undefined
                        ? () => createChat(user.id)
                        : () => goToChat(chatId)
                    }
                    className='userslist_img_box'
                  >
                    <img
                      className='userslist_img'
                      src={chatImg}
                      alt='Chat logo'
                    />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
