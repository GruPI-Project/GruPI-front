import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'

import DashboardPage from "@/views/DashboardPage.vue";

const routes = [
    {
        path: '/',
        redirect: '/dashboard'
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: DashboardPage,
        meta: { requiresAuth: true }
    },
    {
        path: '/login',
        name: 'Login',
        component: () => {
            return import('@/views/LoginPage.vue');
        }
    },
    {
        path: '/password-reset/request',
        name: 'paswword-reset-request',
        component: () => {
            return import('@/views/RequestPasswordPage.vue');
        }
    },
    {
        path: '/password-reset/otp',
        name: 'password-reset-otp',
        component: () => {
            return import('@/views/RequestPasswordOTPPage.vue');
        }
    },
    {
        path: '/password-reset/set-new',
        name: 'set-new-password',
        component: () => {
            return import('@/views/ResetPasswordPage.vue');
        }
    },
    {
        path: '/register',
        name: 'register',
        component: () => {
            return import('@/views/RegisterPage.vue');
        }
    },
    {
        path: '/verify-email',
        name: 'register-otp-confirm',
        component: () => {
            return import('@/views/RegisterOtpConfirmPage.vue');
        }
    },
    {
        path: '/logout',
        name: 'logout',
        component: () => {
            return import('@/views/LogoutPage.vue');
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

// Navigation guard to check authentication
router.beforeEach(async (to, _from, next) => {
    const authStore = useAuthStore()
    
    // Initialize auth state if not already done
    if (!authStore.user && authStore.status === 'idle') {
        try {
            await authStore.fetchUser()
        } catch (error) {
            console.log('Failed to fetch user during navigation guard')
        }
    }

    // Check if route requires authentication
    if (to.meta.requiresAuth) {
        if (!authStore.isAuthenticated) {
            console.log("not authenticated")
            // Redirect to login with return url
            next({
                name: 'Login',
                query: { redirect: to.fullPath }
            })
            return
        }
    }
    
    // If going to login and already authenticated, redirect to dashboard
    if (to.name === 'Login' && authStore.isAuthenticated) {
        console.log("authenticated")
        next({ name: 'dashboard' })
        return
    }
    
    next()
})

export default router