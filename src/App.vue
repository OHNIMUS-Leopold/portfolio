<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router';
import HeaderComp from './components/HeaderComp.vue';
import { ref, onMounted, nextTick } from 'vue';
import { currentTheme } from './assets/utils';
//@ts-ignore
import baffle from 'baffle';

const cursorDot = ref<HTMLElement | null>(null);
const cursorOutline = ref<HTMLElement | null>(null);
const router = useRouter();

const isLoading = ref(true);
const showProgress = ref(true);
const showGreeting = ref(false);
const loadingProgress = ref(0);
const currentDate = ref('');

const formatDate = () => {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  const month = monthNames[now.getMonth()];
  currentDate.value = `${day}/${month}`;
};

const startLoading = () => {
  setTimeout(() => {
    showProgress.value = false;
    showGreeting.value = true;
  }, 2500);

  setTimeout(() => {
    isLoading.value = false;
  }, 5000);
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
    const linksAndButtons = document.querySelectorAll('label'); // a, button, 
    linksAndButtons.forEach(element => {
      element.addEventListener('mouseenter', () => {
        cursorDot.value?.classList.add('is-active');
        cursorOutline.value?.classList.add('is-active');
      });

      element.addEventListener('mouseleave', () => {
        cursorDot.value?.classList.remove('is-active');
        cursorOutline.value?.classList.remove('is-active');
      });
      
      element.addEventListener('click', () => {
        cursorDot.value?.classList.add('is-clicked');
        cursorOutline.value?.classList.add('is-clicked');
        cursorDot.value?.classList.add('is-active');
        cursorOutline.value?.classList.add('is-active');
        setTimeout(() => {
          cursorDot.value?.classList.remove('is-clicked');
          cursorOutline.value?.classList.remove('is-clicked');
          cursorDot.value?.classList.remove('is-active');
          cursorOutline.value?.classList.remove('is-active');
        }, 300);
      });
    });
  };
setTimeout(() => {
  addEventListeners();
  console.log('elSTART');
}, 5500);


  formatDate();
  nextTick(() => {
    setTimeout(() => {
      const text = baffle(document.querySelector('.data'));
      text.set({
        characters : '█▓█ ▒░/▒░ █░▒▓/ █▒▒ ▓▒▓/█ ░█▒/ ▒▓░ █<░▒ ▓/░>',
        speed: 120
      });
      text.start();
      text.reveal(2000);
    }, 2500);  // Démarrer l'animation 
  });

  nextTick(() => {
  setTimeout(() => {
      const text2 = baffle(document.querySelector('.data2'));
      text2.set({
        characters : '█▓█ ▒░/▒░ █░▒▓/ █▒▒ ▓▒▓/█ ░█▒/ ▒▓░ █<░▒ ▓/░>',
        speed: 120
      });
      text2.start();
      text2.reveal(1000);
    }, 2500);  // Démarrer l'animation 
  });

  router.beforeEach((to, from, next) => {
    const linksAndButtons = document.querySelectorAll('label'); // a, button, 
    linksAndButtons.forEach(element => {
      element.removeEventListener('mouseenter', addEventListeners);
      element.removeEventListener('mouseleave', addEventListeners);
      element.removeEventListener('click', addEventListeners);
    });

    cursorDot.value?.classList.remove('is-active', 'is-clicked');
    cursorOutline.value?.classList.remove('is-active', 'is-clicked');

    next();
    setTimeout(() => {
      addEventListeners();
      console.log('elROUTE');
    }, 500);
  });


  startLoading();

  const updateProgress = () => {
    if (showProgress.value) {
      loadingProgress.value += 1;
      if (loadingProgress.value < 100) {
        setTimeout(updateProgress, 20);
      }
    }
  };

  updateProgress();
});
</script>

<template>

  <transition name="fade">
    <div v-if="isLoading" class="loading-screen" >
      <div v-if="showProgress" class="loading-progress">
        <p class="font-proto text-[var(--accent-color)]">{{ loadingProgress }}%</p>
      </div>
      <div v-if="showGreeting" class="loading-greeting">
        <div>
          <p class="data font-proto text-[var(--accent-color)]">{{ currentDate }}</p>
          <br>
          <p class="data2 font-proto text-[var(--accent-color)]">Léopold OHNIMUS</p>
        </div>
      </div>
    </div>



  <div v-else>
    <HeaderComp />
    <RouterView v-slot="{ Component }">
      <transition name="page-opacity">
        <component :is="Component" />
      </transition>
    </RouterView>
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
    background-color: var(--accent-color);
    opacity: 0.8;
    transition: width 0.3s ease-in-out, height 0.3s ease-in-out;
  }

  .cursor-dot.is-active {
    width: 50px;
    height: 50px;
    background-color: var(--accent-color);
    border: 2px solid var(--accent-color);
    transition: width 0.3s ease-in-out, height 0.3s ease-in-out;
    /* mix-blend-mode: exclusion; */
  }

  .cursor-outline {
    width: 50px;
    height: 50px;
    border: 2px solid var(--accent-color);
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
    background-color: var(--accent-color);
    border-radius: 50%;
    opacity: 0.2;
    transition: width 0.3s ease-in-out, height 0.3s ease-in-out, opacity 0.3s ease-in-out;
  }

  .cursor-dot.is-active::before {
    width: 200px;
    height: 200px;
    opacity: 0;
  }

  .cursor-dot.is-clicked,
  .cursor-outline.is-clicked {
    animation: clickAnimation 0.3s ease-in-out;
  }


  @keyframes clickAnimation {
    0% { transform: scale(1) translate(-50%, -50%); } /* Ajustement de la position initiale */
    50% { transform: scale(1.2) translate(-42%, -42%); } /* Ajustement de la position à mi-animation */
    100% { transform: scale(1) translate(-50%, -50%); } /* Retour à la position initiale */
  }

}

.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--bg-color);
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





.page-opacity-enter-active {
  animation: anim 1s ease-in;
}

@keyframes anim {
  0% { opacity: 0; }
  50% { opacity: 0; }
  100% { opacity: 1; }
}

.page-opacity-leave-active {
  animation: animU 0.3s ease-in;
}

@keyframes animU {
  0% { transform: translateX(0); }
  100% { transform: translateX(-100%); }
}


body {
  overflow: hidden;
  width: 100%;
  height: 100%;
}


</style>