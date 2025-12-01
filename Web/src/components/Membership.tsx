import { useEffect, useState } from 'react';
import { fetchMemberships, registerMember } from '../api/client';

interface MembershipType {
  medlemskap_id?: number;
  MedlemskapID?: number;
  type_medlemskap?: string;
  TypeMedlemskap?: string;
  pris?: number;
  Pris?: number;
}

interface MembershipForm {
  navn: string;
  epost: string;
  telefon: string;
  passord: string;
  utlopsdato: string;
  medlemskap_id: string; // keep as string for select value
  har_treningstimer: boolean;
}

export default function Membership() {
  const [list, setList] = useState<MembershipType[]>([]);
  const [form, setForm] = useState<MembershipForm>({
    navn: '', epost: '', telefon: '', passord: '', utlopsdato: '', medlemskap_id: '', har_treningstimer: false
  });
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMemberships().then(setList).catch(() => setList([]));
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const target = e.target;
    const { name } = target;
    if (target instanceof HTMLInputElement && target.type === 'checkbox') {
      setForm(f => ({ ...f, [name]: target.checked }));
    } else {
      setForm(f => ({ ...f, [name]: (target as HTMLInputElement | HTMLSelectElement).value }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setResult('');
    try {
      const payload = {
        navn: form.navn,
        epost: form.epost,
        telefon: form.telefon,
        passord: form.passord,
        utlopsdato: form.utlopsdato,
        medlemskap_id: Number(form.medlemskap_id),
        har_treningstimer: form.har_treningstimer,
      };
      const data = await registerMember(payload);
      setResult(typeof data === 'string' ? data : 'Registrert!');
    } catch (err: any) {
      setResult(err?.response?.data?.error || 'Feil ved registrering');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <div className="card bg-base-100 shadow-xl border border-base-300">
        <div className="card-body">
          <h2 className="card-title">Bli medlem <div className="badge badge-primary">Ny</div></h2>
          <p className="text-sm opacity-70 mb-2">Fyll inn detaljer for å opprette konto.</p>
          <div className="divider mb-0">Detaljer</div>
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4 mt-4">
            <div className="form-control md:col-span-1">
              <label className="label"><span className="label-text">Navn</span></label>
              <input name="navn" value={form.navn} onChange={handleChange} required className="input input-bordered" />
            </div>
            <div className="form-control md:col-span-1">
              <label className="label"><span className="label-text">Epost</span></label>
              <input name="epost" value={form.epost} onChange={handleChange} type="email" required className="input input-bordered" />
            </div>
            <div className="form-control md:col-span-1">
              <label className="label"><span className="label-text">Telefon</span></label>
              <input name="telefon" value={form.telefon} onChange={handleChange} required className="input input-bordered" />
            </div>
            <div className="form-control md:col-span-1">
              <label className="label"><span className="label-text">Passord</span></label>
              <input name="passord" value={form.passord} onChange={handleChange} type="password" required className="input input-bordered" />
            </div>
            <div className="form-control md:col-span-1">
              <label className="label"><span className="label-text">Utløpsdato</span></label>
              <input name="utlopsdato" value={form.utlopsdato} onChange={handleChange} type="date" required className="input input-bordered" />
            </div>
            <div className="form-control md:col-span-1">
              <label className="label"><span className="label-text">Medlemskap</span></label>
              <select name="medlemskap_id" value={form.medlemskap_id} onChange={handleChange} required className="select select-bordered">
                <option value="">Velg...</option>
                {list.map(m => {
                  const id = m.medlemskap_id || m.MedlemskapID;
                  const type = m.type_medlemskap || m.TypeMedlemskap;
                  const pris = m.pris || m.Pris;
                  return <option key={id} value={id}>{type} ({pris} kr)</option>;
                })}
              </select>
            </div>
            <div className="form-control md:col-span-2">
              <label className="cursor-pointer label">
                <span className="label-text">Treningstimer +100 kr/mnd</span>
                <input type="checkbox" name="har_treningstimer" checked={form.har_treningstimer} onChange={handleChange} className="checkbox checkbox-primary" />
              </label>
            </div>
            {result && <div className="alert alert-info md:col-span-2">{result}</div>}
            <div className="md:col-span-2 flex justify-between mt-2">
              <div className="text-xs opacity-60">Data sendes sikkert til serveren.</div>
              <button type="submit" disabled={loading} className="btn btn-primary">{loading ? 'Sender...' : 'Registrer'}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
