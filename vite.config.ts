import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import Components from 'unplugin-vue-components/vite';
import {PrimeVueResolver} from '@primevue/auto-import-resolver';
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Carrega variáveis de ambiente baseadas no modo (development, production, etc.)
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [
        vue(),
        Components({
              resolvers: [
                  PrimeVueResolver()
              ],
        }),
        tailwindcss(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      port: 3000,
      host: true,
      // Configuração do proxy para desenvolvimento
      proxy: {
        '/api': {
          target: env.VITE_API_BASE_URL || 'http://127.0.0.1:8000',
          changeOrigin: true,
          secure: false,
        },
        '/auth': {
          target: env.VITE_API_BASE_URL || 'http://127.0.0.1:8000',
          changeOrigin: true,
          secure: false,
        },
        '/drps': {
          target: env.VITE_API_BASE_URL || 'http://127.0.0.1:8000',
          changeOrigin: true,
          secure: false,
        },
        '/polos': {
          target: env.VITE_API_BASE_URL || 'http://127.0.0.1:8000',
          changeOrigin: true,
          secure: false,
        }
      }
    },
    define: {
      // Define variáveis para a aplicação
      __APP_VERSION__: JSON.stringify(env.VITE_APP_VERSION || '1.0.0'),
      __APP_TITLE__: JSON.stringify(env.VITE_APP_TITLE || 'GruPI'),
    }
  }
})
