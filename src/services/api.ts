import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';

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
    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(config.method?.toUpperCase() || '')) {
        //clear previous token
        if (config.headers && config.headers['X-CSRFToken']) {
            delete config.headers['X-CSRFToken'];
        }
        const csrfToken = getCookie('csrftoken');
        console.log('token', csrfToken);
        if (csrfToken) {
            config.headers['X-CSRFToken'] = csrfToken;
        }
    }
    return config;
});

export default apiClient;
export { apiClientCsrf };