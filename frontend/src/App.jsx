// App.js

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
// ! modules
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

// ? pages
import Welcome from './pages/Welcome/Welcome';
import WhatsHack from './pages/WhatsHack/WhatsHack';

// ? components
import About from './components/About/About';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Discussion from './components/Discussion/Discussion';
import Logo from './components/Logo/Logo';
import NavChats from './components/NavChats/NavChats';
import Settings from './components/Settings/Settings';
import UsersList from './components/UsersList/UsersList';
import ProtectedRoute from './components/ProtectedRoute';
import UserDetails from './components/UserDetails/UserDetails';

//
import mainApi from './Api/main.api';

// ? utils
import { WEB_SOCKET_SETTING } from './utils/constants';

function App() {
  // ? useStates
  // do we check token in local storage
  const [isTokenCheck, setTokenCheck] = useState(false);
  // is Chats Downloaded
  const [isChatsDataDownloaded, setChatsDataDownloaded] = useState(false);
  // is Users Downloaded
  const [isUsersDataDownloaded, setUsersDataDownloaded] = useState(false);
  //
  const [isAllInfoChecked, setAllInfoChecked] = useState(false);

  // token
  const [token, setToken] = useState(null);

  // all info about user
  const [currentUser, setCurrentUser] = useState({
    _id: null, // number
    creationDate: null, // date
    lastConnectionDate: null, // date
    friends: [],
    chats: [],
    email: null,
    avatar: null, // url
    username: null,
    firstName: null,
    lastName: null,
    birthday: null, // date
    city: null,
    isActive: false,
  });
  // all chats
  const [allChats, setAllChats] = useState([]);
  // all users
  const [allUsers, setAllUsers] = useState([]);
  // downloaded chats id
  const [downloadedChatsId, setDownloadedChatsId] = useState([]);
  // downloaded users id
  const [downloadedUsersId, setDownloadedUsersId] = useState([]);

  // ?
  const [socket, setSocket] = useState();

  useEffect(() => {
    const _socket = new WebSocket(WEB_SOCKET_SETTING.URL);
    setSocket(_socket);
  }, []);

  useEffect(() => {
    if (!token) return;

    socket.send(
      JSON.stringify({
        type: 'auth',
        action: 'loginByToken',
        token: token,
      }),
    );
  }, [token]);

  useEffect(() => {
    if (!socket) return;

    // when open connection
    socket.addEventListener('open', (event) => {
      console.log('WebSocket connection opened');

      // try to login by token
      const token = localStorage.getItem('token');

      if (!token) return;

      setToken(token);
    });

    socket.addEventListener('message', handleWebSocketResponse);

    socket.addEventListener('error', (error) => {
      console.error('WebSocket error:', error);
    });

    socket.addEventListener('close', () => {
      console.log('WebSocket connection closed');
      socket.removeEventListener('message', handleWebSocketResponse);
      setToken(null);
    });
  }, [socket]);

  // connect to web-socket

  // Слушатель для ответа от сервера
  function handleWebSocketResponse(event) {
    const answer = JSON.parse(event.data);
    console.log('Response from server:', answer);

    switch (answer.type) {
      case 'auth':
        switch (answer.action) {
          case 'login':
            break;

          case 'loginByToken':
            setCurrentUser({ ...currentUser, ...answer.data });
            console.log(currentUser);
            console.log(answer.data);
            break;

          case 'signup':
            break;

          default:
            break;
        }
        break;

      case 'info':
        break;

      case 'user':
        break;

      case 'chat':
        break;

      case 'message':
        break;

      default:
        break;
    }
  }

  // try to check user info
  // useEffect(() => {
  //   const _token = localStorage.getItem('token');

  //   if (_token) {
  //     mainApi
  //       .getUserInfo(_token)
  //       .then((res) => {
  //         setCurrentUser((preState) => {
  //           return { ...preState, ...{ token: _token }, ...res.data };
  //         });
  //       })
  //       .catch((errRes) => console.error(errRes.error))
  //       .finally(() => {
  //         setTokenCheck(true);
  //       });
  //   } else {
  //     setTokenCheck(true);
  //     setChatsDataDownloaded(true);
  //     setUsersDataDownloaded(true);
  //   }
  // }, [isTokenCheck, currentUser.token]);

  // try to get all chats info
  // useEffect(() => {
  //   if (!currentUser.token) return;

  //   mainApi
  //     .getAllChatsInfo(currentUser.token)
  //     .then((res) => {
  //       setAllChats(res.data);
  //     })
  //     .catch((errRes) => console.error(errRes.error))
  //     .finally(() => {
  //       setChatsDataDownloaded(true);
  //     });
  // }, [isTokenCheck, currentUser.token]);

  // try to get all users info // not all info, just small one part
  // useEffect(() => {
  //   if (!currentUser.token) return;

  //   mainApi
  //     .getAllUsersInfo(currentUser.token)
  //     .then((res) => {
  //       setAllUsers(res.data);
  //     })
  //     .catch((errRes) => console.error(errRes.error))
  //     .finally(() => {
  //       setUsersDataDownloaded(true);
  //     });
  // }, [isTokenCheck, currentUser.token]);

  //
  // useEffect(() => {
  //   setAllInfoChecked(
  //     isUsersDataDownloaded && isChatsDataDownloaded && isTokenCheck,
  //   );
  // }, [isUsersDataDownloaded, isChatsDataDownloaded, isTokenCheck]);

  return (
    <>
      {isAllInfoChecked ? (
        <Routes>
          <Route
            path='/'
            element={
              <ProtectedRoute isActive={currentUser.token}>
                <WhatsHack setCurrentUser={setCurrentUser} />
              </ProtectedRoute>
            }
          />

          <Route
            path='/chats'
            element={
              <ProtectedRoute isActive={currentUser.token}>
                <WhatsHack setCurrentUser={setCurrentUser}>
                  <NavChats
                    currentUser={currentUser}
                    allChats={allChats}
                    allUsers={allUsers}
                  />
                  <Logo />
                </WhatsHack>
              </ProtectedRoute>
            }
          />

          <Route
            path='/chats/:chatId'
            element={
              <ProtectedRoute isActive={currentUser.token}>
                <WhatsHack setCurrentUser={setCurrentUser}>
                  <NavChats
                    currentUser={currentUser}
                    allChats={allChats}
                    allUsers={allUsers}
                  />
                  <Discussion
                    downloadedChatsId={downloadedChatsId}
                    setDownloadedChatsId={setDownloadedChatsId}
                    currentUser={currentUser}
                    allChats={allChats}
                    setAllChats={setAllChats}
                    allUsers={allUsers}
                  />
                </WhatsHack>
              </ProtectedRoute>
            }
          />

          <Route
            path='/users'
            element={
              <ProtectedRoute isActive={currentUser.token}>
                <WhatsHack setCurrentUser={setCurrentUser}>
                  <UsersList
                    currentUser={currentUser}
                    allUsers={allUsers}
                    allChats={allChats}
                    setAllChats={setAllChats}
                  />
                  <Logo />
                </WhatsHack>
              </ProtectedRoute>
            }
          />

          <Route
            path='/users/:userId'
            element={
              <ProtectedRoute isActive={currentUser.token}>
                <WhatsHack setCurrentUser={setCurrentUser}>
                  <UsersList
                    currentUser={currentUser}
                    allUsers={allUsers}
                    allChats={allChats}
                    setAllChats={setAllChats}
                  />
                  <UserDetails
                    downloadedUsersId={downloadedUsersId}
                    setDownloadedUsersId={setDownloadedUsersId}
                    currentUser={currentUser}
                    allUsers={allUsers}
                    setAllUsers={setAllUsers}
                  />
                </WhatsHack>
              </ProtectedRoute>
            }
          />

          <Route
            path='/settings'
            element={
              <ProtectedRoute isActive={currentUser.token}>
                <WhatsHack setCurrentUser={setCurrentUser}>
                  <Settings
                    currentUser={currentUser}
                    setCurrentUser={setCurrentUser}
                  />
                </WhatsHack>
              </ProtectedRoute>
            }
          />

          <Route
            path='/about'
            element={
              <ProtectedRoute isActive={currentUser.token}>
                <WhatsHack setCurrentUser={setCurrentUser}>
                  <About />
                </WhatsHack>
              </ProtectedRoute>
            }
          />

          {/* // ? page without auth */}

          <Route
            path='/login'
            element={
              <ProtectedRoute to='/' isActive={!currentUser.token}>
                <Welcome>
                  <Login setCurrentUser={setCurrentUser} />
                </Welcome>
              </ProtectedRoute>
            }
          />

          <Route
            path='/register'
            element={
              <ProtectedRoute to='/' isActive={!currentUser.token}>
                <Welcome>
                  <Register setCurrentUser={setCurrentUser} />
                </Welcome>
              </ProtectedRoute>
            }
          />

          <Route path='*' element={<p>Page not found</p>} />
        </Routes>
      ) : (
        <p>Todo preloader</p>
      )}
    </>
  );
}

export default App;
