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
            component: Home,
            props: { path: '?types=au&order=-creation_time' }
        },
        {
            path: '/new',
            component: Home,
            props: { path: '?types=u&order=-points' }
        },
        {
            path: '/ask',
            component: Home,
            props: { path: '?types=a&order=-creation_time'}
        },
        {
            path: '/threads',
            component: Home,
            props: { path: '?types=cr&order=-creation_time' }
        },
        {
            path: '/profile',
            component: Home,
<<<<<<< HEAD
            props: route => ({ query: route.query.username })
        },
        {
            path: '/ask',
            component: Home,
            props: route => { path: '?types=a&order=-creation' }
=======
            props: route => ({ query: route.query.user_id })
>>>>>>> 705692fcad0b03102d272c4e78cfca1de86792c6
        }

    ]
})

export default router