// ! modules
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

// ? pages
import Welcome from './pages/Welcome';
import WhatsHack from './pages/WhatsHack';

// ? components
import ProtectedRoute from './components/ProtectedRoute';
import About from './components/About';

function App() {
  const [logged, setLogged] = useState(true);

  const [currentUser, setCurrentUser] = useState({
    email: "",
    avatar: "",
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    birthday: "",
    city: "",
  })

  return (
    <>
      <Routes>
        <Route path="/" element={
          <ProtectedRoute isActive={logged}>
            <WhatsHack setLogged={setLogged} setCurrentUser={setCurrentUser} />
          </ProtectedRoute>
        } />
        <Route path="/about" element={
          <ProtectedRoute isActive={logged}>
            <WhatsHack setLogged={setLogged} setCurrentUser={setCurrentUser}><About /></WhatsHack>
          </ProtectedRoute>
        } />
        <Route path="/login" element={<Welcome setLogged={setLogged} setCurrentUser={setCurrentUser} />} />
        <Route path="/register" element={<Welcome setLogged={setLogged} setCurrentUser={setCurrentUser} defaultLogin={false} />} />
        <Route path="*" element={<p>Page not found</p>} />
      </Routes>
    </>
  )
}

export default App;
