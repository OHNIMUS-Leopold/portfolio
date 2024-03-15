<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ref } from 'vue';
import { themes, currentTheme } from '../assets/utils';

const isRotated = ref(false);

function toggleTheme() {
  isRotated.value = !isRotated.value;
  let nextThemeIndex = Math.floor(Math.random() * themes.length);
  while (themes[nextThemeIndex] === currentTheme.value) {
    nextThemeIndex = Math.floor(Math.random() * themes.length);
  }
  currentTheme.value = themes[nextThemeIndex];
  document.body.className = currentTheme.value;
}

</script>

<template>
    <header class="fixed top-0 left-0 z-10 flex">
        <nav class="font-proto font-light">
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/projects">Projects</RouterLink>
            <RouterLink to="/contact">Contact</RouterLink>
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
  background-color: var(--bg-color);
  border: 2px solid var(--text-color);
  border-radius: 5px;
  outline: none;
  
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
  border-top: 15px solid var(--text-color); 
  border-right: 15px solid transparent; 
  border-bottom: 15px solid transparent; 
  border-left: 15px solid var(--text-color);   
  transition: all 0.2s ease; 
}

.switch-btn:hover::after {
  border-top: 23px solid var(--text-color); 
  border-right: 23px solid transparent; 
  border-bottom: 23px solid transparent; 
  border-left: 23px solid var(--text-color);   
}

</style>