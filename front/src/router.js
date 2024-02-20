import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/Home.vue';
import CampingDetails from './components/CampingDetails.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/camping/:name', component: CampingDetails }
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
