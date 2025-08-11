import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  // Đọc biến môi trường (không bắt buộc phải prefix VITE_ vì ta inject bằng define)
  const env = loadEnv(mode, process.cwd(), '');
  const allowedHosts = [
    'fileat.trolyai.io.vn',
    'localhost',
    '127.0.0.1'
  ];

  // Cổng do reverse proxy cấp (Dokploy/Nixpacks truyền PORT). Mặc định 4173 nếu chạy local.
  const port = Number(process.env.PORT || '4173');

  return {
    define: {
      // Inject vào bundle để code có thể dùng process.env.*
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY ?? env.VITE_GEMINI_API_KEY ?? ''),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY ?? env.VITE_GEMINI_API_KEY ?? '')
    },
    resolve: {
      // Dùng cwd để khỏi phụ thuộc __dirname trong ESM
      alias: { '@': path.resolve(process.cwd(), '.') }
    },
    server: {
      host: '0.0.0.0',
      strictPort: true,
      allowedHosts
    },
    preview: {
      host: '0.0.0.0',
      port,
      strictPort: true,
      allowedHosts
    }
  };
});
