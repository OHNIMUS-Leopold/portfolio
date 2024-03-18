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
    <div class="mt-2">
        <!-- <div class="flex justify-between "> -->
        <div class="grille">
            <div class="pr-10 xl:pr-40 self-end mb-8">
                <h1 class="mb-4 font-noto text-4xl font-[500] uppercase text-[var(--accent-color)]">{{ selectedProjectInfo?.name }}</h1>
                <div class="flex flex-wrap font-proto font-semibold text-base mb-12 text-[var(--accent-color)]">
                    <RouterLink data-value="Project Info" class="btn mb-2 mr-2" v-if="selectedProjectInfo?.name" :to="{ name: 'single-project', params: { name: selectedProjectInfo.name } }">
                        Project Info
                    </RouterLink>
                    <a data-value="Visit ->" class="btn mb-2" v-if="selectedProjectInfo?.link" :href="selectedProjectInfo?.link">
                        Visit ->
                    </a>
                </div>
                <div class="flex items-center justify-between pl-[2px]">
                  <button data-value="PREV" class="font-proto text-xs font-semibold text-[var(--accent-color)]" @click="showPreviousProject">PREV</button>
                  <div class="indicator">
                      <div v-for="project in projects" :key="project.id" class="circle" :class="{ 'active': selectedProjectId === project.id }"></div>
                  </div>
                  <button data-value="NEXT" class="font-proto text-xs font-semibold text-[var(--accent-color)]" @click="showNextProject">NEXT</button>
                </div>
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
    </div>
</template>



<style scoped>
.grille {
  display: grid;
  grid-template-columns: auto 650px;
} 


.container {
    height: 300px;
    display: flex;
    justify-content: flex-end; /* center */
    justify-self: end;
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
    display: contents;
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
  border: 1px solid var(--accent-color);
  padding: 2px 10px;
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
  background: var(--accent-color);
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