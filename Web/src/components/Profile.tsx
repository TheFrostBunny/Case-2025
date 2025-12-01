import { useEffect, useState } from 'react';
import { useAppSelector } from '../store';
import { fetchKunde } from '../api/client';

interface KundeData {
  kundenummer: number;
  navn: string;
  epost: string;
  telefon: string;
  medlemskap_id: number;
  utlopsdato: string;
  harTreningstimer?: boolean;
}

export default function Profile() {
  const { kundenummer } = useAppSelector(s => s.auth);
  const [data, setData] = useState<KundeData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      if (!kundenummer) return;
      try {
        const raw = await fetchKunde(kundenummer).catch(() => null);
        if (!raw) {
          setError('Ingen data for kundenummeret, eller nettverksfeil.');
          return;
        }
        // Normalize possible backend field variants
        const normalized: KundeData = {
          kundenummer: raw.kundenummer ?? raw.Kundenummer ?? kundenummer,
          navn: raw.navn ?? raw.Navn ?? '',
          epost: raw.epost ?? raw.Epost ?? '',
          telefon: raw.telefon ?? raw.Telefon ?? '',
          medlemskap_id: raw.medlemskap_id ?? raw.MedlemskapID ?? raw.medlemskapId ?? 0,
          utlopsdato: raw.utlopsdato ?? raw.Utlopsdato ?? raw.utløpsdato ?? '',
          harTreningstimer: (raw.harTreningstimer ?? raw.har_treningstimer ?? raw.HarTreningstimer) ?? false,
        };
        setData(normalized);
      } catch (e: any) {
        setError(e?.response?.data?.error || 'Kunne ikke hente profil');
      }
    }
    load();
  }, [kundenummer]);

  if (!kundenummer) return <p>Mangler kundenummer.</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!data) return <p>Laster...</p>;

  return (
    <div className="max-w-xl mx-auto mt-10">
      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <h2 className="card-title">Din profil</h2>
          <div className="overflow-x-auto">
            <table className="table">
              <tbody>
                <tr><th>Kundenummer</th><td>{data.kundenummer}</td></tr>
                <tr><th>Navn</th><td>{data.navn}</td></tr>
                <tr><th>Epost</th><td>{data.epost}</td></tr>
                <tr><th>Telefon</th><td>{data.telefon}</td></tr>
                <tr><th>Medlemskap ID</th><td>{data.medlemskap_id}</td></tr>
                <tr><th>Utløpsdato</th><td>{data.utlopsdato || '—'}</td></tr>
                <tr><th>Treningstimer tillegg</th><td>{data.harTreningstimer ? 'Ja' : 'Nei'}</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
