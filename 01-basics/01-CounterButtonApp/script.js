import { createApp } from './vendor/vue.esm-browser.js';

// Создайте Vue приложение
const App = createApp({
  name: 'App',
  data() {
    return {
      counter: 0,
    };
  },
  methods: {
    increment() {
      this.counter++;
    },
  },
});

App.mount('#app');
