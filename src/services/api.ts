import axios from 'axios';

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
    // baseURL: 'https://api.grupi-dev.pavops.net/api/v1/', // Use a URL da sua API Django
    baseURL: 'http://127.0.0.1:8000/api/v1/', // Use a URL da sua API Django
    withCredentials: true, // ESSENCIAL: Permite que o Axios envie cookies (como o sessionid)
});

const apiClientCsrf = axios.create({
    // baseURL: 'https://api.grupi-dev.pavops.net/',
    baseURL: 'http://127.0.0.1:8000/',
    withCredentials: true,
});


// Interceptor para adicionar o token CSRF a cada requisição "unsafe" (POST, PUT, DELETE)
apiClient.interceptors.request.use((config) => {
    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(config.method?.toUpperCase() || '')) {
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