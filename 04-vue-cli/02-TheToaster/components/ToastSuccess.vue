<template>
  <ui-toast class="toast_success" icon="check-circle">
    <span>{{ message }}</span>
  </ui-toast>
</template>

<script>
import UiToast from './UiToast';

export default {
  name: 'ToastSuccess',
  components: { UiToast },
  props: {
    message: {
      type: String
    }
  }
};
</script>

<style scoped>
.toast_success {
  color: var(--green);
}
</style>
