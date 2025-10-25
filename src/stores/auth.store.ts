import { defineStore } from 'pinia';
import apiClient from '@/services/api';

interface Profile {
    polo: string;
    curso: string;
    projeto_integrador: string;
    eixo: string;
    drp: string;
}

interface User {
    pk: number;
    email: string;
    first_name: string;
    last_name: string;
    profile: Profile;
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    status: 'idle' | 'loading' | 'success' | 'error';
}

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({
        user: null,
        isAuthenticated: false,
        status: 'idle',
    }),

    actions: {
        async login(credentials: Record<string, string>) {
            this.status = 'loading';
            try {
                // dj-rest-auth usa este endpoint por padrão
                await apiClient.post('/auth/login/', credentials);
                // Após o login bem-sucedido, buscamos os dados do usuário
                await this.fetchUser();
                this.status = 'success';
                console.log("Login bem-sucedido");
            } catch (error) {
                this.status = 'error';
                this.isAuthenticated = false;
                this.user = null;
                // É bom propagar o erro para o componente poder tratá-lo
                throw error;
            }
        },
        async fetchUser() {
            try {
                // dj-rest-auth usa este endpoint para obter dados do usuário
                const response = await apiClient.get<User>('/auth/user/');
                this.user = response.data;
                this.isAuthenticated = true;
            } catch (error) {
                this.user = null;
                this.isAuthenticated = false;
            }
        },
        async logout() {
            try {
                await apiClient.post('/auth/logout/');
            } finally {
                // Limpamos o estado independentemente do resultado
                this.$reset();
            }
        },
        async requestPasswordReset(payload: { email: string }) {
            try {
                await apiClient.post('/password-reset/request/', payload);
            } catch (error) {
                console.error("Erro ao solicitar redefinição de senha:", error);
                throw error;
            }
        },
    },
});