<script setup>
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';
import { toTitleCase } from '../utils.js';

const sites = ref([]);
const selectedSite = ref(null);

onMounted(async () => {
  const response = await axios.get('http://fibre.larocheposay-vacances.com:3000/sites/');
  sites.value = response.data;

  const savedSite = localStorage.getItem('Site');
  if (savedSite) {
    selectedSite.value = JSON.parse(savedSite);
  } else if (sites.value.length === 1) {
    selectedSite.value = sites.value[0];
  }
});
watch(selectedSite, (newSite) => {
  if (newSite && JSON.stringify(newSite) !== localStorage.getItem('Site')) {
    localStorage.setItem('Site', JSON.stringify(newSite));
    window.location.reload();
  }
});
</script>

<template>
  <select v-model="selectedSite" class="select select-bordered join-item text-md lg:text-xl font-bold m-2">
    <option disabled v-show="!selectedSite">Selectionner un site</option>
    <option v-for="site in sites" :value="site">{{ toTitleCase(site.site_name) }}</option>
  </select>
</template>