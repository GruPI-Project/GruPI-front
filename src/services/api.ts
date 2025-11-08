import axios from 'axios';

// Função para obter valor da variável de ambiente com fallback
function getEnvVar(key: string, fallback: string = ''): string {
    // No Vite, variáveis de ambiente são acessíveis via import.meta.env
    return (import.meta.env[key] as string) || fallback;
}

// Configurações de ambiente
const API_BASE_URL = getEnvVar('VITE_API_BASE_URL', 'http://127.0.0.1:8000/api/v1/');
const API_CSRF_BASE_URL = getEnvVar('VITE_API_BASE_URL_CSRF', 'http://127.0.0.1:8000/');
const API_TIMEOUT = parseInt(getEnvVar('VITE_API_TIMEOUT', '30000'));

console.log('API Configuration:', {
    baseURL: API_BASE_URL,
    csrfBaseURL: API_CSRF_BASE_URL,
    timeout: API_TIMEOUT,
    env: getEnvVar('VITE_NODE_ENV', 'development')
});

function getCookie(name: string): string | null {
    let cookieValue = null;
    console.log("Cookies disponíveis:", document.cookie);
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        console.log(`Procurando cookie '${name}' em ${cookies.length} cookies`);
        for (const cookieString of cookies) {
            const cookie = cookieString.trim();
            console.log(`  Verificando: ${cookie.substring(0, 50)}...`);
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                console.log(`  ✓ Cookie '${name}' encontrado:`, cookieValue);
                break;
            }
        }
    }
    if (!cookieValue) {
        console.log(`  ✗ Cookie '${name}' não encontrado`);
    }
    return cookieValue;
}

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true, // ESSENCIAL: Permite que o Axios envie cookies (como o sessionid)
    timeout: API_TIMEOUT,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

const apiClientCsrf = axios.create({
    baseURL: API_CSRF_BASE_URL,
    withCredentials: true,
    timeout: API_TIMEOUT,
});


// Interceptor para adicionar o token CSRF a cada requisição "unsafe" (POST, PUT, DELETE)
apiClient.interceptors.request.use((config) => {
    const method = config.method?.toUpperCase() || '';
    console.log('Interceptor - Método:', method);
    console.log('Interceptor - Headers antes:', config.headers);
    
    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
        const csrfToken = getCookie('csrftoken');
        console.log('Interceptor - CSRF Token do cookie:', csrfToken);
        
        if (csrfToken) {
            // Garante que o header seja definido corretamente
            config.headers.set('X-CSRFToken', csrfToken);
            console.log('Interceptor - CSRF Token adicionado ao header');
        } else {
            console.warn('Interceptor - CSRF Token não encontrado no cookie!');
        }
    }
    
    console.log('Interceptor - Headers depois:', config.headers);
    return config;
}, (error) => {
    console.error('Interceptor - Erro:', error);
    return Promise.reject(error);
});

// Interceptor de resposta para logar erros detalhados
apiClient.interceptors.response.use(
    (response) => {
        console.log('Resposta bem-sucedida:', response.status, response.config.url);
        return response;
    },
    (error) => {
        console.error('Erro na requisição:', {
            url: error.config?.url,
            method: error.config?.method,
            status: error.response?.status,
            data: error.response?.data,
            headers: error.config?.headers
        });
        return Promise.reject(error);
    }
);

// Função para garantir que temos um CSRF token válido
export async function ensureCsrfToken(): Promise<void> {
    let existingToken = getCookie('csrftoken');
    
    if (!existingToken) {
        console.log('CSRF token não encontrado no cookie, buscando do servidor...');
        try {
            // Tentativa 1: Endpoint específico para obter CSRF token
            // Muitas APIs Django expõem um endpoint /csrf/ ou similar
            let response;
            try {
                response = await apiClientCsrf.get('/csrf/');
                console.log('Tentativa 1: /csrf/ - Success');
            } catch (e) {
                console.log('Tentativa 1: /csrf/ - Não disponível');
                // Tentativa 2: Qualquer endpoint GET que force o Django a setar o cookie
                try {
                    response = await apiClientCsrf.get('/api/v1/');
                    console.log('Tentativa 2: /api/v1/ - Success');
                } catch (e2) {
                    console.log('Tentativa 2: /api/v1/ - Falhou');
                    // Tentativa 3: Endpoint de auth
                    response = await apiClientCsrf.get('/api/v1/auth/user/');
                    console.log('Tentativa 3: /api/v1/auth/user/ - Success');
                }
            }
            
            // Aguarda um momento para o cookie ser setado
            await new Promise(resolve => setTimeout(resolve, 200));
            
            // Verifica se o cookie foi setado
            existingToken = getCookie('csrftoken');
            
            if (existingToken) {
                console.log('✓ CSRF token obtido com sucesso do cookie após requisição');
            } else {
                console.warn('✗ Cookie CSRF não foi setado pelo servidor.');
                console.warn('Isso geralmente acontece por problemas de CORS ou configuração de domínio.');
                console.warn('Verifique as configurações do Django:');
                console.warn('  - CSRF_COOKIE_SAMESITE = "None"');
                console.warn('  - CSRF_COOKIE_SECURE = True');
                console.warn('  - CSRF_COOKIE_DOMAIN = ".grupi-dev.pavops.net"');
                console.warn('  - CORS_ALLOW_CREDENTIALS = True');
                
                // Tenta pegar do header da resposta como fallback
                const csrfFromHeader = response?.headers['x-csrftoken'] || response?.headers['X-CSRFToken'];
                if (csrfFromHeader) {
                    console.log('Tentando setar cookie manualmente do header:', csrfFromHeader);
                    // Tenta setar manualmente (provavelmente não vai funcionar por limitações de segurança)
                    document.cookie = `csrftoken=${csrfFromHeader}; path=/; domain=.grupi-dev.pavops.net; secure; samesite=none`;
                }
            }
        } catch (error) {
            console.warn('Todas as tentativas de obter CSRF token falharam:', error);
        }
    } else {
        console.log('✓ CSRF token já existe no cookie');
    }
}

export default apiClient;
export { apiClientCsrf };