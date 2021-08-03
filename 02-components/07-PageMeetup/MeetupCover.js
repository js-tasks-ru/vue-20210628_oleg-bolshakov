import { defineComponent } from './vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'MeetupCover',

  props: {
    image: {
      type: String
    },
    title: {
      type: String
    }
  },

  computed: {
    styleObject() {
      return {
        '--bg-url': this.image ? `url('${this.image}')` : ""
      };
    }
  },

  template: `
    <div class="meetup-cover" :style="styleObject">
      <h1 class="meetup-cover__title">{{ title }}</h1>
    </div>`,
});
