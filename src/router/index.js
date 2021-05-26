import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import Guide from '../components/Guide.vue'
import Profile from '../components/Profile.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: '/new',
        },
        {
            path: '/newest',
            component: Home,
            props: { path: '?types=au&order=-creation_time'}
        },
        {
            path: '/new',
            component: Home,
            props: { path: '?types=u&order=-points'}
        },
        {
            path: '/profile',
            component: Profile,
            props: route => ({ query: route.query.username })
        }
    ]
})

export default router