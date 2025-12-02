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
  const errorId = 'login-error-msg';

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
    <div className="max-w-md mx-auto mt-10" aria-labelledby="login-heading">
      <div className="card bg-base-100 shadow-xl border border-base-300">
        <div className="card-body">
          <h1 className="card-title text-2xl" id="login-heading">Logg inn <span className="badge badge-secondary">Tilgang</span></h1>
          <p className="text-sm opacity-70">Bruk epost og passord fra registreringen.</p>
          <form onSubmit={handleSubmit} className="space-y-4" noValidate aria-describedby={error ? errorId : undefined}>
            <div className="form-control">
              <label className="label" htmlFor="login-epost"><span className="label-text">Epost</span></label>
              <input id="login-epost" value={epost} onChange={e => setEpost(e.target.value)} type="email" required className="input input-bordered" aria-invalid={!!error} aria-required="true" />
            </div>
            <div className="form-control">
              <label className="label" htmlFor="login-passord"><span className="label-text">Passord</span></label>
              <input id="login-passord" value={passord} onChange={e => setPassord(e.target.value)} type="password" required className="input input-bordered" aria-invalid={!!error} aria-required="true" />
            </div>
            {error && <div id={errorId} className="text-error text-sm" role="alert" aria-live="assertive">{error}</div>}
            <div className="card-actions justify-end">
              <button disabled={loading} type="submit" className="btn btn-primary w-full">{loading ? 'Logger inn...' : 'Logg inn'}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
