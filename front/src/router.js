import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from './components/Dashboard.vue';
import CampingPiscine from './components/CampingPiscine.vue';
import CampingEau from './components/CampingEau.vue';
import CampingElec from './components/CampingElec.vue';
import CampingAnalyse from './components/CampingAnalyse.vue';

const routes = [
  { path: '/', component: Dashboard },
  { path: '/piscine', component: CampingPiscine },
  { path: '/eau', component: CampingEau },
  { path: '/elec', component: CampingElec },
  { path: '/piscine/analyse', component: CampingAnalyse }
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
