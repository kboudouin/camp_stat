<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { toTitleCase, convertDate } from '../utils.js';

const bassins = ref([]);
const selectedBassin = ref(null);
const liveData = ref(null);
const oldData = ref(null);
const route = useRoute();

onMounted(async () => {
  const response = await axios.get('http://fibre.larocheposay-vacances.com:3000/bassins/');
  bassins.value = response.data.filter(b => b.site === route.params.name);
});

watch(selectedBassin, async (bassin) => {
  if (bassin) {
    const response = await axios.get(`http://fibre.larocheposay-vacances.com:3000/live_data/${bassin.id}`);
    liveData.value = response.data[0];
    const oldResponse = await axios.get(`http://fibre.larocheposay-vacances.com:3000/data/${bassin.id}`);
    oldData.value = oldResponse.data.find(d => {
      const oldDate = convertDate(d.date);
      const currentDate = convertDate(liveData.value.date);
      return oldDate === currentDate - 24 * 60 * 60 * 1000;
    });
    console.log(oldData.value);
  }
}, { immediate: true });

</script>

<template>
  <div class="flex items-center m-6">
    <div class="text-xl breadcrumbs">
      <ul>
        <li class="font-bold"><RouterLink to="/">Campings</RouterLink></li>
        <li class="font-bold"><a>{{ toTitleCase($route.params.name) }}</a></li> 
      </ul>
    </div>
    </div>
    <div class="flex items-center justify-center">
      <div v-if="bassins && bassins.length > 0" class="join">
       <input :value='bassin' v-for="bassin in bassins" class="join-item btn text-xs lg:text-2xl" type="radio" name="options" :aria-label="bassin.nom" :key='bassin.id' v-model="selectedBassin" />
      </div>
       <div class="text-xl" v-else>
        Ce camping n'a pas de bassin
      </div>
    </div>
    <div class="flex items-center justify-center mt-5" v-if="liveData">
      <div class="stats shadow">
        <div class="stat place-items-center">
          <div class="stat-title text-xs lg:text-2xl">Chlore</div>
          <div class="stat-value text-sm lg:text-3xl">{{ liveData.chlore }}</div>
          <div class="stat-desc text-xs lg:text-xl">
            {{ (liveData.chlore - oldData.chlore) > 0 ? '↗︎' : '↘︎' }} 
            {{ (liveData.chlore - oldData.chlore).toFixed(2) }} 
            ({{ ((liveData.chlore - oldData.chlore) / oldData.chlore * 100).toFixed(1) }}%)
          </div>
          <div class="btn btn-xs lg:btn mt-2">voir</div>
        </div>
        
        <div class="stat place-items-center">
          <div class="stat-title text-xs lg:text-2xl">Ph</div>
          <div class="stat-value text-sm lg:text-3xl">{{ liveData.ph }}</div>
          <div class="stat-desc  text-xs lg:text-xl">
            {{ (liveData.ph - oldData.ph) > 0 ? '↗︎' : '↘︎' }} 
            {{ (liveData.ph - oldData.ph).toFixed(2) }} 
            ({{ ((liveData.ph - oldData.ph) / oldData.ph * 100).toFixed(1) }}%)
          </div>
           <div class="btn btn-xs lg:btn mt-2">voir</div>
        </div>
        
        <div class="stat place-items-center">
          <div class="stat-title text-xs lg:text-2xl">Temp</div>
          <div class="stat-value text-sm lg:text-3xl">{{ liveData.temp }}°C</div>
          <div class="stat-desc text-xs lg:text-xl">
            {{ (liveData.temp - oldData.temp) > 0 ? '↗︎' : '↘︎' }} 
            {{ (liveData.temp - oldData.temp).toFixed(2) }}°C 
            ({{ ((liveData.temp - oldData.temp) / oldData.temp * 100).toFixed(1) }}%)
          </div>
          <div class="btn btn-xs lg:btn mt-2">voir</div>
        </div>
        
      </div>
    </div>
     <div class="flex items-center justify-center mt-5 text-xl"  v-if="!liveData && bassins && bassins.length > 0 " >
      Veuillez selectionner un bassin
    </div>
</template>