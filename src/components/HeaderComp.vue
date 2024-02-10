<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ref, onMounted } from 'vue';

const themes = ['theme-dark1', 'theme-dark2']; 
const currentTheme = ref(themes[Math.floor(Math.random() * themes.length)]);

function toggleTheme() {
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
        <nav>
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/about">About</RouterLink>
        </nav>

        <div>
            <button @click="toggleTheme">Alterner Thème</button>
        </div>
    </header>
</template>