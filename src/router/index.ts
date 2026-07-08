import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      redirect: "/about",
    },
    {
      path: "/about",
      name: "About",
      component: () => import("@/components/sections/AboutMe.vue"),
    },
    {
      path: "/experience",
      name: "Experience",
      component: () => import("@/components/sections/Experience.vue"),
    },
    {
      path: "/education",
      name: "Education",
      component: () => import("@/components/sections/Education.vue"),
    },
    {
      path: "/skills",
      name: "Skills",
      component: () => import("@/components/sections/Skills.vue"),
    },
    {
      path: "/projects",
      name: "Projects",
      component: () => import("@/components/sections/Projects.vue"),
    },
  ],
});

export default router;
