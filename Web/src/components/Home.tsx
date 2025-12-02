import { useEffect, useState } from 'react';
import { useAppSelector } from '../store';
import { fetchMemberships, fetchGroupClasses } from '../api/client';
import { galleryImages } from '../data/homeImages';
import { Link } from 'react-router-dom';

interface MembershipType { medlemskap_id?: number; MedlemskapID?: number; type_medlemskap?: string; TypeMedlemskap?: string; pris?: number; Pris?: number; }
interface Time { TimeID?: number; time_id?: number; Dato?: string; dato?: string; Klokkeslett?: string; klokkeslett?: string; Varighet?: number; varighet?: number; }

export default function Home() {
  const { token } = useAppSelector(s => s.auth);
  const [memberships, setMemberships] = useState<MembershipType[]>([]);
  const [times, setTimes] = useState<Time[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    fetchMemberships().then(setMemberships).catch(() => setMemberships([]));
    fetchGroupClasses().then(data => {
      if (Array.isArray(data)) setTimes(data.slice(0, 4));
      else setTimes([]);
    }).catch(() => {
      setTimes([
        { TimeID: 1, Dato: '2025-12-05', Klokkeslett: '18:00', Varighet: 60 },
        { TimeID: 2, Dato: '2025-12-06', Klokkeslett: '17:30', Varighet: 45 },
      ]);
    });
  }, []);

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <section className="bg-primary text-primary-content">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <p className="font-semibold text-sm md:text-base">
            0,-/mnd. til april – ingen binding!
          </p>
          <Link to="/medlemskap" className="btn btn-sm md:btn-md btn-secondary">Gå til kampanjer</Link>
        </div>
      </section>

      <section className="bg-base-100">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="carousel w-full rounded-xl shadow" aria-roledescription="carousel">
            {galleryImages.map((image, idx) => (
              <div
                key={idx}
                className={`carousel-item relative w-full ${idx === currentSlide ? "block" : "hidden"}`}
              >
                <img src={image.src} alt={image.alt} className="w-full h-64 md:h-96 object-cover" />
                <div className="absolute left-4 right-4 bottom-4 flex justify-between">
                  <button
                    type="button"
                    className="btn btn-circle btn-sm"
                    onClick={() => setCurrentSlide((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1))}
                    aria-label="Forrige bilde"
                  >
                    ❮
                  </button>
                  <button
                    type="button"
                    className="btn btn-circle btn-sm"
                    onClick={() => setCurrentSlide((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1))}
                    aria-label="Neste bilde"
                  >
                    ❯
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hero bg-base-200 py-16">
        <div className="hero-content flex-col lg:flex-row gap-10">
          <div className="max-w-xl">
            <h1 className="text-4xl font-bold mb-4">Din vei til bedre form</h1>
            <p className="opacity-70 mb-6">Moderne treningssenter med gruppetimer, tilpassede programmer og tilleggstimer for ekstra oppfølging.</p>
            <div className="flex flex-wrap gap-3">
              {!token ? (
                <>
                  <Link to="/medlemskap" className="btn btn-primary">Bli medlem</Link>
                  <Link to="/login" className="btn btn-outline">Logg inn</Link>
                </>
              ) : (
                <>
                  <Link to="/profil" className="btn btn-primary">Min profil</Link>
                  <Link to="/gruppetimer" className="btn btn-secondary">Gruppe timer</Link>
                </>
              )}
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl w-full max-w-md">
            <div className="card-body">
              <h2 className="card-title" id="hvorfor-oss">Hvorfor oss?</h2>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Fleksible medlemskap</li>
                <li>Personlig oppfølging</li>
                <li>Oppgrader med treningstimer (+100 kr/mnd)</li>
                <li>Gruppetimer for alle nivåer</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-semibold mb-6" id="seksjon-medlemskap">Medlemskap</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {memberships.map(m => {
            const id = m.medlemskap_id || m.MedlemskapID;
            const type = m.type_medlemskap || m.TypeMedlemskap;
            const pris = m.pris || m.Pris;
            return (
              <div key={id} className="card bg-base-100 shadow border border-base-300">
                <div className="card-body">
                  <h3 className="card-title text-lg">{type}</h3>
                  <p className="text-2xl font-bold">{pris} kr<span className="text-sm font-normal">/mnd</span></p>
                  <p className="text-xs opacity-60">Inkluderer grunnleggende fasiliteter.</p>
                  <div className="card-actions justify-end mt-4">
                    <Link to="/medlemskap" className="btn btn-sm btn-primary">Velg</Link>
                  </div>
                </div>
              </div>
            );
          })}
          {memberships.length === 0 && (
            <div className="alert">Ingen medlemskap hentet ennå.</div>
          )}
        </div>
      </section>

      <section className="py-12 bg-base-200">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-6" id="seksjon-gruppetimer">Neste gruppetimer</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {times.map(t => {
              const id = t.time_id || t.TimeID;
              const dato = t.dato || t.Dato;
              const klokke = t.klokkeslett || t.Klokkeslett;
              const varighet = t.varighet || t.Varighet;
              return (
                <div key={id} className="card bg-base-100 shadow border border-base-300">
                  <div className="card-body p-4">
                    <h3 className="font-semibold">Time #{id}</h3>
                    <p className="text-sm">{dato} {klokke}</p>
                    <p className="text-xs opacity-60">Varighet: {varighet} min</p>
                    <div className="card-actions justify-end">
                      <Link to="/gruppetimer" className="btn btn-xs btn-secondary">Se mer</Link>
                    </div>
                  </div>
                </div>
              );
            })}
            {times.length === 0 && <div className="alert">Ingen timer tilgjengelig.</div>}
          </div>
        </div>
      </section>

      {!token && (
        <section className="py-16 text-center">
          <h2 className="text-3xl font-semibold mb-4" id="call-to-action">Klar til å starte?</h2>
          <p className="mb-6 opacity-70">Registrer deg og kom i gang med treningen i dag.</p>
          <div className="flex justify-center gap-4">
            <Link to="/medlemskap" className="btn btn-primary">Bli medlem</Link>
            <Link to="/login" className="btn btn-outline">Logg inn</Link>
          </div>
        </section>
      )}
    </div>
  );
}
