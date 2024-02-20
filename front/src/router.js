import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/Home.vue';
import CampingService from './components/HomeService.vue';
import CampingPiscine from './components/CampingPiscine.vue';
import CampingPiscineRegulation from './components/CampingPiscineRegulation.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/camping/:name', component: CampingService },
  { path: '/camping/:name/piscine', component: CampingPiscine },
  { path: '/camping/:name/piscine/regulation', component: CampingPiscineRegulation }
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
