import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import Submit from '../components/Submit.vue'
import Guide from '../components/Guide.vue'
import Profile from '../components/Profile.vue'
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
            path: '/submissions',
            component: Home,
            props: { path: '?types=au&order=-points'}
        },
        {
            path: '/new',
            component: Home,
            props: { path: '?types=u&order=-points'}
        },
        {
            path: '/ask',
            component: Home,
            props: { path: '?types=a&order=-creation_time' }
        },
        {
            path: '/threads',
            component: Home,
            props: { path: '?types=cr&order=-creation_time' }
        },
        {
            path: '/submit',
            component: Submit,
        },
        {
            path: '/profile',
            component: Profile            
        },
        {
            path: '/contribution',
            component: Contribution,
            name: "contribution"
        }

    ]
})

export default router