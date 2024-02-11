<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router';
import HeaderComp from './components/HeaderComp.vue';
import { ref, onMounted } from 'vue';
import { currentTheme } from './assets/utils';

const cursorDot = ref<HTMLElement | null>(null);
const cursorOutline = ref<HTMLElement | null>(null);
const router = useRouter();

const isLoading = ref(true);
const showProgress = ref(true);
const showGreeting = ref(false);
const loadingProgress = ref(0);

const startLoading = () => {
  setTimeout(() => {
    showProgress.value = false;
    showGreeting.value = true;
  }, 4000);

  setTimeout(() => {
    isLoading.value = false;
  }, 6000);
};

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
  document.body.className = currentTheme.value;

  const addEventListeners = () => {
    const linksAndButtons = document.querySelectorAll('a, button'); 
    linksAndButtons.forEach(element => {
      element.addEventListener('mouseenter', () => {
        cursorDot.value?.classList.add('is-active');
        cursorOutline.value?.classList.add('is-active');
      });

      element.addEventListener('mouseleave', () => {
        cursorDot.value?.classList.remove('is-active');
        cursorOutline.value?.classList.remove('is-active');
      });
    });
  };

  addEventListeners();

  router.beforeEach((to, from, next) => {
    const linksAndButtons = document.querySelectorAll('a, button'); 
    linksAndButtons.forEach(element => {
      element.removeEventListener('mouseenter', addEventListeners);
      element.removeEventListener('mouseleave', addEventListeners);
    });

    next();
    setTimeout(() => {
      addEventListeners();
    }, 6100);
  });


  startLoading();

  const updateProgress = () => {
    if (showProgress.value) {
      loadingProgress.value += 1;
      if (loadingProgress.value < 100) {
        setTimeout(updateProgress, 30);
      }
    }
  };

  updateProgress();
});
</script>

<template>

  <transition name="fade">
    <div v-if="isLoading" class="loading-screen" >
      <div v-if="showProgress" class="loading-progress">{{ loadingProgress }}%</div>
      <div v-if="showGreeting" class="loading-greeting">Bonjour</div>
    </div>



  <div v-else>
    <HeaderComp />
    <RouterView />
    <div class="cursor-dot" ref="cursorDot"></div>
    <div class="cursor-outline" ref="cursorOutline"></div>
  </div>

</transition>
</template>


<style>
/* body {
  background-color: black;
  color: white;
} */


@media (min-width: 1024px) { 

  *, button {
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
    transition: width 0.3s ease-in-out, height 0.3s ease-in-out;
  }

  .cursor-dot.is-active {
    width: 50px;
    height: 50px;
    background-color: red;
    border: 2px solid red;
    transition: width 0.3s ease-in-out, height 0.3s ease-in-out;
    /* mix-blend-mode: lighten; */
  }

  .cursor-outline {
    width: 50px;
    height: 50px;
    border: 2px solid red;
    opacity: 0;
    transition: width 0.3s ease-in-out, height 0.3s ease-in-out;
  }

  .cursor-outline.is-active {
    width: 0px;
    height: 0px;
    border: none;
    transition: width 0.3s ease-in-out, height 0.3s ease-in-out;
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

  .cursor-dot::before {
    content: '';
    position: absolute;
    width: 0px;
    height: 0px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: red;
    border-radius: 50%;
    opacity: 0.2;
    transition: width 0.3s ease-in-out, height 0.3s ease-in-out, opacity 0.3s ease-in-out;
  }

  .cursor-dot.is-active::before {
    width: 200px;
    height: 200px;
    opacity: 0;
  }

}

.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.loading-progress {
  font-size: 24px;
}

.loading-greeting {
  font-size: 36px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

</style>