import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import Guide from '../components/Guide.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: '/new',
        },
        {
            path: '/newest',
            component: Guide
        },
        {
            path: '/new',
            component: Home
        }
    ]
})

export default router