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
  currentUser,
  allChats,
  setAllChats,
  allUsers,
}) {
  // id of current chat
  const { chatId } = useParams();

  const chatRef = useRef(null);

  // ? useStates

  const [currentChat, setCurrentChat] = useState({
    id: null,
    owners: [],
    messages: [],
  });
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

        const _preState = { ...currentChat };
        _preState.messages.push(res.data);

        setCurrentChat(_preState);
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
        setCurrentChat(_chat);
      }
    }
  }, [allChats, chatId]);

  // find a chatMater
  useEffect(() => {
    if (typeof currentChat.id !== 'number') return;

    const _id = currentChat.owners.filter((item) => item !== currentUser.id)[0];

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
  }, [allUsers, currentChat, currentUser.id]);

  // init messages
  useEffect(() => {
    if (typeof currentChat.id !== 'number') return;

    mainApi
      .getOneChatInfoById(currentUser.token, currentChat.id)
      .then((res) => {
        setAllChats((preState) => {
          for (let i = 0; i < preState.length; i++) {
            const _chat = preState[i];
            _chat.messages = res.data.messages;
          }
          return preState;
        });
        setCurrentChat(res.data);
      })
      .catch((errRes) => console.error(errRes.error));
  }, [currentChat.id, currentUser.token, setAllChats]);

  // check messages per tick
  useEffect(() => {
    if (typeof currentChat.id !== 'number') return;

    const _interval = setInterval(() => {
      mainApi
        .getLastMessagesOfOneChatById(
          currentUser.token,
          currentChat.id,
          currentChat.messages[currentChat.messages.length - 1].id,
        )
        .then((res) => {
          setAllChats((preState) => {
            for (let i = 0; i < preState.length; i++) {
              const _chat = preState[i];
              if (_chat.id === chatId) {
                _chat.messages = [..._chat.messages, ...res.data];
              }
            }
            return preState;
          });

          const _preState = { ...currentChat };
          _preState.messages = [..._preState.messages, ...res.data];

          setCurrentChat(_preState);
        })
        .catch((errRes) => console.error(errRes.error));
    }, TIMER_REFRESH.CHATS.ONE);

    return () => {
      clearInterval(_interval);
    };
  }, [
    chatId,
    currentChat,
    currentChat.id,
    currentChat.messages,
    currentUser.token,
    setAllChats,
  ]);

  return (
    <div className='discussion_container'>
      <div className='discussion_header'>
        <h2 className='discussion_h2'>Discussion with {chatMater.username}</h2>
      </div>
      <div ref={chatRef} className='discussion_content'>
        {currentChat.messages.length > 0 ? (
          currentChat.messages.map((message, index) => {
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
          <p>Todo preloader</p>
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
  );
}
