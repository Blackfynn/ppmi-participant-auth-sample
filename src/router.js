import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        /** WELCOME **/
        {
            path: '/',
            name: 'welcome',
            component: () => import(/* webpackChunkName: "Welcome" */ './views/Welcome'),
        },
        /** SUCCESS **/
        {
            path: '/home',
            name: 'Home',
            component: () => import(/* webpackChunkName: "Home" */ './views/Home'),
        },
        /** fallback **/
        {
            path: '*',
            redirect: '/'
        }
    ]
})
export default router
