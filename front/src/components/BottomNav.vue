<script setup>
import { useRoute } from 'vue-router';
const route = useRoute();

</script>
<template>
<div class="btm-nav">
 <router-link to="/" class="btm-nav-link" active-class="active">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
    <span class="btm-nav-label">Dashboard</span>
  </router-link>
  <router-link to="/piscine" class="btm-nav-link" active-class="active">
    <svg stroke="currentColor" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="mdi-pool" width="24" height="24" viewBox="0 0 24 24"><path d="M2,15C3.67,14.25 5.33,13.5 7,13.17V5A3,3 0 0,1 10,2C11.31,2 12.42,2.83 12.83,4H10A1,1 0 0,0 9,5V6H14V5A3,3 0 0,1 17,2C18.31,2 19.42,2.83 19.83,4H17A1,1 0 0,0 16,5V14.94C18,14.62 20,13 22,13V15C19.78,15 17.56,17 15.33,17C13.11,17 10.89,15 8.67,15C6.44,15 4.22,16 2,17V15M14,8H9V10H14V8M14,12H9V13C10.67,13.16 12.33,14.31 14,14.79V12M2,19C4.22,18 6.44,17 8.67,17C10.89,17 13.11,19 15.33,19C17.56,19 19.78,17 22,17V19C19.78,19 17.56,21 15.33,21C13.11,21 10.89,19 8.67,19C6.44,19 4.22,20 2,21V19Z" /></svg>
     <span class="btm-nav-label">Piscine</span>
  </router-link>
  <router-link to="/eau" class="btm-nav-link" active-class="active">
    <svg stroke="currentColor" class="h-5 w-5" style="enable-background:new 0 0 32 32;" version="1.1" viewBox="0 0 32 32" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Guides"/><g id="_x32_0"/><g id="_x31_9"/><g id="_x31_8"/><g id="_x31_7"/><g id="_x31_6"/><g id="_x31_5"/><g id="_x31_4"/><g id="_x31_3"/><g id="_x31_2"/><g id="_x31_1"/><g id="_x31_0"/><g id="_x30_9"/><g id="_x30_8"/><g id="_x30_7"/><g id="_x30_6"/><g id="_x30_5"/><g id="_x30_4"/><g id="_x30_3"/><g id="_x30_2"/><g id="_x30_1"><g><path d="M16.7070313,2.2929688c-0.390625-0.390625-1.0234375-0.390625-1.4140625,0C14.9135742,2.6723633,6,11.6816406,6,20    c0,5.5141602,4.4858398,10,10,10c5.5136719,0,10-4.4858398,10-10C26,11.6816406,17.0869141,2.6723633,16.7070313,2.2929688z     M16,28c-4.4111328,0-8-3.5888672-8-8c0-6.2075195,5.9248047-13.2612305,8.0004883-15.5410156    C18.0761719,6.7368164,24,13.7836914,24,20C24,24.4111328,20.4111328,28,16,28z"/><path d="M16,24c-2.2055664,0-4-1.8105469-4-4.0356445c0-0.5522461-0.4477539-1-1-1s-1,0.4477539-1,1    C10,23.2924805,12.6914063,26,16,26c0.5522461,0,1-0.4477539,1-1S16.5522461,24,16,24z"/></g></g></svg>
     <span class="btm-nav-label">Eau</span>
  </router-link>
  <router-link to="/elec" class="btm-nav-link" active-class="active">
   <svg stroke="currentColor" class="h-5 w-5" id="Icons" style="enable-background:new 0 0 32 32;" version="1.1" viewBox="0 0 32 32" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M26.9,15.7C26.8,15.3,26.4,15,26,15h-6l3.9-11.7c0.1-0.4,0-0.9-0.4-1.1c-0.4-0.3-0.8-0.2-1.2,0l-17,13  c-0.3,0.3-0.5,0.7-0.3,1.1C5.2,16.7,5.6,17,6,17h6L8.1,28.7c-0.1,0.4,0,0.9,0.4,1.1C8.6,29.9,8.8,30,9,30c0.2,0,0.4-0.1,0.6-0.2  l17-13C26.9,16.5,27.1,16.1,26.9,15.7z"/></svg>
     <span class="btm-nav-label">Elec</span>
  </router-link>
</div>
</template>