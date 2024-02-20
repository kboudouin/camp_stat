<script setup>
import { toTitleCase, convertDate, convertDateToISO } from '../utils.js';
</script>

<template>
   <div class="relative">
     <div class="flex items-center m-2 lg:m-6 absolute top-0 left-0">
    <div class="lg:text-3xl breadcrumbs">
      <ul>
        <li class="font-bold"><RouterLink to="/">{{ toTitleCase($route.params.name) }}</RouterLink></li>
        <li class="font-bold"><RouterLink :to="'/camping/'+$route.params.name">Services</RouterLink></li>
        <li class="font-bold"><RouterLink :to="'/camping/'+$route.params.name+'/piscine'">Piscine</RouterLink></li>
        <li class="font-bold">Régulations</li>
      </ul>
    </div>
  </div>
  <div class="flex items-center justify-center min-h-screen">
   <div class="text-xl lg:text-3xl font-bold">
      EN CONSTRUCTION 🚧
   </div>
  </div>
  </div>
</template>