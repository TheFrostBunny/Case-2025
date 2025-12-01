import { useState } from 'react';
import { useAppDispatch } from '../store';
import { loginSuccess } from '../store/authSlice';
import { login } from '../api/client';

export default function Login() {
  const dispatch = useAppDispatch();
  const [epost, setEpost] = useState('');
  const [passord, setPassord] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError(null);
    try {
      const data = await login(epost, passord);
      dispatch(loginSuccess({ token: data.token, kundenummer: data.kundenummer, epost }));
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Innlogging feilet');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <h2 className="card-title">Logg inn</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label"><span className="label-text">Epost</span></label>
              <input value={epost} onChange={e => setEpost(e.target.value)} type="email" required className="input input-bordered" />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">Passord</span></label>
              <input value={passord} onChange={e => setPassord(e.target.value)} type="password" required className="input input-bordered" />
            </div>
            {error && <div className="text-error text-sm">{error}</div>}
            <div className="card-actions justify-end">
              <button disabled={loading} type="submit" className="btn btn-primary w-full">{loading ? 'Logger inn...' : 'Logg inn'}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
