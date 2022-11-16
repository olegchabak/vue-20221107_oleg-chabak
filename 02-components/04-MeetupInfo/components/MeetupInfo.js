import { defineComponent } from '../vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'MeetupInfo',
  props: {
    organizer: {
      type: String,
      required: true,
    },
    place: {
      type: String,
      required: true,
    },
    date: {
      type: Number,
      required: true,
    },
  },
  computed: {
    formatDate: (vm) => {
      const valueDate = new Date(vm.date).toISOString().substring(0, 10);
      const displayDate = new Date(vm.date).toLocaleDateString(window.navigator.language, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      return { valueDate, displayDate };
    },
  },
  template: `
    <ul class="meetup-info">
      <li>
        <img class="icon meetup-info__icon" alt="icon" src="/assets/icons/icon-user.svg" />
        {{ organizer }}
      </li>
      <li>
        <img class="icon meetup-info__icon" alt="icon" src="/assets/icons/icon-map.svg" />
        {{ place }}
      </li>
      <li>
        <img class="icon meetup-info__icon" alt="icon" src="/assets/icons/icon-cal-lg.svg" />
        <time :datetime="formatDate.valueDate">{{ formatDate.displayDate }}</time>
      </li>
    </ul>`,
});
