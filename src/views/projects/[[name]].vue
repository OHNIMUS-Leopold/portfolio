<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import type { Project } from '@/types';
import { useRoute } from 'vue-router';

const db = getFirestore();
const route = useRoute();
const projects = ref<Project[]>([]);
const projectName = computed(() => route.params.name);

onMounted(async () => {
  const projectsCollection = collection(db, 'projects');
  const querySnapshot = await getDocs(projectsCollection);
  const projectsData: Project[] = [];
  querySnapshot.forEach((doc) => {
    const project = doc.data() as Project;
    projectsData.push({ ...project, id: doc.id });
  });
  projects.value = projectsData;
});

const project = computed(() => {
  return projects.value.find(project => project.name === projectName.value) || null;
});
</script>

<template>
    <div class="mt-20">
        <h1>{{ project?.name }}</h1>
        <p>{{ project?.comment }}</p>
    </div>
</template>