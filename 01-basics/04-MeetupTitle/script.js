import { createApp } from './vendor/vue.esm-browser.js';

const API_URL = 'https://course-vue.javascript.ru/api';

function fetchMeetupById(meetupId) {
  return fetch(`${API_URL}/meetups/${meetupId}`).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then((error) => {
        throw error;
      });
    }
  });
}

// Требуется создать Vue приложение
const App = createApp({
  name: 'App',
  data: () => ({
    meetup: null,
    meetupId: 1,
  }),
  computed: {
    meetupTitle: (vm) => vm.meetup?.title || '',
  },
  watch: {
    meetupId: {
      async handler(newValue) {
        this.meetup = await fetchMeetupById(newValue);
      },
      immediate: true,
    },
  },
  methods: {},
}).mount('#app');
