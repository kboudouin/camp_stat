<script setup>
import SiteSelector from './components/SiteSelector.vue';
import BottomNav from './components/BottomNav.vue';
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <SiteSelector />
    <router-view />
    <BottomNav class="w-full" />
  </div>
</template>