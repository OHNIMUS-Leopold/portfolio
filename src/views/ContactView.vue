<script setup lang="ts">
import { ref } from 'vue';
import { getDatabase, ref as dbRef, push, set } from 'firebase/database';

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

</script>


<template>
  <div class="mt-36">

    <form @submit.prevent="submitForm()">
      <label for="name">Nom</label>
      <input v-model="name" id="name" type="text" required placeholder="Nom" />
      <label for="email">Email</label>
      <input v-model="email" id="email" type="email" required placeholder="Email" />
      <label for="message">Message</label>
      <textarea v-model="message" id="message" rows="" placeholder="Message"></textarea>
      <input v-model="checkbox" type="checkbox" required>
      <button type="submit">Envoyer</button>
    </form>

  </div>
</template>
