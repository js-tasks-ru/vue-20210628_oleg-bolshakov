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
createApp({
  data() {
    return {
      meetupId: null,
      meetup: null
    }
  },
  watch: {
    meetupId(val) {
      fetchMeetupById(val).then(meetup => this.meetup = meetup);
    }
  },
  template: `
    <div>
      <label v-for="item in [1,2,3,4,5]"><input type="radio" :value="item" v-model="meetupId" /> {{ item }}</label>

      <hr />

      <h3>{{ meetup?.title }}</h3>
    </div>
  `,
}).mount('#app');