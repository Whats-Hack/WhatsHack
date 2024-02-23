/* eslint-disable react/prop-types */
// ! modules
import { Input, MessageList } from 'react-chat-elements';
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';

// ? styles
import './Discussion.css';
import './react-chat-elements.css';

// ? api
import mainApi from '../../Api/main.api';

// ? assets
import defaultIcon from './../../assets/default_avatar.png';

// ? components
import Logo from './../Logo/Logo';

// ? utils
import { TIMER_REFRESH } from '../../utils/constants';
import { isLink, isImageURL } from '../../utils/utils';

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
  // sent a new message
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

  // delete the message
  function deleteMessage(messageId) {
    mainApi
      .modifyMessageInChatById(currentUser.token, chatId, messageId, {
        isDeleted: true,
      })
      .then(() => {
        const _preStateAllChats = [...allChats];

        for (let i = 0; i < _preStateAllChats.length; i++) {
          const _chat = _preStateAllChats[i];
          if (String(_chat.id) === String(chatId)) {
            for (let j = 0; j < _chat.messages.length; j++) {
              const _message = _chat.messages[j];

              if (String(_message.id) === String(messageId)) {
                _message.isDeleted = true;
              }
            }
          }
        }

        setAllChats(_preStateAllChats);
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
      // mainApi
      //   .getLastMessagesOfOneChatById(
      //     currentUser.token,
      //     allChats[currentChatIndex].id,
      //     allChats[currentChatIndex].messages[
      //       allChats[currentChatIndex].messages.length - 1
      //     ].id,
      //   )
      //   .then((res) => {
      //     const _preStateAllChats = [...allChats];

      //     for (let i = 0; i < _preStateAllChats.length; i++) {
      //       const _chat = _preStateAllChats[i];
      //       if (String(_chat.id) === String(chatId)) {
      //         _chat.messages = [..._chat.messages, ...res.data];
      //       }
      //     }

      //     setAllChats(_preStateAllChats);
      //   })
      //   .catch((errRes) => console.error(errRes.error));
      mainApi
        .getOneChatInfoById(currentUser.token, chatId)
        .then((res) => {
          const _preStateAllChats = [...allChats];

          for (let i = 0; i < _preStateAllChats.length; i++) {
            const _chat = _preStateAllChats[i];
            if (String(_chat.id) === String(chatId)) {
              _chat.messages = res.data.messages;
            }
          }

          setAllChats(_preStateAllChats);
        })
        .catch((errRes) => console.error(errRes.error));
    }, TIMER_REFRESH.CHATS.ONE);

    return () => {
      clearInterval(_interval);
    };
  }, [currentChatIndex, chatId]);

  return currentChatIndex !== null ? (
    <div className='discussion_container'>
      <div className='discussion_header'>
        <h2 className='discussion_h2'>Discussion with {chatMater.username}</h2>
      </div>
      <div ref={chatRef} className='discussion_content'>
        <Logo />

        <MessageList
          lockable={true}
          onRemoveMessageClick={(message) => {
            deleteMessage(message.id);
          }}
          dataSource={allChats[currentChatIndex].messages.map((message) => {
            const _isMessageOur = message.owner === currentUser.id;
            const _isMessageLink = isLink(message.text);

            const _isMessageLinkToImg =
              _isMessageLink && isImageURL(message.text);
            const date = new Date(message.creationDate);

            const text = message.isDeleted ? (
              _isMessageOur ? (
                'You delete this message'
              ) : (
                `Message was deleted by ${chatMater.username}`
              )
            ) : _isMessageLink ? (
              _isMessageLinkToImg ? undefined : (
                <a target='_blank' className='link' href={message.text}>
                  link
                </a>
              )
            ) : (
              message.text
            );

            const status = 'sent';

            const data = {
              uri: null,
            };

            if (_isMessageLinkToImg) data.uri = message.text;

            const type = message.isDeleted
              ? 'system'
              : _isMessageLinkToImg
              ? 'photo'
              : 'text';

            return {
              title: (
                <Link className='link' to={`/users/${message.owner}`}>
                  {_isMessageOur ? currentUser.username : chatMater.username}
                </Link>
              ),
              data: data,
              avatar: _isMessageOur ? currentUser.avatar : chatMater.avatar,
              type: type,
              position: _isMessageOur ? 'right' : 'left',
              text: text,
              removeButton: _isMessageOur,
              id: message.id,
              dateString: date.toLocaleString(),
              date: date,
              status: status,
              notch: !_isMessageOur,
            };
          })}
        />
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
