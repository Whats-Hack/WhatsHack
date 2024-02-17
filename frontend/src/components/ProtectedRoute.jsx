// ! modules
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ isActive, children, to = '/login' }) {
  function toAnotherPage() {
    // ! dev
    return <Navigate to={to} />;
  }

  return isActive ? children : toAnotherPage();
}
