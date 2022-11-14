import { createApp } from './vendor/vue.esm-browser.js';

// Создайте Vue приложение
const App = createApp({
  name: 'AppCalculator',
  data() {
    return {
      val1: 0,
      val2: 0,
      picked: 'sum',
    };
  },
  computed: {
    result() {
      switch (this.picked) {
        case 'sum':
          return this.sum();
        case 'subtract':
          return this.subtract();
        case 'multiply':
          return this.multiply();
        case 'divide':
          return this.divide();
      }
    },
  },
  methods: {
    sum() {
      return this.val1 + this.val2;
    },
    subtract() {
      return this.val1 - this.val2;
    },
    multiply() {
      return this.val1 * this.val2;
    },
    divide() {
      return this.val1 / this.val2;
    },
  },
});
App.mount('#app');
