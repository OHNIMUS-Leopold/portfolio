import { ref } from 'vue';

export const themes = ['theme-dark1', 'theme-dark2']; 
export const currentTheme = ref(themes[Math.floor(Math.random() * themes.length)]);