<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ref } from 'vue';
import { themes, currentTheme } from '@/assets/utils';

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
    <header class="fixed top-0 left-0 z-10 pt-[52px] px-11 flex justify-between w-full">

      <div class="font-proto font-semibold text-5xl text-[var(--accent-color)]">
        <p data-value="Léopold OHNIMUS">
          Léopold OHNIMUS
        </p>
      </div>

      <div class="flex gap-5">
        <nav class="font-proto font-semibold text-sm">
            <ul class="flex space-x-5">
              <RouterLink class="btn" to="/">
                <li data-value="Home">
                  Home
                </li>
              </RouterLink>
              <RouterLink class="btn" to="/contact">
                <li data-value="Contact">
                  Contact
                </li>
              </RouterLink>
            </ul>
        </nav>
        <div class="contents">
            <button class="switch-btn" :class="{ rotated: isRotated }" @click="toggleTheme"></button>
        </div>
      </div>
    </header>
</template>



<style scoped>

.switch-btn {
  width: 21px; /* 32px */
  height: 21px;
  background-color: var(--bg-color);
  border: 1px solid var(--text-color); /* 2px */
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
  border-top: 11px solid var(--text-color);   /* 15px puis 16*/
  border-right: 11px solid transparent; 
  border-bottom: 11px solid transparent; 
  border-left: 11px solid var(--text-color);   
  transition: all 0.2s ease; 
}

.switch-btn:hover::after {
  border-top: 16px solid var(--text-color);   /* 23px */
  border-right: 16px solid transparent; 
  border-bottom: 16px solid transparent; 
  border-left: 16px solid var(--text-color);   
}







.btn{
  background: none;
  border: 1px solid var(--text-color);
  padding: 0px 10px 0px 10px;
  position: relative;
  border-radius: 4px;
}
.btn:hover{
  color: var(--bg-color);
}
.btn::before{
  border-radius: 2px;
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: var(--text-color);
  z-index: -1;
  transition: transform 0.3s;
  transform-origin: 0 0;
  transition-timing-function: ease-in-out;
  transform: scaleX(0);
}


.btn:hover::before{
  transform: scaleX(1);
}







li {
  display: flex;
  align-items: center;
}

li::before {
  content: "";
  width: 0.3rem;
  height: 0.3rem;
  /* margin-top: 1px; */
  margin-right: 6px;
  background: var(--text-color);
}

.btn:hover li::before {
  background: var(--bg-color);
}

</style>