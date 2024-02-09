<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import HeaderComp from './components/HeaderComp.vue';
import { ref, onMounted } from 'vue'

const cursorDot = ref<HTMLElement | null>(null);
const cursorOutline = ref<HTMLElement | null>(null);
const router = useRouter();

window.addEventListener("mousemove", function (e) {
  const posX = e.clientX;
  const posY = e.clientY;

  if (cursorDot.value && cursorOutline.value) {
    cursorDot.value.style.left = `${posX}px`;
    cursorDot.value.style.top = `${posY}px`;

    cursorOutline.value.animate([
      { left: `${cursorOutline.value.style.left}`, top: `${cursorOutline.value.style.top}` },
      { left: `${posX}px`, top: `${posY}px` }
    ], {
      duration: 1000,
      fill: "forwards"
    });
  }
});

onMounted(() => {
  const addEventListeners = () => {
    const links = document.querySelectorAll('a');

    links.forEach(link => {
      link.addEventListener('mouseover', () => {
        cursorDot.value?.classList.add('is-active');
        cursorOutline.value?.classList.add('is-active');
      });

      link.addEventListener('mouseleave', () => {
        cursorDot.value?.classList.remove('is-active');
        cursorOutline.value?.classList.remove('is-active');
      });
    });
  };

  addEventListeners();

  router.beforeEach((to, from, next) => {
    const links = document.querySelectorAll('a');
    links.forEach(link => {
      link.removeEventListener('mouseover', addEventListeners);
      link.removeEventListener('mouseleave', addEventListeners);
    });

    next();
    setTimeout(() => {
      addEventListeners();
    });
  });
});

</script>

<template>
  <HeaderComp />

  <RouterView />

  <div class="cursor-dot" ref="cursorDot"></div>
  <div class="cursor-outline" ref="cursorOutline"></div>
</template>


<style>
/* body {
  background-color: black;
  color: white;
} */

* {
  cursor: none;
}

.element:hover {
  cursor: none; 
}

.cursor-dot {
  width: 12px;
  height: 12px;
  background-color: red;
  opacity: 0.8;
  transition: width 0.3s, height 0.3s;
}

.cursor-dot.is-active {
  width: 50px;
  height: 50px;
  background-color: red;
  border: 2px solid red;
  transition: width 0.3s, height 0.3s;
  mix-blend-mode: lighten;
}

.cursor-outline {
  width: 50px;
  height: 50px;
  border: 2px solid red;
  opacity: 0;
  transition: width 0.3s, height 0.3s;
}

.cursor-outline.is-active {
  width: 0px;
  height: 0px;
  border: none;
  transition: width 0.3s, height 0.3s;
}

.cursor-dot,
.cursor-outline {
  position: fixed;
  top: 50%;
  left: 50%;
  pointer-events: none;
  z-index: 20;
  border-radius: 50%;
  transform: translate(-50%, -50%);
}

</style>