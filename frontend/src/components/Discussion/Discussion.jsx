/* eslint-disable react/prop-types */
// ! modules
import { MessageBox, Input } from 'react-chat-elements';
import { useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';

// ? styles
import './Discussion.css';
import './react-chat-elements.css';

// ? api
import mainApi from '../../Api/main.api';

// ? assets
import defaultIcon from './../../assets/default_avatar.png';

// ? utils
import { TIMER_REFRESH } from '../../utils/constants';

export default function Discussion({
  downloadedChatsId,
  setDownloadedChatsId,
  currentUser,
  allChats,
  setAllChats,
  allUsers,
}) {
  // id of current chat
  const { chatId } = useParams();

  const chatRef = useRef(null);

  // ? useStates

  const [currentChatIndex, setCurrentChatIndex] = useState(null);

  const [chatMater, setChatMater] = useState({
    id: null,
    avatar: null,
    username: null,
  });

  //
  const [inputValue, setInputValue] = useState('');

  // ? function
  function onSubmit() {
    if (!inputValue.trim()) return;

    mainApi
      .sendMessageToChatById(currentUser.token, chatId, inputValue.trim())
      .then((res) => {
        const _preStateAllChats = [...allChats];

        for (let i = 0; i < _preStateAllChats.length; i++) {
          const _chat = _preStateAllChats[i];
          if (String(_chat.id) === String(chatId)) {
            _chat.messages.push(res.data);
          }
        }

        setAllChats(_preStateAllChats);

        setInputValue('');

        setTimeout(() => {
          chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }, 10);
      })
      .catch((errRes) => {
        console.error(errRes);
        console.error(errRes.error);
      });
  }

  // ? useEffects

  // init of chat
  useEffect(() => {
    for (let i = 0; i < allChats.length; i++) {
      const _chat = allChats[i];
      if (String(_chat.id) === String(chatId)) {
        setCurrentChatIndex(i);

        if (!downloadedChatsId.includes(_chat.id)) {
          // download all messages if open chat first time
          mainApi
            .getOneChatInfoById(currentUser.token, _chat.id)
            .then((res) => {
              setAllChats((preState) => {
                for (let i = 0; i < preState.length; i++) {
                  const _chat = preState[i];
                  if (String(_chat.id) === String(chatId)) {
                    _chat.messages = res.data.messages;
                  }
                }
                return preState;
              });

              setDownloadedChatsId((preState) => [...preState, _chat.id]);
            })
            .catch((errRes) => console.error(errRes.error))
            .finally(() => {
              setTimeout(() => {
                chatRef.current.scrollTop = chatRef.current.scrollHeight;
              }, 10);
            });
        }

        break;
      }
    }
  }, [chatId]);

  // find a chatMater
  useEffect(() => {
    if (currentChatIndex === null) return;

    const _id = allChats[currentChatIndex].owners.filter(
      (item) => item !== currentUser.id,
    )[0];

    for (let i = 0; i < allUsers.length; i++) {
      const _user = allUsers[i];
      if (String(_user.id) === String(_id)) {
        setChatMater({
          id: _id,
          avatar: _user.avatar || defaultIcon,
          username: _user.username,
        });
        break;
      }
    }
  }, [allChats, allUsers, currentChatIndex, currentUser.id]);

  // check messages per tick
  useEffect(() => {
    if (currentChatIndex === null) return;

    const _interval = setInterval(() => {
      mainApi
        .getLastMessagesOfOneChatById(
          currentUser.token,
          allChats[currentChatIndex].id,
          allChats[currentChatIndex].messages[
            allChats[currentChatIndex].messages.length - 1
          ].id,
        )
        .then((res) => {
          const _preStateAllChats = [...allChats];

          for (let i = 0; i < _preStateAllChats.length; i++) {
            const _chat = _preStateAllChats[i];
            if (String(_chat.id) === String(chatId)) {
              _chat.messages = [..._chat.messages, ...res.data];
            }
          }

          setAllChats(_preStateAllChats);
        })
        .catch((errRes) => console.error(errRes.error));
    }, TIMER_REFRESH.CHATS.ONE);

    return () => {
      clearInterval(_interval);
    };
  }, []);

  return currentChatIndex !== null ? (
    <div className='discussion_container'>
      <div className='discussion_header'>
        <h2 className='discussion_h2'>Discussion with {chatMater.username}</h2>
      </div>
      <div ref={chatRef} className='discussion_content'>
        {allChats[currentChatIndex].messages.length > 0 ? (
          allChats[currentChatIndex].messages.map((message, index) => {
            const _isMessageOur = message.owner === currentUser.id;

            return (
              <MessageBox
                key={index}
                title={
                  _isMessageOur ? currentUser.username : chatMater.username
                }
                avatar={_isMessageOur ? currentUser.avatar : chatMater.avatar}
                type={'text'}
                position={_isMessageOur ? 'right' : 'left'}
                text={message.text}
                date={new Date(message.creationDate)}
              />
            );
          })
        ) : (
          <p>Todo logotype</p>
        )}
      </div>
      <div className='discussion_input'>
        <Input
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          onKeyPress={(e) => {
            if (e.key === 'Enter') onSubmit(e);
          }}
          placeholder='Chat here...'
          value={inputValue}
        />
      </div>
    </div>
  ) : (
    <p>Loading...</p>
  );
}
