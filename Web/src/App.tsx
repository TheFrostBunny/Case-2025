import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Profile from './components/Profile';
import Membership from './components/Membership';
import GroupClasses from './components/GroupClasses';
import ProtectedRoute from './components/ProtectedRoute';
import { useAppSelector } from './store';
import { logout } from './store/authSlice';
import { useAppDispatch } from './store';

function App() {
  const { token } = useAppSelector(s => s.auth);
  const dispatch = useAppDispatch();
  return (
    <BrowserRouter>
      <div className="navbar bg-base-100 shadow">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">Treningssenter</Link>
        </div>
        <div className="flex-none gap-2">
          <ul className="menu menu-horizontal px-1">
            <li><Link to="/">Hjem</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/medlemskap">Medlemskap</Link></li>
            {token && <li><Link to="/profil">Profil</Link></li>}
            {token && <li><Link to="/gruppetimer">Gruppe timer</Link></li>}
          </ul>
          {token && <button className="btn btn-outline" onClick={() => dispatch(logout())}>Logg ut</button>}
        </div>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={ token ? <Navigate to="/profil" /> : <Login /> } />
        <Route path="/medlemskap" element={<Membership />} />
        <Route path="/gruppetimer" element={<ProtectedRoute><GroupClasses /></ProtectedRoute>} />
        <Route path="/profil" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
