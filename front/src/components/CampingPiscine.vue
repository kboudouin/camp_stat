<script setup>
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';
import { toTitleCase, convertDate, convertDateToISO } from '../utils.js';

const bassins = ref([]);
const bassinLoading = ref(true);

const dataLoading = ref(false);
const selectedBassin = ref(null);
const selectedType = ref('temp')
const selectedPeriode = ref('24h');
const bassinData = ref(null);
const liveData = ref(null);
const oldData = ref(null);
const chart = ref(null);
const chartSeries = ref([]);
const savedSite = ref(JSON.parse(localStorage.getItem('Site')));

let strokeColor = '#000000';

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  strokeColor = '#ffffff';
}

const setType = (type) => {
  selectedType.value = type;
};
const setPeriode = (periode) => {
  selectedPeriode.value = periode;
};
const setBassin = (bassin) => {
  selectedBassin.value = bassin;
};

const chartOptions = ref({
  chart: {
    type: "line",
    height: '100%',
    width: '100%',
  },
   stroke: {
    curve: 'smooth',
    colors: [strokeColor],
    width: 2 
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
    labels: {
      show: true,
      formatter: function(value, timestamp) {
        let date = new Date(timestamp);
        return date.toLocaleDateString('en-GB', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Paris' });
      }
    }
  },
  tooltip: {
    x: {
      format: 'dd MMM HH:mm'
    }
  },
});

onMounted(async () => {
  bassinLoading.value = true;
  const response = await axios.get(`http://fibre.larocheposay-vacances.com:3000/bassins/${savedSite.value.site_id}`);
  bassins.value = response.data
  setBassin(bassins.value[0]);
  bassinLoading.value = false;
});

watch([selectedBassin], async ([bassin]) => {
  if (bassin) {
    const type = selectedType.value;
    dataLoading.value = true;
    const response = await axios.get(`http://fibre.larocheposay-vacances.com:3000/bassin_data/${bassin.bassin_id}/live`);
    liveData.value = response.data[0];
    const oldResponse = await axios.get(`http://fibre.larocheposay-vacances.com:3000/bassin_data/${bassin.bassin_id}`);
    bassinData.value = oldResponse.data;
    const now = new Date();
    const twentyFourHoursAgo = now.getTime() - 24 * 60 * 60 * 1000;
    bassinData.value = oldResponse.data.filter(d => {
      const dDate = new Date(convertDateToISO(d.date)).getTime();
      return dDate >= twentyFourHoursAgo;
    });
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

</script>

<template>
    <div class="flex items-center justify-center">
      <span class="loading loading-spinner loading-lg"  v-if="bassinLoading"></span>
      <div v-if="bassins && bassins.length > 0 && !bassinLoading" class="join">
       <button v-for="bassin in bassins" @click="setBassin(bassin)" class="join-item btn btn-xs lg:btn text-xs lg:text-2xl"  :class="{'btn-primary lg:btn-primary': selectedBassin === bassin}" name="bassin" :key='bassin.id'>{{ bassin.nom }}</button>
      </div>
       <div class="text-xl lg:text-3xl font-bold mt-10" v-if=" bassins.length == 0 && !bassinLoading">
        Désole, ce camping n'a pas de bassin!
      </div>
    </div>
    <div class="flex items-center justify-center mt-5" v-if="!dataLoading && liveData">
      <div class="stats">
        <div @click="setType('chlore')" class="stat place-items-center" :class="{'bg-base-300': selectedType === 'chlore'}">
          <div class="stat-title text-xs lg:text-lg">Chlore</div>
          <div class="stat-value text-sm lg:text-xl">{{ liveData?.chlore }}</div>
          <div class="stat-desc text-xs lg:text-lg">
            {{ (liveData.chlore - oldData?.chlore) > 0 ? '↗︎' : '↘︎' }} 
            {{ (liveData.chlore - oldData?.chlore).toFixed(2) }} 
            ({{ ((liveData.chlore - oldData?.chlore) / oldData?.chlore * 100).toFixed(1) }}%)
          </div>
        </div>
        
        <div @click="setType('ph')" class="stat place-items-center" :class="{'bg-base-300': selectedType === 'ph'}">
          <div class="stat-title text-xs lg:text-lg">Ph</div>
          <div class="stat-value text-sm lg:text-xl" :class="{'text-error': liveData?.ph < 7}">{{ liveData?.ph }}</div>
          <div class="stat-desc text-xs lg:text-lg" :class="{'text-error': liveData?.ph - oldData?.ph < 0}">
            {{ (liveData?.ph - oldData?.ph) > 0 ? '↗︎' : '↘︎' }} 
            {{ (liveData?.ph - oldData?.ph).toFixed(2) }} 
            ({{ ((liveData?.ph - oldData?.ph) / oldData?.ph * 100).toFixed(1) }}%)
          </div>
        </div>
        
        <div @click="setType('temp')" class="stat place-items-center" :class="{'bg-base-300': selectedType === 'temp'}">
          <div class="stat-title text-xs lg:text-lg">Temp</div>
          <div class="stat-value text-sm lg:text-xl">{{ liveData?.temp }}°C</div>
          <div class="stat-desc text-xs lg:text-lg">
            {{ (liveData?.temp - oldData?.temp) > 0 ? '↗︎' : '↘︎' }} 
            {{ (liveData?.temp - oldData?.temp).toFixed(2) }}°C 
            ({{ ((liveData?.temp - oldData?.temp) / oldData?.temp * 100).toFixed(1) }}%)
          </div>
        </div>
        
      </div>
    </div>
    <div class="flex items-center justify-center mt-20" v-if="dataLoading"><span class="loading loading-spinner loading-lg"></span></div>
     <div class="flex items-center justify-center mt-5 text-xl lg:text-3xl font-bold"  v-if="!liveData && bassins && bassins.length > 0 " >
      Veuillez selectionner un bassin
    </div>
     <div class="flex justify-between items-center mx-5 lg:mx-20">
      <div v-if="!dataLoading && liveData" class="join mt-5">
        <button @click="setPeriode('1h')" class="btn btn-xs lg:btn join-item"  :class="{'lg:btn-primary btn-primary': selectedPeriode === '1h'}">1h</button>
        <button @click="setPeriode('24h')" class="btn btn-xs lg:btn join-item"  :class="{'lg:btn-primary btn-primary': selectedPeriode === '24h'}">24h</button>
        <button @click="setPeriode('7j')" class="btn btn-xs lg:btn join-item"  :class="{'lg:btn-primary btn-primary': selectedPeriode === '7j'}">7j</button>
        <button @click="setPeriode('30j')" class="btn btn-xs lg:btn join-item"  :class="{'lg:btn-primary btn-primary': selectedPeriode === '30j'}">30j</button>
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