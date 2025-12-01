import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig(({ mode }) => {
  // Load .env from parent folder
  const env = loadEnv(mode, '../', '');
  const port = env.VITE_Web_PORT ? Number(env.VITE_Web_PORT) : 5173;
  return {
    plugins: [react()],
    server: {
      port,
    },
  };
});
