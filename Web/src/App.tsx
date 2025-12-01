import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import Profile from './components/Profile';
import Membership from './components/Membership';
import GroupClasses from './components/GroupClasses';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <nav style={{ display: 'flex', gap: '1rem', padding: '1rem', background: '#eee' }}>
        <Link to="/login">Login</Link>
        <Link to="/profil">Profil</Link>
        <Link to="/medlemskap">Bli medlem</Link>
        <Link to="/gruppetimer">Gruppe timer</Link>
      </nav>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/medlemskap" element={<Membership />} />
        <Route path="/gruppetimer" element={<ProtectedRoute><GroupClasses /></ProtectedRoute>} />
        <Route path="/profil" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
