<template>
  <ui-input
    :type="type"
    :modelValue="value"
    @input="$emit('update:modelValue', $event.target.valueAsNumber)"
  >
    <template v-for="slot of Object.keys($slots)" v-slot:[slot]>
      <slot :name="slot" />
    </template>
  </ui-input>
</template>

<script>
import UiInput from './UiInput';

export default {
  name: 'UiInputDate',
  props: {
    type: {
      type: String,
      default: 'date',
      validator: function(value) {
        return ['date', 'time', 'datetime-local'].indexOf(value) !== -1;
      }
    },
    modelValue: Number
  },
  computed: {
    value() {
      return this.format(this.modelValue);
    },
    step() {
      return this.$attrs.step;
    }
  },
  methods: {
    format(date) {
      if (!date) return '';
      switch (this.type) {
        case 'time': 
          const len = ( this.step && (this.step % 60 > 0) ) ? 19 : 16;
          return  new Date(date).toISOString().substring(11, len);
        case 'datetime-local':
          return new Date(date).toISOString().substring(0, 16);
        default:
          return new Date(date).toISOString().substring(0, 10);
      }
    },
  },
  emits: ['update:modelValue'],
  components: { UiInput },
};
</script>
