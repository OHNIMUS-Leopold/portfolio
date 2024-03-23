<script setup lang="ts">
import { initializeHoverAnimation } from '@/assets/utils';
import CarouselComp from '@/components/CarouselComp.vue';
import { ref, onMounted } from 'vue';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import type { Project } from '@/types';

// const db = getFirestore();
// const projects = ref<Project[]>([]);

onMounted(async () => {
  initializeHoverAnimation();
  // const projectsCollection = collection(db, 'projects');
  // const querySnapshot = await getDocs(projectsCollection);
  // const projectsList: Project[] = [];
  // querySnapshot.forEach((doc) => {
  //   const project = doc.data() as Project;
  //   projectsList.push({ ...project, id: doc.id });
  // });

  // projectsList.sort((a, b) => a.year - b.year);

  // projects.value = projectsList;
});
</script>

<template>
    
  <div>

    <div class="col-span-11 grid grid-cols-10 reset">
      <div class="col-span-1"></div>
      <div class="col-span-4 mt-14 max-[1024px]:mt-10">
        <p class="font-proto text-xs font-medium leading-6">
          Léopold OHNIMUS is currently studying multimedia and internet technologies. He is particularly interested in web development and aims to become a fullstack web developer in the future. 
          <br>
          Based in France.
        </p>
      </div>
      <div class="col-span-3"></div>
      <div class="col-span-2 pb-2 mt-20 font-proto text-3xl font-semibold text-[var(--accent-color)] text-right max-[1024px]:mt-4">
        <h2>Portfolio</h2>
        <h3>/2024</h3>
      </div>
    </div>
    <CarouselComp class="col-span-11" />

  </div>

</template>