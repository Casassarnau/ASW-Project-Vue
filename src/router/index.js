import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import Guide from '../components/Guide.vue'
import Contribution from '../components/Contribution.vue'


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
            path: '/ask',
            component: Home,
            props: route => { path: '?types=a&order=-creation' }
        },
        {
            path: '/threads',
            component: Home,
            props: { path: '?types=cr&order=-creation_time' }
        },
        {
            path: '/profile',
            component: Home,

            props: route => ({ query: route.query.username })
        },
        {
            path: '/contribution',
            component: Contribution,
            props: route => ({ query: route.query.contributionId })

        }

    ]
})

export default router