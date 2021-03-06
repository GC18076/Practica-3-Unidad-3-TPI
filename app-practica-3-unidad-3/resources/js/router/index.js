import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login.vue'),
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('../views/Signup.vue'),
    },
    {
        path: '/dashboard',
        name: 'Dashbioard',
        component: () => import('../views/Dashboard.vue')
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.name == 'Login' || to.name == 'Register') {
        if (localStorage.getItem('auth') == 'true') {
            next({ path: '/' });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;