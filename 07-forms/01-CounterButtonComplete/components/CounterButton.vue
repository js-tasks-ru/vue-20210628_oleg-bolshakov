<template>
  <button type="button" @click="handleClick">{{ localCopyCount }}</button>
</template>

<script>
export default {
  name: 'CounterButton',
  data() {
    return {
      localCopyCount: null,
    };
  },
  props: {
    count: {
      type: Number,
      default: 0,
    }
  },
  watch: {
    count: {
      handler: function(newValue) {
        this.localCopyCount = newValue;
      },
      immediate: true,
    }
  },
  methods: {
    handleClick() {
      this.$emit('update:count', ++this.localCopyCount);
    }
  }
};
</script>
