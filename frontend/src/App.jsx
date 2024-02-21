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
import NavChats from './components/NavChats/NavChats';
import Settings from './components/Settings/Settings';
import UsersList from './components/UsersList/UsersList';
import ProtectedRoute from './components/ProtectedRoute';

import mainApi from './Api/main.api';

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
  // all info about user
  const [currentUser, setCurrentUser] = useState({
    token: null,
    id: null, // number
    creationDate: null, // date
    lastConnection: null, // date
    friends: [],
    chats: [],
    email: null,
    avatar: null, // url
    username: null,
    password: null,
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

  // ? useEffects

  // try to check user info
  useEffect(() => {
    const _token = localStorage.getItem('token');

    if (_token) {
      mainApi
        .getUserInfo(_token)
        .then((res) => {
          setCurrentUser((preState) => {
            return { ...preState, ...{ token: _token }, ...res.data };
          });
        })
        .catch((errRes) => console.error(errRes.error))
        .finally(() => {
          setTokenCheck(true);
        });
    } else {
      setTokenCheck(true);
    }
  }, [isTokenCheck, currentUser.token]);

  // try to get all chats info
  useEffect(() => {
    if (!currentUser.token) return;

    mainApi
      .getAllChatsInfo(currentUser.token)
      .then((res) => {
        setAllChats(res.data);
      })
      .catch((errRes) => console.error(errRes.error))
      .finally(() => {
        setChatsDataDownloaded(true);
      });
  }, [isTokenCheck, currentUser.token]);

  // try to get all users info // not all info, just small one part
  useEffect(() => {
    if (!currentUser.token) return;

    mainApi
      .getAllUsersInfo(currentUser.token)
      .then((res) => {
        setAllUsers(res.data);
      })
      .catch((errRes) => console.error(errRes.error))
      .finally(() => {
        setUsersDataDownloaded(true);
      });
  }, [isTokenCheck, currentUser.token]);

  //
  useEffect(() => {
    setAllInfoChecked(
      isUsersDataDownloaded && isChatsDataDownloaded && isTokenCheck,
    );
  }, [isUsersDataDownloaded, isUsersDataDownloaded, isTokenCheck]);

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
            path='/chat'
            element={
              <ProtectedRoute isActive={currentUser.token}>
                <WhatsHack setCurrentUser={setCurrentUser}>
                  <NavChats
                    currentUser={currentUser}
                    allChats={allChats}
                    allUsers={allUsers}
                  />
                </WhatsHack>
              </ProtectedRoute>
            }
          />

          <Route
            path='/chat/:chatId'
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
            path='/userslist'
            element={
              <ProtectedRoute isActive={currentUser.token}>
                <WhatsHack setCurrentUser={setCurrentUser}>
                  <UsersList currentUser={currentUser} allUsers={allUsers} />
                </WhatsHack>
              </ProtectedRoute>
            }
          />

          <Route
            path='/settings'
            element={
              <ProtectedRoute isActive={currentUser.token}>
                <WhatsHack setCurrentUser={setCurrentUser}>
                  <Settings currentUser={currentUser} />
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
