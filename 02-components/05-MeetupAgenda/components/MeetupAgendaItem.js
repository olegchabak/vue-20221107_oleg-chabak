import { defineComponent } from '../vendor/vue.esm-browser.js';
import { agendaItemIcons, agendaItemDefaultTitles } from '../meetupService.js';

export default defineComponent({
  name: 'MeetupAgendaItem',
  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isTalkType: (vm) => vm.agendaItem.type === 'talk',
    title: (vm) => (vm.agendaItem.title ? vm.agendaItem.title : agendaItemDefaultTitles[vm.agendaItem.type]),
    rangeTime: (vm) => `${vm.agendaItem.startsAt} - ${vm.agendaItem.endsAt}`,
    imageSrc: (vm) => `/assets/icons/icon-${agendaItemIcons[vm.agendaItem.type]}.svg`,
  },
  template: `
    <div class="agenda-item">
      <div class="agenda-item__col">
        <img :src="imageSrc" class="icon" alt="key" />
      </div>
      <div class="agenda-item__col">{{ rangeTime }}</div>
      <div class="agenda-item__col">
        <h3 class="agenda-item__title">{{ title }}</h3>
        <p v-if="isTalkType" class="agenda-item__talk">
          <span>{{ agendaItem.speaker }}</span>
          <span class="agenda-item__dot"></span>
          <span class="agenda-item__lang">{{ agendaItem.language }}</span>
        </p>
        <p v-if="agendaItem.description">{{ agendaItem.description }}</p>
      </div>
    </div>`,
});
