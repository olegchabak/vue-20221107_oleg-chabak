import { defineComponent } from '../vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import MeetupView from '../../06-MeetupView/components/MeetupView.js'
import { fetchMeetupById } from '../meetupService.js';

export default defineComponent({
  name: 'PageMeetup',

  components: {
    UiAlert,
    UiContainer,
    MeetupView,
  },

  props: {
    meetupId: {
      type: Number,
      required: true,
    },
  },

  data: () => ({
    meetup: null,
    error: null,
    loading: false,
  }),

  watch: {
    meetupId: {
      async handler(newValue) {
        this.loading = true;
        this.meetup = null;
        this.error = null;
        try {
          this.meetup = await fetchMeetupById(newValue);
        } catch (err) {
          this.error = err.message;
        } finally {
          this.loading = false;
        }
      },
      immediate: true,
    },
  },

  template: `
    <div class="page-meetup">
      <MeetupView v-if="meetup" :meetup="meetup"/>

      <UiContainer v-else-if="loading">
        <UiAlert>Загрузка...</UiAlert>
      </UiContainer>

      <UiContainer v-else-if="error">
        <UiAlert>{{ error }}</UiAlert>
      </UiContainer>
    </div>`,
});
