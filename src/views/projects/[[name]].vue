<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getStorage, ref as storageRef, getDownloadURL } from 'firebase/storage';
import type { Project } from '@/types';
import { useRoute } from 'vue-router';
import BlenderIcon from '@/components/icon/BlenderIcon.vue';
import GithubIcon from '@/components/icon/GithubIcon.vue';
import FigmaIcon from '@/components/icon/FigmaIcon.vue';
import FirebaseIcon from '@/components/icon/FirebaseIcon.vue';
import IllustratorIcon from '@/components/icon/IllustratorIcon.vue';
import NetlifyIcon from '@/components/icon/NetlifyIcon.vue';
import PhotoshopIcon from '@/components/icon/PhotoshopIcon.vue';
import PocketbaseIcon from '@/components/icon/PocketbaseIcon.vue';
import SupabaseIcon from '@/components/icon/SupabaseIcon.vue';
import TailwindIcon from '@/components/icon/TailwindIcon.vue';
import ThreejsIcon from '@/components/icon/ThreejsIcon.vue';
import VuejsIcon from '@/components/icon/VuejsIcon.vue';
import WordpressIcon from '@/components/icon/WordpressIcon.vue';
import HtmlIcon from '@/components/icon/HtmlIcon.vue';
import CssIcon from '@/components/icon/CssIcon.vue';
import JavascriptIcon from '@/components/icon/JavascriptIcon.vue';
import PhpIcon from '@/components/icon/PhpIcon.vue';

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

  await Promise.all(projectsData.map(async (project) => {
    const imageUrl = await getImageUrl(project.image);
    project.imageUrl = imageUrl;
  }));

  projects.value = projectsData;
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

const project = computed(() => {
  return projects.value.find(project => project.name === projectName.value) || null;
});
</script>

<template>
    <div class="mt-32 grid grid-cols-2 gap-24 place-items-center">
      <div class="justify-self-start">
        <div class="font-noto">
          <h1 class="text-2xl font-semibold uppercase text-center">{{ project?.name }}</h1>
          <p class="text-base font-normal text-center mt-3 pb-16">
            {{ project?.description }}
          </p>
        </div>
      </div>

      <div>
        <a :href="project?.link" class="contents onclick">
          <img :src="project?.imageUrl" :alt="project?.name" class="w-full">
        </a>
        <div class="mt-6 flex justify-center space-x-3 m-auto">
            <HtmlIcon v-if="project?.html === true" class="h-6 aspect-square" />
            <CssIcon v-if="project?.css === true" class="h-6 aspect-square" />
            <JavascriptIcon v-if="project?.javascript === true" class="h-6 aspect-square" />
            <VuejsIcon v-if="project?.vuejs === true" class="h-6 aspect-square" />
            <TailwindIcon v-if="project?.tailwind === true" class="h-6 aspect-square" />
            <a v-if="project?.github !== ''" :href="project?.github" class="">
              <GithubIcon class="h-6 aspect-square onclick bg-white rounded-full" />
            </a>
            <NetlifyIcon v-if="project?.netlify === true" class="h-6 aspect-square" />
            <WordpressIcon v-if="project?.wordpress === true" class="h-6 aspect-square bg-white rounded-full" />
            <PhpIcon v-if="project?.php === true" class="h-6 aspect-square" />
            <FirebaseIcon v-if="project?.firebase === true" class="h-6 aspect-square" />
            <SupabaseIcon v-if="project?.supabase === true" class="h-6 aspect-square" />
            <PocketbaseIcon v-if="project?.pocketbase === true" class="h-6 bg-white rounded-tl-sm rounded-br-sm rounded-tr-[10px] rounded-bl-[10px] aspect-square" />
            <ThreejsIcon v-if="project?.threejs === true" class="h-6 aspect-square" />
            <BlenderIcon v-if="project?.blender === true" class="h-6 aspect-square" />
            <a v-if="project?.figma !== ''" :href="project?.figma" class="">
              <FigmaIcon class="h-6 aspect-square onclick" />
            </a>
            <PhotoshopIcon v-if="project?.photoshop=== true" class="h-6 aspect-square" />
            <IllustratorIcon v-if="project?.illustrator === true" class="h-6 aspect-square" />
        </div>
      </div>
    </div>
</template>