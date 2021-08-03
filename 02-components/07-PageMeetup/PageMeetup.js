import { defineComponent } from './vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import { fetchMeetupById } from './meetupService.js';
import MeetupView from './MeetupView.js';

export default defineComponent({
  name: 'PageMeetup',

  components: {
    UiAlert,
    UiContainer,
    MeetupView
  },

  data: function() {
    return {
      meetup: undefined,
      loading: true,
      error: null
    }
  },

  props: {
    meetupId: {
      type: Number,
      required: true
    }
  },

  watch: {
    meetupId: function(newValue) {
      this.fetchMeetup(newValue);
    }
  },

  methods: {
    fetchMeetup(meetupId) {
      this.loading = true;
      this.error = null;
      fetchMeetupById(meetupId).then(data => {
        this.meetup = data;
      }).catch(error => {
        this.error = error.message;
      }).finally(()=>{
        this.loading = false;
      })
    }
  },

  mounted() {
    this.fetchMeetup(this.meetupId);
  },

  template: `
    <div class="page-meetup">
      <ui-container v-if="loading">
        <ui-alert>Загрузка...</ui-alert>
      </ui-container>

      <ui-container v-else-if="error">
        <ui-alert>{{ error }}</ui-alert>
      </ui-container>

      <MeetupView v-else :meetup="meetup" />
    </div>`,
});
