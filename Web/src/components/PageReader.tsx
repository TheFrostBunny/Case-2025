import { useState } from 'react';

export default function PageReader() {
  const [status, setStatus] = useState<string>('');

  async function handleRead() {
    const main = document.getElementById('main');
    if (!main) {
      setStatus('Fant ikke hovedinnhold.');
      return;
    }
    const text = extractText(main);
    if ('speechSynthesis' in window && 'SpeechSynthesisUtterance' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text.slice(0, 800)); // begrens lengden
      const noVoice = window.speechSynthesis.getVoices().find(v => v.lang.toLowerCase().startsWith('no'));
      if (noVoice) u.voice = noVoice;
      u.onstart = () => setStatus('Leser sideinnhold...');
      u.onend = () => setStatus('Ferdig.');
      u.onerror = () => setStatus('Feil ved opplesning.');
      window.speechSynthesis.speak(u);
    } else {
      try {
        await navigator.clipboard.writeText(text);
        setStatus('Ingen tale-støtte. Sideinnhold kopiert til utklippstavle.');
      } catch {
        setStatus('Ingen tale-støtte og kunne ikke kopiere tekst.');
      }
    }
  }

  function extractText(root: HTMLElement): string {
    // Hent synlig tekst fra overskrifter og avsnitt
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

  function handleStop() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setStatus('Stoppet.');
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2" aria-live="polite">
      <div className="join">
        <button type="button" onClick={handleRead} className="btn btn-primary join-item" aria-label="Les opp eller kopier sideinnhold">Les side</button>
        <button type="button" onClick={handleStop} className="btn btn-outline join-item" aria-label="Stopp opplesning" disabled={!("speechSynthesis" in window)}>Stopp</button>
      </div>
      {status && <div className="text-xs bg-base-100 shadow px-2 py-1 rounded" role="status">{status}</div>}
    </div>
  );
}