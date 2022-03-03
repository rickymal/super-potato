import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import TiptapView from "../views/TiptapView.vue";
import FormLoginView from "../views/FormLoginView.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: FormLoginView,
    },
    {
      path: "/",
      name: "home",
      component: TiptapView,
    }
  ],
});
export default router;
