<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { toTitleCase, convertDate, convertDateToISO } from '../utils.js';

const bassins = ref([]);
const bassinLoading = ref(true);
const dataLoading = ref(false);
const selectedBassin = ref(null);
const selectedType = ref('chlore')
const selectedPeriode = ref(null);
const bassinData = ref(null);
const liveData = ref(null);
const oldData = ref(null);
const route = useRoute();
const chart = ref(null);
const setType = (type) => {
  selectedType.value = type;
};
const chartOptions = ref({
  chart: {
    type: "line",
    height: '100%',
    width: '100%',
  },
   stroke: {
    curve: 'smooth',
    colors: ['#000000']
  },
  responsive: [{
    breakpoint: 480,
    options: {
      chart: {
        width: '100%',
      },
    },
  }],
  xaxis: {
    type: "datetime",
  },
});
const chartSeries = ref([]);

onMounted(async () => {
  bassinLoading.value = true;
  const response = await axios.get('http://fibre.larocheposay-vacances.com:3000/bassins/');
  bassins.value = response.data.filter(b => b.site === route.params.name);
  bassinLoading.value = false;
});

watch([selectedBassin], async ([bassin]) => {
  if (bassin) {
    const type = selectedType.value;
    dataLoading.value = true;
    const response = await axios.get(`http://fibre.larocheposay-vacances.com:3000/live_data/${bassin.id}`);
    liveData.value = response.data[0];
    const oldResponse = await axios.get(`http://fibre.larocheposay-vacances.com:3000/data/${bassin.id}`);
    bassinData.value = oldResponse.data;
    oldData.value = oldResponse.data.find(d => {
      const oldDate = convertDate(d.date);
      const currentDate = convertDate(liveData.value.date);
      return oldDate === currentDate - 24 * 60 * 60 * 1000;
    });
    const seriesData = bassinData.value.map(d => {
      return {
       x: new Date(convertDateToISO(d.date)).getTime(),
        y: parseFloat(d[type])
      };
    });
    chartSeries.value = [{
      name: type,
      data: seriesData,
    }];
    dataLoading.value = false;
  }
}, { immediate: true });

watch([selectedType], async ([type]) => {
if (bassinData.value && type) {
  const seriesData = bassinData.value.map(d => {
    return {
      x: new Date(convertDateToISO(d.date)).getTime(),
      y: parseFloat(d[type])
    };
  });
  chartSeries.value = [{
    name: type,
    data: seriesData,
  }];
}
}, { immediate: true });

watch([selectedPeriode], ([periode]) => {
  if (periode) {
    const now = new Date().getTime();
    let min;
    switch(periode) {
      case '1h':
        min = now - 60 * 60 * 1000;
        break;
      case '24h':
        min = now - 24 * 60 * 60 * 1000;
        break;
      case '7j':
        min = now - 7 * 24 * 60 * 60 * 1000;
        break;
      case '30j':
        min = now - 30 * 24 * 60 * 60 * 1000;
        break;
    }
    chartOptions.value.xaxis = {
      type: "datetime",
      min: min,
      max: now
    };
    chart.value.updateOptions({
      xaxis: {
        min: min,
        max: now
      }
    });
  }
}, { immediate: true });

</script>

<template>
  <div class="flex justify-between items-center m-2 lg:m-6">
    <div class="lg:text-3xl breadcrumbs">
      <ul>
        <li class="font-bold"><RouterLink to="/">{{ toTitleCase($route.params.name) }}</RouterLink></li>
        <li class="font-bold"><RouterLink :to="'/camping/'+$route.params.name">Services</RouterLink></li>
        <li class="font-bold"><a>Piscine</a></li> 
      </ul>
    </div>
    <div>
      <button class="btn btn-primary btn-xs lg:btn-primary lg:btn"><RouterLink :to="'/camping/'+$route.params.name+'/piscine/regulation'">Régulations</RouterLink></button>
    </div>
    </div>
    <div class="flex items-center justify-center">
      <span class="loading loading-spinner loading-lg"  v-if="bassinLoading"></span>
      <div v-if="bassins && bassins.length > 0 && !bassinLoading" class="join">
       <input :value='bassin' v-for="bassin in bassins" class="join-item btn btn-sm lg:btn-lg text-xs lg:text-2xl" type="radio" name="bassin" :aria-label="bassin.nom" :key='bassin.id' v-model="selectedBassin" />
      </div>
       <div class="text-xl lg:text-3xl font-bold mt-10" v-if=" bassins.length == 0 && !bassinLoading">
        Désole, ce camping n'a pas de bassin!
      </div>
    </div>
    <div class="flex items-center justify-center mt-5" v-if="!dataLoading && liveData">
      <div class="stats shadow">
        <div class="stat place-items-center">
          <div class="stat-title text-xs lg:text-2xl">Chlore</div>
          <div class="stat-value text-sm lg:text-3xl">{{ liveData?.chlore }}</div>
          <div class="stat-desc text-xs lg:text-xl">
            {{ (liveData.chlore - oldData?.chlore) > 0 ? '↗︎' : '↘︎' }} 
            {{ (liveData.chlore - oldData?.chlore).toFixed(2) }} 
            ({{ ((liveData.chlore - oldData?.chlore) / oldData?.chlore * 100).toFixed(1) }}%)
          </div>
          <div @click="setType('chlore')" class="btn btn-xs lg:btn mt-2">voir</div>
        </div>
        
        <div class="stat place-items-center">
          <div class="stat-title text-xs lg:text-2xl">Ph</div>
          <div class="stat-value text-sm lg:text-3xl" :class="{'text-error': liveData?.ph < 7}">{{ liveData?.ph }}</div>
          <div class="stat-desc text-xs lg:text-xl" :class="{'text-error': liveData?.ph - oldData?.ph < 0}">
            {{ (liveData?.ph - oldData?.ph) > 0 ? '↗︎' : '↘︎' }} 
            {{ (liveData?.ph - oldData?.ph).toFixed(2) }} 
            ({{ ((liveData?.ph - oldData?.ph) / oldData?.ph * 100).toFixed(1) }}%)
          </div>
           <div @click="setType('ph')" class="btn btn-xs lg:btn mt-2">voir</div>
        </div>
        
        <div class="stat place-items-center">
          <div class="stat-title text-xs lg:text-2xl">Temp</div>
          <div class="stat-value text-sm lg:text-3xl">{{ liveData?.temp }}°C</div>
          <div class="stat-desc text-xs lg:text-xl">
            {{ (liveData?.temp - oldData?.temp) > 0 ? '↗︎' : '↘︎' }} 
            {{ (liveData?.temp - oldData?.temp).toFixed(2) }}°C 
            ({{ ((liveData?.temp - oldData?.temp) / oldData?.temp * 100).toFixed(1) }}%)
          </div>
          <div @click="setType('temp')" class="btn btn-xs lg:btn mt-2">voir</div>
        </div>
        
      </div>
    </div>
    <div class="flex items-center justify-center mt-20" v-if="dataLoading"><span class="loading loading-spinner loading-lg"></span></div>
     <div class="flex items-center justify-center mt-5 text-xl lg:text-3xl font-bold"  v-if="!liveData && bassins && bassins.length > 0 " >
      Veuillez selectionner un bassin
    </div>
     <div class="flex justify-between items-center mx-5 lg:mx-20">
      <div v-if="!dataLoading && liveData" class="join mt-5">
        <input value='1h' class="join-item btn btn-xs lg:btn text-xs lg:text-lg" type="radio" name="options" aria-label="1h" key='1h' v-model="selectedPeriode" />
        <input value='24h' class="join-item btn btn-xs lg:btn text-xs lg:text-lg" type="radio" name="options" aria-label="24h" key='24h' v-model="selectedPeriode" />
        <input value='7j' class="join-item btn btn-xs lg:btn text-xs lg:text-lg" type="radio" name="options" aria-label="7j" key='7j' v-model="selectedPeriode" />
        <input value='30j' class="join-item btn btn-xs lg:btn text-xs lg:text-lg" type="radio" name="options" aria-label="30j" key='30j' v-model="selectedPeriode" />
      </div>

      <div v-if="!dataLoading && liveData" class="join mt-5">
        <button class="btn btn-xs lg:btn lg:btn-primary btn-primary">{{ toTitleCase(selectedType) }}</button>
      </div>
    </div>

      <div class="lg:flex lg:justify-center lg:items-center">
        <div class="lg:w-1/2 mt-5" v-if="!dataLoading && liveData">
          <apexchart ref="chart" class="card bg-base-200" v-if="!dataLoading && liveData" type="line" :options="chartOptions" :series="chartSeries"></apexchart>
        </div>
      </div>
</template>