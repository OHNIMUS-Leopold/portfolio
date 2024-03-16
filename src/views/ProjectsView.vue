<script setup lang="ts">
import { initializeHoverAnimation } from '@/assets/utils'
import { onMounted } from 'vue';
import CarouselComp from '@/components/CarouselComp.vue';

onMounted(() => {
  initializeHoverAnimation();
});

</script>


<template>
  <div class="font-proto font-light flex mt-28 space-x-5">
    <p class="">liste</p>
    <p class="text-[var(--accent-color)]">ESSAI EFFET CSS</p>
    <h1 data-value="HYPERPLEXED">HYPERPLEXED</h1>
    <h2 data-value="EXAMPLE">EXAMPLE</h2>
    <h3 data-value="TEXT">TEXT</h3>
    <h4 data-value="EFFECT">EFFECT</h4>
  </div>

  <CarouselComp />

</template>


