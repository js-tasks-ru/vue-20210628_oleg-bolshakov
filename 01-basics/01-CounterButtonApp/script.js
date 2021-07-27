import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

const Counter = defineComponent({
  name: "Counter",
  template: `<button type="button" @click="counter++">{{ counter }}</button>`,
  data() {
    return {
      counter: 0
    }
  }
})

createApp(Counter).mount('#app');
