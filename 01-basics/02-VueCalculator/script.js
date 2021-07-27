import { createApp } from './vendor/vue.esm-browser.js';

createApp({
  data() {
    return {
      operandFirst: 10,
      operandSecond: 5,
      operator: 'sum'
    }
  },
  computed: {
    result() {
      switch( this.operator ) {
        case 'sum':
          return this.operandFirst + this.operandSecond;
        case 'subtract':
          return this.operandFirst - this.operandSecond;
        case 'multiply':
          return this.operandFirst * this.operandSecond;
        case 'divide':
          return ( this.operandSecond === 0 ) ? 'Ай-яй-яй!' : this.operandFirst / this.operandSecond;
      }
    }
  },
  template: `
    <div class="container">
      <div class="row">
        <div class="col">
          <input type="number" v-model.number="operandFirst" />
        </div>

        <div class="col" style="display: flex; flex-direction: column; font-family: emoji">
          <label><input v-model="operator" type="radio" value="sum" /> ➕</label>
          <label><input v-model="operator" type="radio" value="subtract" /> ➖</label>
          <label><input v-model="operator" type="radio" value="multiply" /> ✖</label>
          <label><input v-model="operator" type="radio" value="divide" /> ➗</label>
        </div>

        <div class="col">
          <input type="number" v-model.number="operandSecond" />
        </div>

        <div class="col">=</div>

        <output class="col">{{ result }}</output>
      </div>
    </div>
  `
}).mount('#app');
