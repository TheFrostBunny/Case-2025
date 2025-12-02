import { BrowserRouter, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
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
  // Wrap in inner component to access location
  return (
    <BrowserRouter>
      <AppShell token={token} onLogout={() => dispatch(logout())} />
    </BrowserRouter>
  );
}

function AppShell({ token, onLogout }: { token: string | null; onLogout: () => void }) {
  const location = useLocation();
  const [readStatus, setReadStatus] = useState<string>('');
  const [a11yToolsEnabled, setA11yToolsEnabled] = useState<boolean>(() => {
    const stored = localStorage.getItem('a11y_tools_enabled');
    return stored ? stored === 'true' : false;
  });
  // Focus main on route change for screen readers / keyboard users
  function isActive(path: string) {
    return location.pathname === path;
  }

  function extractText(root: HTMLElement): string {
    const selectors = ['h1','h2','h3','p','li'];
    const parts: string[] = [];
    selectors.forEach(sel => {
      root.querySelectorAll(sel).forEach(el => {
        const str = el.textContent?.trim();
        if (str) parts.push(str);
      });
    });
    return parts.join('\n');
  }

  async function handleReadPage() {
    const main = document.getElementById('main');
    if (!main) {
      setReadStatus('Fant ikke hovedinnhold.');
      return;
    }
    const text = extractText(main).slice(0, 1200) || 'Ingen lesbar tekst funnet.';
    if ('speechSynthesis' in window && 'SpeechSynthesisUtterance' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      const noVoice = window.speechSynthesis.getVoices().find(v => v.lang.toLowerCase().startsWith('no'));
      if (noVoice) u.voice = noVoice;
      u.onstart = () => setReadStatus('Leser sideinnhold...');
      u.onend = () => setReadStatus('Ferdig.');
      u.onerror = () => setReadStatus('Feil ved opplesning.');
      window.speechSynthesis.speak(u);
    } else {
      try {
        await navigator.clipboard.writeText(text);
        setReadStatus('Ingen tale-støtte. Tekst kopiert.');
      } catch {
        setReadStatus('Ingen tale-støtte og kopi feilet.');
      }
    }
  }

  function stopReading() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setReadStatus('Stoppet.');
    }
  }

  function toggleA11yTools() {
    setA11yToolsEnabled(prev => {
      const next = !prev;
      localStorage.setItem('a11y_tools_enabled', String(next));
      return next;
    });
  }
  return (
    <>
      <header>
        <nav className="navbar bg-base-100 shadow" aria-label="Hovedmeny">
          <div className="flex-1">
            <Link to="/" className="btn btn-ghost text-xl" aria-label="Gå til forsiden">Treningshjørnet</Link>
          </div>
          <div className="flex-none gap-2">
            <ul className="menu menu-horizontal px-1" role="list">
              <li><Link to="/" aria-current={isActive('/') ? 'page' : undefined}>Hjem</Link></li>
              <li><Link to="/login" aria-current={isActive('/login') ? 'page' : undefined}>Login</Link></li>
              <li><Link to="/medlemskap" aria-current={isActive('/medlemskap') ? 'page' : undefined}>Medlemskap</Link></li>
              {token && <li><Link to="/profil" aria-current={isActive('/profil') ? 'page' : undefined}>Profil</Link></li>}
              {token && <li><Link to="/gruppetimer" aria-current={isActive('/gruppetimer') ? 'page' : undefined}>Gruppe timer</Link></li>}
            </ul>
            <div className="flex items-center gap-2" aria-label="Tilgjengelighetsverktøy">
              <button type="button" onClick={toggleA11yTools} className="btn btn-sm btn-ghost" aria-pressed={a11yToolsEnabled} aria-label="Slå på/av tilgjengelighetsverktøy">
                {a11yToolsEnabled ? 'Skjul verktøy' : 'Vis verktøy'}
              </button>
              {a11yToolsEnabled && (
                <div className="flex items-center gap-2" aria-label="Tale funksjoner">
                  <button type="button" onClick={handleReadPage} className="btn btn-sm" aria-label="Les eller kopier sideinnhold">Les side</button>
                  <button type="button" onClick={stopReading} className="btn btn-sm btn-outline" aria-label="Stopp opplesning" disabled={!('speechSynthesis' in window)}>Stopp</button>
                </div>
              )}
            </div>
            {token && <button className="btn btn-outline" onClick={onLogout}>Logg ut</button>}
          </div>
        </nav>
      </header>
      <main id="main" tabIndex={-1} className="outline-none focus-visible:shadow-inner" aria-live="polite">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={ token ? <Navigate to="/profil" /> : <Login /> } />
          <Route path="/medlemskap" element={<Membership />} />
          <Route path="/gruppetimer" element={<ProtectedRoute><GroupClasses /></ProtectedRoute>} />
          <Route path="/profil" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        {readStatus && <div className="sr-only" aria-live="polite">{readStatus}</div>}
      </main>
      <footer className="mt-10 p-6 text-center text-sm opacity-70" aria-label="Bunntekst">© 2025 Treningshjørnet</footer>
    </>
  );
}

export default App;
