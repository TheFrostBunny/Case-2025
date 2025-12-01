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
        // Backend returns list for /kunde; filter here
        const all = await fetchKunde(0).catch(() => null); // Fallback attempt
        // If endpoint /kunde returns array
        if (Array.isArray(all)) {
          const match = all.find((k: any) => k.kundenummer === kundenummer || k.Kundenummer === kundenummer);
          if (match) setData({
            kundenummer: match.kundenummer || match.Kundenummer,
            navn: match.navn || match.Navn,
            epost: match.epost || match.Epost,
            telefon: match.telefon || match.Telefon,
            medlemskap_id: match.medlemskap_id || match.MedlemskapID,
            utlopsdato: match.utlopsdato || match.Utløpsdato || match.utlopsdato,
            harTreningstimer: match.harTreningstimer || match.HarTreningstimer
          });
        } else if (all) {
          setData(all);
        }
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
                <tr><th>Utløpsdato</th><td>{data.utlopsdato}</td></tr>
                <tr><th>Treningstimer tillegg</th><td>{data.harTreningstimer ? 'Ja' : 'Nei'}</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
