<template>
  <div class="toasts">
    <component
      v-for="toast in toasts"
      :key="toast.id"
      :is="toast.type"
      :message="toast.message"
    ></component>
  </div>
</template>

<script>
import ToastError from './ToastError';
import ToastSuccess from './ToastSuccess';

export default {
  name: 'UiToasts',
  components: { ToastError, ToastSuccess },
  props: {
    toasts: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}
</style>
