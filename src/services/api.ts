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
    console.log("cookies", document.cookie.toString())
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (const cookieString of cookies) {
            const cookie = cookieString.trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
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
    const existingToken = getCookie('csrftoken');
    
    if (!existingToken) {
        console.log('CSRF token não encontrado, buscando do servidor...');
        try {
            // Faz uma requisição GET simples para obter o CSRF token do Django
            // Qualquer endpoint GET do Django que retorne o cookie CSRF funciona
            await apiClientCsrf.get('/api/v1/auth/user/');
            console.log('CSRF token obtido com sucesso');
        } catch (error) {
            console.warn('Erro ao obter CSRF token (pode ser esperado se não autenticado):', error);
            // Não lançamos o erro pois pode ser normal não estar autenticado
        }
    } else {
        console.log('CSRF token já existe:', existingToken);
    }
}

export default apiClient;
export { apiClientCsrf };