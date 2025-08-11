import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY ?? env.VITE_GEMINI_API_KEY ?? ''),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY ?? env.VITE_GEMINI_API_KEY ?? '')
    },
    resolve: {
      alias: { '@': path.resolve(process.cwd(), '.') }
    },
    // Giữ phần server/preview cho chạy local, production dùng "serve -s dist"
    server: {
      host: '0.0.0.0',
      strictPort: true,
      allowedHosts: ['localhost', '127.0.0.1', 'fileat.trolyai.io.vn', 'tokyat.trolyai.io.vn', 'tockyat.trolyai.io.vn']
    },
    preview: {
      host: '0.0.0.0',
      port: Number(process.env.PORT || '4173'),
      strictPort: true,
      allowedHosts: ['localhost', '127.0.0.1', 'fileat.trolyai.io.vn', 'tokyat.trolyai.io.vn', 'tockyat.trolyai.io.vn']
    }
  };
});
