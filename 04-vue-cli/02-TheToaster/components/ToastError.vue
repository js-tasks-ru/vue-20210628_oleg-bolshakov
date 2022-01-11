<template>
  <ui-toast class="toast_error" icon="alert-circle">
    <span>{{ message }}</span>
  </ui-toast>
</template>

<script>
import UiToast from './UiToast';

export default {
  name: 'ToastError',
  components: { UiToast },
  props: {
    message: {
      type: String
    }
  }
};
</script>

<style scoped>
.toast_error {
  color: var(--red);
}
</style>
