<script setup lang="ts">
import { initializeHoverAnimation } from '@/assets/utils'
import { ref, onMounted, computed, onUpdated } from 'vue';
import { RouterLink } from 'vue-router';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getStorage, ref as storageRef, getDownloadURL } from 'firebase/storage';
import type { Project } from '@/types';

const db = getFirestore();
const projects = ref<Project[]>([]);

onMounted(async () => {
  const projectsCollection = collection(db, 'projects');
  const querySnapshot = await getDocs(projectsCollection);
  const projectsList: Project[] = [];
  querySnapshot.forEach((doc) => {
    const project = doc.data() as Project;
    projectsList.push({ ...project, id: doc.id });
  });

  projectsList.sort((a, b) => a.year - b.year);

  await Promise.all(projectsList.map(async (project) => {
    const imageUrl = await getImageUrl(project.image);
    project.imageUrl = imageUrl;
  }));

  projects.value = projectsList;

  // console.log(projects.value[0].imageUrl);

  initializeHoverAnimation();

  if (projects.value.length > 0) {
    selectedProjectId.value = projects.value[Math.floor(projects.value.length / 2)].id;
  }
});


const getImageUrl = async (imageName: string): Promise<string> => {
  try {
    const storage = getStorage();
    const imageRef = storageRef(storage, `projects/${imageName}`); 
    return await getDownloadURL(imageRef);
  } catch (error) {
    console.error(`Error getting image URL for ${imageName}:`, error);
    return '';
  }
};


onUpdated(() => {
  initializeHoverAnimation();
});

let selectedProjectId = ref<string | null>(null);

const updateSelectedProjectId = (event: Event, id: string) => {
  if ((event.target as HTMLInputElement).checked) {
    selectedProjectId.value = id;
  }
};

const selectProject = (id: string) => {
  selectedProjectId.value = id;
  const radioButton = document.getElementById(id) as HTMLInputElement;
  if (radioButton) {
    radioButton.checked = true;
  }
}; // @click="selectProject(project.id)"

const showPreviousProject = () => {
  const currentIndex = projects.value.findIndex(project => project.id === selectedProjectId.value);
  if (currentIndex > 0) {
    selectProject(projects.value[currentIndex - 1].id);
  }
};

const showNextProject = () => {
  const currentIndex = projects.value.findIndex(project => project.id === selectedProjectId.value);
  if (currentIndex < projects.value.length - 1) {
    selectProject(projects.value[currentIndex + 1].id);
  }
};

const selectedProjectInfo = computed(() => {
  const selectedProject = projects.value.find(project => project.id === selectedProjectId.value);
  return selectedProject;
});

</script>

<template>
    <div class="mt-32">
        <div class="flex items-center justify-between">
            <div class="flex items-center space-x-5">
                <button class="font-noto text-xs font-semibold text-[var(--accent-color)]" @click="showPreviousProject">PREV</button>
                <div class="indicator">
                    <div v-for="project in projects" :key="project.id" class="circle" :class="{ 'active': selectedProjectId === project.id }"></div>
                </div>
                <button class="font-noto text-xs font-semibold text-[var(--accent-color)]" @click="showNextProject">NEXT</button>
            </div>
            <div class="container">
                <div class="contents carousel" v-for="(project, index) in projects" :key="project.id">
                    <div class="contents">
                        <input type="radio" name="slide" :id="project.id" :checked="index === Math.floor(projects.length / 2)" @change="updateSelectedProjectId($event, project.id)">
                        <label :for="project.id" class="card" :style="{ 'background-image': 'url(' + project.imageUrl + ')' }"></label>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <RouterLink data-value="Project ->" class="btn" v-if="selectedProjectInfo?.name" :to="{ name: 'single-project', params: { name: selectedProjectInfo.name } }">
                Project ->
            </RouterLink>
        </div>

    </div>
</template>



<style scoped>

.container {
    height: 300px;
    display: flex;
    justify-content: center;
    width: 643px;
}

.card {
    width: 40px;
    min-width: 20px;
    background-size: cover;
    background-position: center center;
    overflow: hidden;
    margin: 0 4px; /* calculés sur 5px */
    display: flex;
    align-items: flex-end;
    transition: .6s cubic-bezier(.28,-0.03,0,.99);
    box-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--text-color);
}

input {
    display: none;
}

input:checked + label {
    width: 533px;
    min-width: 450px;
}

.indicator {
    display: flex;
    justify-content: center;
    gap: 60px;
}

.circle {
  width: 2px;
  height: 4px;
  background-color: var(--accent-color);
  transition: .6s cubic-bezier(.28,-0.03,0,.99);
}

.circle.active {
  width: 34px;
}











.btn{
  background: none;
  border: 1px solid var(--text-color);
  padding: 4px 10px;
  min-width: 200px;
  position: relative;
  border-radius: 4px;
  font-family: Proto-Mono, sans-serif;
  font-size: 14px;
}
.btn:hover{
  color: var(--bg-color);
}
.btn::before{
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



</style>