import { defineStore } from 'pinia';
import apiClient, { ensureCsrfToken } from '@/services/api';
import type {User, DrpOption, PolosOption} from '@/types/user.types';


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
        // async register(credentials: {
        //     email: string;
        //     password1: string;
        //     password2: string;
        //     projeto_integrador: number;
        //     drp: number;
        //     polo: number;
        //     curso: number;
        //     first_name: string;
        //     last_name: string;
        // }) {
        //     this.status = 'loading';
        //     try {
        //         // Garante que temos um CSRF token antes de fazer a requisição
        //         await ensureCsrfToken();
        //         await apiClient.post('/auth/registration/', credentials);
        //         this.status = 'success';
        //         console.log("Registro bem-sucedido");
        //     } catch (error) {
        //         this.status = 'error';
        //         throw error;
        //     }
        // },
        async registerAndRequestOTP(credentials: {
            email: string;
            password1: string;
            password2: string;
            projeto_integrador: number;
            drp: number;
            polo: number;
            curso: number;
            first_name: string;
            last_name: string;
            tags?: string[];
        }) {
            this.status = 'loading';
            try {
                // Registra o usuário - o backend já gera o OTP automaticamente
                await ensureCsrfToken();
                await apiClient.post('/auth/registration/', credentials);
                
                this.status = 'success';
                console.log("Registro bem-sucedido - OTP foi enviado automaticamente");
            } catch (error) {
                this.status = 'error';
                throw error;
            }
        },
        async register(credentials: {
            email: string;
            password1: string;
            password2: string;
            projeto_integrador: number;
            drp: number;
            polo: number;
            curso: number;
            first_name: string;
            last_name: string;
            tags?: string[];
        }) {
            this.status = 'loading';
            try {
                // Garante que temos um CSRF token antes de fazer a requisição
                await ensureCsrfToken();
                await apiClient.post('/auth/registration/', credentials);
                this.status = 'success';
                console.log("Registro bem-sucedido");
            } catch (error) {
                this.status = 'error';
                throw error;
            }
        },
        async login(credentials: Record<string, string>) {
            this.status = 'loading';
            try {
                // Garante que temos um CSRF token antes de fazer a requisição
                await ensureCsrfToken();
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
            console.log(this.isAuthenticated);
        },
        async logout() {
            try {
                await ensureCsrfToken();
                await apiClient.post('/auth/logout/');
            } finally {
                // Limpamos o estado independentemente do resultado
                this.$reset();
            }
        },
        async requestPasswordReset(payload: { email: string }) {
            try {
                await ensureCsrfToken();
                await apiClient.post('/password-reset/request/', payload);
            } catch (error) {
                console.error("Erro ao solicitar redefinição de senha:", error);
                throw error;
            }
        },
        async validatePasswordResetOTP(payload: { email: string; otp: string }) {
            try {
                await ensureCsrfToken();
                await apiClient.post('/password-reset/validate-otp/', payload);
            } catch (error) {
                console.error("Erro ao validar OTP de reset:", error);
                throw error;
            }
        },
        async setNewPassword(payload: { new_password1: string; new_password2: string }) {
            try {
                await ensureCsrfToken();
                await apiClient.post('/password-reset/set-new/', payload);
            } catch (error) {
                console.error("Erro ao definir nova senha:", error);
                throw error;
            }
        },
        async getDRPs() {
            try {
                const response = await apiClient.get<DrpOption[]>('/drps/');
                return response.data;
            } catch (error) {
                console.error("Erro ao obter DRPs:", error);
                throw error;
            }
        },
        async getPolos() {
            try {
                const response = await apiClient.get<PolosOption[]>('/polos/');
                return response.data;
            } catch (error) {
                console.error("Erro ao obter os Polos:", error);
                throw error;
            }
        },
        async getEixos() {
            try {
                const response = await apiClient.get('/eixos/');
                return response.data;
            } catch (error) {
                console.error("Erro ao obter os Eixos:", error);
                throw error;
            }
        },
        async getCursos() {
            try {
                const response = await apiClient.get('/cursos/');
                return response.data;
            } catch (error) {
                console.error("Erro ao obter os Cursos:", error);
                throw error;
            }
        },
        async getPIs() {
            try {
                const response = await apiClient.get('/pis/');
                return response.data;
            } catch (error) {
                console.error("Erro ao obter os PIs:", error);
                throw error;
            }
        },
        async getTags() {
            try {
                const response = await apiClient.get('/tags/');
                return response.data;
            } catch (error) {
                console.error("Erro ao obter as Tags:", error);
                throw error;
            }
        },
        async requestRegistrationOTP(payload: { email: string }) {
            try {
                await ensureCsrfToken();
                await apiClient.post('/registration/request-otp/', payload);
            } catch (error) {
                console.error("Erro ao solicitar OTP de registro:", error);
                throw error;
            }
        },
        async validateRegistrationOTP(payload: { email: string; otp: string }) {
            try {
                await ensureCsrfToken();
                await apiClient.post('/registration/validate-otp/', payload);
            } catch (error) {
                console.error("Erro ao validar OTP de registro:", error);
                throw error;
            }
        },

    },
});