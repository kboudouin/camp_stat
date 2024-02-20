<script setup>
import { useRoute } from 'vue-router';
import { toTitleCase } from '../utils.js';
const route = useRoute();
const piscinePath = route.path + '/piscine';
</script>

<template>
 <div class="relative">
  <div class="flex items-center m-2 lg:m-6 absolute top-0 left-0">
    <div class="lg:text-3xl breadcrumbs">
      <ul>
        <li class="font-bold"><RouterLink to="/">{{ toTitleCase($route.params.name) }}</RouterLink></li>
        <li class="font-bold"><RouterLink :to="'/camping/'+$route.params.name">Services</RouterLink></li>
      </ul>
    </div>
  </div>
  <div class="flex items-center justify-center h-full  min-h-screen">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 justify-items-center justify-content-center">
      <router-link :to="piscinePath">
        <div class="btn bg-base-100 shadow-xl text-2xl w-64 h-64 flex items-center justify-center">
          Piscine
        </div>
      </router-link>
      <div class="btn bg-base-100 shadow-xl text-2xl w-64 h-64 flex items-center justify-center">
        Eau
      </div>
      <div class="btn bg-base-100 shadow-xl text-2xl w-64 h-64 flex items-center justify-center">
        Elec
      </div>
    </div>
  </div>
</div>
</template>