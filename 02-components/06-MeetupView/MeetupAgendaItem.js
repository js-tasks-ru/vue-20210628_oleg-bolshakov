import { defineComponent } from './vendor/vue.esm-browser.js';
import { agendaItemIcons, agendaItemDefaultTitles } from './meetupService.js';

export default defineComponent({
  name: 'MeetupAgendaItem',

  props: {
    agendaItem: {
      type: Object,
      required: true,
    }
  },

  computed: {
    item() {
      let item = this.agendaItem;
      return {
        ...this.agendaItem,
        time: `${item.startsAt} - ${item.endsAt}`,
        icon: item.type in agendaItemIcons
          ? this.getIconLink(agendaItemIcons[item.type])
          : this.getIconLink(agendaItemIcons.other),
        title: item.title ? item.title : agendaItemDefaultTitles[item.type],
      };
    } 
  },

  methods: {
    getIconLink(icon) {
      return `/assets/icons/icon-${icon}.svg`;
    }
  },

  template: `
    <div class="agenda-item">
      <div class="agenda-item__col">
        <img :src="item.icon" class="icon" alt="key" />
      </div>
      <div class="agenda-item__col">{{ item.time }}</div>
      <div class="agenda-item__col">
        <h3 class="agenda-item__title">{{ item.title }}</h3>
        <p v-if="item.type === 'talk'" class="agenda-item__talk">
          <span>{{ item.speaker }}</span>
          <span class="agenda-item__dot"></span>
          <span class="agenda-item__lang">{{ item.language }}</span>
        </p>
        <p v-if="item.description">{{ item.description }}</p>
      </div>
    </div>`,
});
