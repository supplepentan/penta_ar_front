// skl-blog/src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import About from "../components/pages/About.vue";
import Apng from "../components/pages/Apng.vue";
import Ar from "../components/pages/Ar.vue";
import CameraApp from "../components/pages/CameraApp.vue";
import Home from "../components/pages/Home.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/ar",
        name: "Ar",
        component: Ar,
    },
    {
        path: "/apng",
        name: "Apng",
        component: Apng,
    },
    {
        path: "/camera_app",
        name: "CameraApp",
        component: CameraApp,
    },
    {
        path: "/about",
        name: "About",
        component: About,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;