import { useEffect, useState } from 'react';
import { fetchGroupClasses, joinClass } from '../api/client';
import { useAppSelector } from '../store';

interface Treningstime {
  time_id?: number; TimeID?: number;
  program_id?: number; ProgramID?: number;
  dato?: string; Dato?: string;
  klokkeslett?: string; Klokkeslett?: string;
  varighet?: number; Varighet?: number;
}

export default function GroupClasses() {
  const [list, setList] = useState<Treningstime[]>([]);
  const [message, setMessage] = useState<string>('');
  const { kundenummer } = useAppSelector(s => s.auth);

  useEffect(() => {
    fetchGroupClasses().then(setList).catch(() => setList([]));
  }, []);

  async function handleJoin(id: number) {
    if (!kundenummer) return;
    try {
      const data = await joinClass(id, kundenummer);
      setMessage(typeof data === 'string' ? data : 'Påmelding sendt!');
    } catch (err: any) {
      setMessage(err?.response?.data?.error || 'Kunne ikke melde på');
    }
  }

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-4">Gruppe timer</h2>
      {list.length === 0 && <div className="alert alert-info">Ingen timer tilgjengelig (placeholder).</div>}
      <div className="grid md:grid-cols-2 gap-4">
        {list.map(t => {
          const id = t.time_id || t.TimeID;
          return (
            <div key={id} className="card bg-base-100 shadow">
              <div className="card-body">
                <h3 className="card-title">Time #{id}</h3>
                <p>{t.dato || t.Dato} {t.klokkeslett || t.Klokkeslett}</p>
                <p className="text-sm opacity-70">Varighet: {t.varighet || t.Varighet} min</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary btn-sm" onClick={() => id && handleJoin(id)}>Meld meg på</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {message && <div className="alert alert-success mt-4">{message}</div>}
    </div>
  );
}
