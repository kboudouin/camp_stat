import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/Home.vue';
import CampingService from './components/HomeService.vue';
import CampingDetails from './components/CampingDetails.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/camping/:name', component: CampingService },
  { path: '/camping/:name/piscine', component: CampingDetails }
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
