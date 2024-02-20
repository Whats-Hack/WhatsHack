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
import Discussion from './components/Discussion/Discussion';
import NavChats from './components/NavChats/NavChats';

import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import mainApi from './Api/main.api';

function App() {
  // ? useStates
  // do we check token in local storage
  const [tokenCheck, setTokenCheck] = useState(false);
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
  }, [tokenCheck]);

  return (
    <>
      {tokenCheck ? (
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
                  <NavChats />
                </WhatsHack>
              </ProtectedRoute>
            }
          />

          <Route
            path='/chat/:chatId'
            element={
              <ProtectedRoute isActive={currentUser.token}>
                <WhatsHack setCurrentUser={setCurrentUser}>
                  <NavChats />
                  <Discussion />
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
