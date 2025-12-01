import axios from 'axios';

const API_BASE = 'http://localhost:3000';

export const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' }
});

// Attach token if present
api.interceptors.request.use(cfg => {
  const token = localStorage.getItem('auth_token');
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

// Auth
export async function login(epost: string, passord: string) {
  const res = await api.post('/auth/login', { epost, passord });
  return res.data; // { message, token, kundenummer }
}

// Register new member
export interface RegisterPayload {
  navn: string;
  epost: string;
  telefon: string;
  passord: string;
  utlopsdato: string;
  medlemskap_id: number;
  har_treningstimer: boolean;
}
export async function registerMember(data: RegisterPayload) {
  const res = await api.post('/register', data);
  return res.data;
}

// Get memberships
export async function fetchMemberships() {
  const res = await api.get('/medlemskap');
  return res.data;
}

// Get user info (profile)
export async function fetchKunde(kundenummer: number) {
  const res = await api.get(`/kunde/${kundenummer}`);
  return res.data;
}

// Placeholder group classes fetch (adjust when backend endpoint exists)
export async function fetchGroupClasses() {
  // If backend later offers /gruppetimer or similar, change here
  try {
    const res = await api.get('/treningstimer');
    return res.data;
  } catch {
    return [];
  }
}

// Sign up to a class (placeholder)
export async function joinClass(timeId: number, kundenummer: number) {
  // Adjust endpoint when implemented
  const res = await api.post('/treningstimer/pamelding', { time_id: timeId, kundenummer });
  return res.data;
}
