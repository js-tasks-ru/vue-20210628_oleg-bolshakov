import { defineComponent } from './vendor/vue.esm-browser.js';
import UiAlert from './UiAlert.js';
import UiContainer from './UiContainer.js';

import MeetupCover from './MeetupCover.js';
import MeetupDescription from './MeetupDescription.js';
import MeetupAgenda from './MeetupAgenda.js';
import MeetupInfo from './MeetupInfo.js';

export default defineComponent({
  name: 'MeetupView',

  components: {
    UiAlert,
    UiContainer,
    MeetupCover,
    MeetupDescription,
    MeetupAgenda,
    MeetupInfo
  },

  props: {
    meetup: {
      type: Object,
      required: true,
    },
  },

  computed: {
    agenda() {
      return Array.isArray(this.meetup?.agenda) ? this.meetup.agenda : [];
    }
  },

  template: `
    <div>
      <MeetupCover
        :image="meetup?.image"
        :title="meetup?.title"
      />

      <ui-container>
        <div class="meetup">
          <div class="meetup__content">
            <h3>Описание</h3>
            <MeetupDescription :description="meetup?.description" />

            <h3>Программа</h3>
            <MeetupAgenda v-if="agenda.length > 0" :agenda="agenda" />
            <ui-alert v-else>Программа пока пуста...</ui-alert>
          </div>
          <div class="meetup__aside">
            <MeetupInfo
              :organizer="meetup?.organizer"
              :place="meetup?.place"
              :date="meetup?.date"
            />
          </div>
        </div>
      </ui-container>
    </div>`,
});
