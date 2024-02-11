<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ref, onMounted } from 'vue';

const isRotated = ref(false);

const themes = ['theme-dark1', 'theme-dark2']; 
const currentTheme = ref(themes[Math.floor(Math.random() * themes.length)]);

function toggleTheme() {
  isRotated.value = !isRotated.value;
  const nextTheme = themes.find(theme => theme !== currentTheme.value);
  if (nextTheme) {
    currentTheme.value = nextTheme;
    document.body.className = currentTheme.value;
  }
}

onMounted(() => {
  document.body.className = currentTheme.value;
});
</script>

<template>
    <header class="fixed top-0 left-0 z-10 flex">
        <nav class="font-proto font-light">
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/about">About</RouterLink>
        </nav>

        <div>
            <button class="switch-btn" :class="{ rotated: isRotated }" @click="toggleTheme"></button>
        </div>
    </header>
</template>



<style scoped>

.switch-btn {
  width: 32px;
  height: 32px;
  background-color: gray;
  border: 2px solid black;
  
  position: relative;

  transition: transform 0.2s ease;
  overflow: hidden;
}

.switch-btn.rotated {
  transform: rotate(180deg);
}

.switch-btn::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  border-top: 15px solid black; 
  border-right: 15px solid transparent; 
  border-bottom: 15px solid transparent; 
  border-left: 15px solid black;   
  transition: all 0.2s ease; 
}

.switch-btn:hover::after {
  border-top: 23px solid black; 
  border-right: 23px solid transparent; 
  border-bottom: 23px solid transparent; 
  border-left: 23px solid black;   
}

</style>