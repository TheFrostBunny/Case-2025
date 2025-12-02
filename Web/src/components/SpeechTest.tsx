import { useEffect, useState, useRef } from 'react';

interface SpeechSupport {
  supported: boolean;
  voices: SpeechSynthesisVoice[];
}

export default function SpeechTest() {
  const [support, setSupport] = useState<SpeechSupport>({ supported: false, voices: [] });
  const [status, setStatus] = useState<string>('');
  const textRef = useRef<HTMLTextAreaElement | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    const has = 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
    if (!has) {
      setSupport({ supported: false, voices: [] });
      return;
    }
    function loadVoices() {
      const voices = window.speechSynthesis.getVoices();
      setSupport({ supported: true, voices });
    }
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  async function speak() {
    const text = textRef.current?.value?.trim() || 'Dette er en test av tale-støtte i nettleseren.';
    if (!support.supported) {
      // Fallback: kopier tekst til utklippstavle
      try {
        await navigator.clipboard.writeText(text);
        setStatus('Ingen tale-støtte. Tekst kopiert til utklippstavle.');
      } catch {
        setStatus('Ingen tale-støtte og kunne ikke kopiere tekst.');
      }
      return;
    }
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    const noVoice = support.voices.find(v => v.lang.toLowerCase().startsWith('no'));
    if (noVoice) u.voice = noVoice;
    u.rate = 1;
    u.pitch = 1;
    u.onstart = () => setStatus('Leser...');
    u.onend = () => setStatus('Ferdig.');
    u.onerror = () => setStatus('Feil ved avspilling.');
    utteranceRef.current = u;
    window.speechSynthesis.speak(u);
  }

  function stop() {
    if (!support.supported) return;
    window.speechSynthesis.cancel();
    setStatus('Stoppet.');
  }

  return (
    <div className="max-w-xl mx-auto mt-10" aria-labelledby="speechtest-heading">
      <div className="card bg-base-100 shadow-xl border border-base-300">
        <div className="card-body">
          <h1 id="speechtest-heading" className="card-title text-2xl">Tale-støtte test</h1>
          <p className="text-sm opacity-70 mb-2">Tester om nettleseren støtter Web Speech API (speechSynthesis).</p>
          <div className="alert mb-4" role="status" aria-live="polite">
            {support.supported ? 'Tale-støtte er tilgjengelig.' : 'Ingen innebygd tale-støtte funnet.'}
          </div>
          {support.supported && support.voices.length > 0 && (
            <p className="text-xs mb-2">Tilgjengelige stemmer: {support.voices.slice(0,5).map(v => v.name + ' (' + v.lang + ')').join(', ')}{support.voices.length > 5 ? ' …' : ''}</p>
          )}
          <label className="label" htmlFor="speechtext"><span className="label-text">Tekst som skal leses</span></label>
          <textarea id="speechtext" ref={textRef} className="textarea textarea-bordered w-full mb-4" rows={4} placeholder="Skriv tekst som skal leses høyt" />
          <div className="flex gap-2">
            <button type="button" onClick={speak} className="btn btn-primary">{support.supported ? 'Les opp' : 'Kopier tekst'}</button>
            <button type="button" onClick={stop} className="btn btn-outline" disabled={!support.supported}>Stopp</button>
          </div>
          {status && <div className="mt-4 text-sm" role="status" aria-live="polite">{status}</div>}
          <details className="mt-4">
            <summary className="cursor-pointer">Hvordan teste</summary>
            <ul className="list-disc list-inside text-sm mt-2">
              <li>{support.supported ? 'Kontroller at du hører opplesning.' : 'Kontroller at teksten blir kopiert (lim inn for å verifisere).'}</li>
              <li>Trykk Tab til knappene for tastaturnavigasjon.</li>
              <li>Aktiver skjermleser for å høre statusmeldinger (NVDA/VoiceOver).</li>
              <li>Trykk "Stopp" og bekreft at talen avbrytes.</li>
            </ul>
          </details>
        </div>
      </div>
    </div>
  );
}
