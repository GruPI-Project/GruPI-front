import { createRouter, createWebHistory } from 'vue-router'

// import Dashboard from "@/views/dashboard.vue";
import DashboardPage from "@/views/DashboardPage.vue";

const routes = [
    {
        path: '/dashboard', // A URL para a sua nova página
        name: 'dashboard',
        component: DashboardPage,
    },
    {
        path: '/login',
        name: 'Login',
        //    "Lazy Loading"
        //    Este componente só será baixado pelo navegador quando o usuário
        //    realmente visitar a rota '/login'.
        component: () => {
            // @ts-ignore
            return import('@/views/LoginPage.vue');
        }
    },
    {
        path: '/password-reset/request',
        name: 'paswword-reset-request',
        component: () => {
            // @ts-ignore
            return import('@/views/RequestPasswordPage.vue');
        }
    },
    {
        path: '/password-reset/otp',
        name: 'password-reset-otp',
        component: () => {
            // @ts-ignore
            return import('@/views/RequestPasswordOTPPage.vue');
        }
    },
    {
        path: '/password-reset/set-new',
        name: 'set-new-password',
        component: () => {
            // @ts-ignore
            return import('@/views/ResetPasswordPage.vue');
        }
    },
    {
        path: '/register',
        name: 'register',
        component: () => {
            // @ts-ignore
            return import('@/views/RegisterPage.vue');
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})
export default router