import { createRouter, createWebHistory } from 'vue-router'

import TempHome from '../App.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: TempHome
    },
    {
        path: '/about',
        name: 'About',
        //    "Lazy Loading"
        //    Este componente só será baixado pelo navegador quando o usuário
        //    realmente visitar a rota '/login'.
        component: () => import('../views/LoginPage.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})
export default router