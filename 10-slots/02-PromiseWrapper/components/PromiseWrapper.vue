<template>
  <slot :name="slotName" :result="result" :error="error" />
</template>

<script>
export default {
  name: 'PromiseWrapper',

  data() {
    return {
      slotName: null,
      result: null,
      error: null,
    }
  },
  
  props: {
    promise: {
      type: Promise,
      required: true,
    },
  },

  watch: {
    promise: {
      handler() {
        this.slotName = 'pending';
        this.promise.then(result => {
            this.result = result;
            this.slotName = 'fulfilled';
          }).catch(error => {
            this.error = error;
            this.slotName = 'rejected';
          })
      },
      immediate: true,
    }
  }
};
</script>
