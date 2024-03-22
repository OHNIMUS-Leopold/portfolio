<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { initializeHoverAnimation } from '@/assets/utils';
import { getDatabase, ref as dbRef, push, set } from 'firebase/database';
import { getStorage, ref as storageRef, getDownloadURL } from 'firebase/storage';
import InstagramIcon from '@/components/icon/InstagramIcon.vue'
import LinkedInIcon from '@/components/icon/LinkedinIcon.vue'
import TwitterIcon from '@/components/icon/TwitterIcon.vue'
import GitHubIcon from '@/components/icon/GithubIcon.vue'

const database = getDatabase();

const contactInfoRef = dbRef(database, 'formulaire');

const name = ref('');
const email = ref('');
const message = ref('');
const checkbox = ref(false);

const saveContactInfo = () => {
  const newContactInfo = push(contactInfoRef); 
  set(newContactInfo, {
    name: name.value,
    email: email.value,
    message: message.value,
  });
};

const submitForm = () => {
  saveContactInfo();
  name.value = '';
  email.value = '';
  message.value = '';
  checkbox.value = false;
};

onMounted(async () => {
  initializeHoverAnimation();
});


const downloadLink = ref<string>('');
const storage = getStorage();
const filePath = 'CV.pdf';

getDownloadURL(storageRef(storage, filePath))
  .then((url) => {
    downloadLink.value = url;
  })
  .catch((error) => {
    console.error('Erreur lors de la récupération du lien de téléchargement :', error);
  });

</script>


<template>
  <div class="mt-32 grid grid-cols-2 gap-24 place-items-center">
    <div class="justify-self-start">
      <div class="font-noto">
        <h1 class="text-2xl font-semibold uppercase text-center">About me</h1>
        <p class="text-base font-normal text-center mt-3">
          Hi! My name is Léopold OHNIMUS!
          <br>
          I'm currently studying multimedia and internet technologies. I'm particularly interested in web development and aim to become a fullstack web developer in the future.
          I'm based in France.
          <br>
          I'm also passionate about South Korea and its entire culture (K-pop, K-dramas, it's historical past, ...).
        </p>
        <p class="text-base font-normal text-center mt-10">
          To learn more about me, you can download my CV below!
        </p>
        <div class="flex place-content-center mt-2">
          <a :href="downloadLink" data-value="Download" download class="btnabout font-proto text-sm font-semibold">Download</a>
        </div>
        <p class="text-base font-normal text-center mt-10">
          And follow me on these social networks
        </p>
        <div class="flex place-content-center space-x-4 mt-2">
          <a href="https://github.com/OHNIMUS-Leopold/" class="onclick">
            <GitHubIcon class="w-8 bg-[var(--text-color)] rounded-full ring-[var(--text-color)] ring-1" />
          </a>
          <a href="https://www.linkedin.com/in/leopold-ohnimus/" class="onclick">
            <LinkedInIcon class="w-8 bg-[var(--text-color)] rounded-lg ring-[var(--text-color)] ring-1" />
          </a>
          <a href="https://www.instagram.com/opop_stan_loona/" class="onclick">
            <InstagramIcon class="w-8 bg-[var(--text-color)] rounded-[10px] ring-[var(--text-color)] ring-1" />
          </a>
          <a href="https://twitter.com/OpopStanLOONA/" class="onclick">
            <TwitterIcon class="w-8 bg-[var(--text-color)] rounded-lg ring-[var(--text-color)] ring-1" />
          </a>
        </div>
      </div>
    </div>


    <div class="feedback-card font-noto text-[var(--bg-color)] justify-self-end">
      <h2 class="feedback-header text-2xl font-semibold py-4 uppercase">Contact me</h2>
      <form class="feedback-body text-base font-normal" @submit.prevent="submitForm()">
        <label class="hidden" for="name">Your name</label>
        <input class="feedback-body__email mt-[10px]" v-model="name" id="name" type="text" required placeholder="Your name" />
        <label class="hidden" for="email">Your e-mail</label>
        <input class="feedback-body__email mt-[10px]" v-model="email" id="email" type="email" required placeholder="Your e-mail" />
        <label class="hidden" for="message">Your message</label>
        <textarea class="feedback-body__message" v-model="message" id="message" rows="" placeholder="Your message"></textarea>
        <div class="flex justify-between items-center gap-4 mt-[10px] text-xs">
          <input v-model="checkbox" type="checkbox" required>
          <p>In accordance with the site's privacy policy, I agree that my personal data provided via this form may be collected and processed for the purpose of responding to my request.</p>
        </div>
        <button data-value="Send" class="btn font-proto text-sm" type="submit">Send</button>
      </form>
    </div>
  </div>
</template>

<style scoped>

input, textarea {
    border: 1px solid var(--bg-color);
    background-image: none;
    background-color: transparent;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
    padding: 6px 10px;
    border-radius: 4px;
}

input:focus, button:focus, textarea:focus {
    outline: none;
}

textarea {
    min-height: 100px;
    resize: vertical;
}

button {
    font-weight: 500;
}

input[type=checkbox] {
  -ms-transform: scale(1.4); /* IE */
  -moz-transform: scale(1.4); /* FF */
  -webkit-transform: scale(1.4); /* Safari and Chrome */
  -o-transform: scale(1.4); /* Opera */
  transform: scale(1.4);
  margin-left: 2px;
  height: 20px;
}

.feedback-card {
    border: 1px solid var(--bg-color);
    max-width: 680px;
    width: 100%;
    background-color: var(--text-color);
    box-shadow: -0.6rem 0.6rem 0 var(--accent-color);
}

.feedback-header {
    text-align: center;
    border-bottom: 1px solid var(--bg-color);
}

.feedback-body {
    padding: 20px;
    display: flex;
    flex-direction: column;
}

.feedback-body__message {
    margin-top: 10px;            
}

.feedback-body button {
    margin-top: 10px;
    align-self: flex-end;
}




.btn{
  background: none;
  border: 1px solid var(--bg-color);
  padding: 3px 10px 2px 10px;
  position: relative;
  border-radius: 4px;
  z-index: 2;
}
.btn:hover{
  color: var(--text-color);
}
.btn::before{
  border-radius: 2px;
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: var(--bg-color);
  z-index: -1;
  transition: transform 0.3s;
  transform-origin: 0 0;
  transition-timing-function: ease-in-out;
  transform: scaleX(0);
}


.btn:hover::before{
  transform: scaleX(1);
}





.btnabout{
  background: none;
  border: 2px solid var(--text-color);
  padding: 4px 10px 4px 10px;
  position: relative;
  border-radius: 4px;
  z-index: 2;
}
.btnabout:hover{
  color: var(--bg-color);
}
.btnabout::before{
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


.btnabout:hover::before{
  transform: scaleX(1);
}
</style>