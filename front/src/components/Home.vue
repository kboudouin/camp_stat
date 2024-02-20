<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { toTitleCase } from '../utils.js';
const sites = ref([]);

onMounted(async () => {
  const response = await axios.get('http://fibre.larocheposay-vacances.com:3000/sites/');
  sites.value = response.data;
});

</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 justify-items-center justify-content-center">
      <div v-for="site in sites" :key="site.site">
        <router-link :to='"/camping/"+site.site'>
          <div class="btn bg-base-100 shadow-xl text-2xl w-64 h-64 flex items-center justify-center">
            {{ toTitleCase(site.site) }}
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>