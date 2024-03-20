import { ref } from 'vue';

export const themes = ['theme-1', 'theme-2', 'theme-3']; 
export const currentTheme = ref(themes[Math.floor(Math.random() * themes.length)]);




const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
// @ts-ignore
let intervals: NodeJS.Timeout[] = [];

export function applyHoverEffect(element: HTMLElement): void {
  // @ts-ignore
  let interval: NodeJS.Timeout | null = null;

  element.addEventListener('mouseover', (event) => {
    let iteration = 0;

    clearInterval(interval!);

    interval = setInterval(() => {
      const target = event.target as HTMLElement;
      const datasetValue = target.dataset.value;
      if (!datasetValue) return;

      target.innerText = target.innerText
        .split("")
        .map((letter, index) => {
          if (index < iteration) {
            return datasetValue[index];
          }

          return letters[Math.floor(Math.random() * 26)];
        })
        .join("");

      if (iteration >= datasetValue.length) {
        clearInterval(interval!);
      }

      iteration += 1 / 3;
    }, 30);

    intervals.push(interval!);
  });
}

export function initializeHoverAnimation(): void {
  const textElements = document.querySelectorAll('[data-value]');
  textElements.forEach((element) => {
    applyHoverEffect(element as HTMLElement);
  });
}
