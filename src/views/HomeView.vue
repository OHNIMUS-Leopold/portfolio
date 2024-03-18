<script setup lang="ts">
import { initializeHoverAnimation } from '@/assets/utils';
import CarouselComp from '@/components/CarouselComp.vue';
import { ref, onMounted } from 'vue';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import type { Project } from '@/types';

const db = getFirestore();
const projects = ref<Project[]>([]);

onMounted(async () => {
  initializeHoverAnimation();
  const projectsCollection = collection(db, 'projects');
  const querySnapshot = await getDocs(projectsCollection);
  const projectsList: Project[] = [];
  querySnapshot.forEach((doc) => {
    const project = doc.data() as Project;
    projectsList.push({ ...project, id: doc.id });
  });

  projectsList.sort((a, b) => a.year - b.year);

  projects.value = projectsList;
});
</script>

<template>
    
  <div class="">

    <div class="col-span-11 grid grid-cols-10">
      <div class="col-span-1"></div>
      <div class="col-span-4 mt-14">
        <p class="font-proto text-xs font-medium leading-6">
          Léopold OHNIMUS is currently studying multimedia and internet technologies. He is particularly interested in web development and aims to become a fullstack web developer in the future. 
          <br>
          Based in France.
        </p>
      </div>
      <div class="col-span-3"></div>
      <div class="col-span-2 mt-20 font-proto text-3xl font-semibold text-[var(--accent-color)] text-right">
        <p>Portfolio</p>
        <p>/2024</p>
      </div>
    </div>



    <CarouselComp class="col-span-11" />
    <!-- <h1>Liste des projets</h1>
    <ul class="list-disc">
      <li v-for="project in projects" :key="project.id">
        <RouterLink :to="{ name: 'single-project', params: { name: project.name } }">
          {{ project.name }}
        </RouterLink>
      </li>
    </ul> -->

  </div>

</template>


<style scoped>

</style>