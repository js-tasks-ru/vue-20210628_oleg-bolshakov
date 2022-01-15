<template>
  <ui-toasts :toasts="toasts" />
</template>

<script>
import UiToasts from './UiToasts';

export default {
  name: 'TheToaster',
  data: function() {
    return {
      toasts: [],
      id: 0,
    }
  },
  components: { UiToasts },
  
  methods: {
    error(message) {
      this.addToast(message, 'toast-error', 5000);
    },

    success(message) {
      this.addToast(message, 'toast-success', 5000);
    },

    addToast(message, type, delay) {
      this.toasts.push({
        id: ++this.id,
        message,
        type,
      });
      setTimeout(this.deleteToast, delay, this.id);
    },

    deleteToast(id) {
      this.toasts = this.toasts.filter(toast => {return toast.id !== id});
    }
  },
};
</script>

<style scoped></style>
