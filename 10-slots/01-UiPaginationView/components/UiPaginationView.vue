<template>
  <div class="pagination-container">
    <!-- Контент страницы -->
    <template v-for="item in cards">
      <slot name="default" :item="item"></slot>
    </template>
  </div>
</template>

<script>
export default {
  name: 'UiPaginationView',

  props: {
    page: {
      type: Number,
      required: true,
      validator: (value) => value > 0,
    },
    perPage: {
      type: Number,
      required: true,
      validator: (value) => value > 0,
    },
    items: {
      type: Array,
      required: true,
    },
  },

  computed: {
    cards() {
      let index = (this.page * this.perPage) - this.perPage;
      let count = this.perPage;
      return [...this.items].splice(index, count);
    }
  }

};
</script>

<style></style>
