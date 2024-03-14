<script setup lang="ts">
import { onMounted } from 'vue';
import { initializeHoverAnimation } from '@/assets/utils'

onMounted(() => {
  initializeHoverAnimation();
});

</script>


<template>
  <div class="font-proto font-light flex mt-28 space-x-5">
    <p class="">liste</p>
    <p class="">ESSAI EFFET CSS</p>
    <h1 data-value="HYPERPLEXED">HYPERPLEXED</h1>
    <h2 data-value="EXAMPLE">EXAMPLE</h2>
    <h3 data-value="TEXT">TEXT</h3>
    <h4 data-value="EFFECT">EFFECT</h4>
  </div>
</template>