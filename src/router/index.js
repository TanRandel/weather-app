import Weather from "@/views/Weather.vue";
import { createRouter, createWebHistory } from "vue-router";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "weather",
      component: Weather,
    },
    
  ],
});

export default router;
