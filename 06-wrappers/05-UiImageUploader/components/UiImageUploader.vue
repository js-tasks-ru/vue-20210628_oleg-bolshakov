<template>
  <div class="image-uploader">
    <label
      class="image-uploader__preview"
      :class="{ 'image-uploader__preview-loading': loading }"
    >
      <span class="image-uploader__text">{{ text }}</span>
      <input
        type="file"
        ref="imageUploader"
        accept="image/*"
        class="image-uploader__input"
        v-bind="$attrs"
        @click="handleClick"
        @change="handleChange($event)"
        :disabled="loading"
      />
    </label>
  </div>
</template>

<script>
const LOADING_TEXT = 'Загрузка...';
const EMPTY_TEXT = 'Загрузить изображение';
const DELETE_TEXT = 'Удалить изображение';

export default {
  name: 'UiImageUploader',
  inheritAttrs: false,
  data() {
    return {
      loading: false,
      display: null
    }
  },
  props: {
    preview: String,
    uploader: Function
  },
  computed: {
    image() {
      return this.preview ? `url('${this.preview}')` : this.display ? `url('${this.display}')` :'var(--default-cover)';
    },
    text() {
      if ( this.loading ) return LOADING_TEXT;
      return (this.preview || this.display) ? DELETE_TEXT : EMPTY_TEXT;
    }
  },
  methods: {
    resetInput() {
      this.$refs['imageUploader'].value = "";
    },
    handleClick(event) {
      if ( this.preview || this.display ) {
        event.preventDefault();
        this.resetInput();
        this.$emit('remove');
        this.display = null
      };
    },
    async handleChange(event) {
      const file = event.target.files[0];
      this.$emit('select', file);
      if ( typeof this.uploader === 'function' ) {
        this.loading = true;
        try {
          const result = await this.uploader(file);
          this.$emit('upload', result);
        } catch (error) {
          this.resetInput();
          this.$emit('error', error);
        }
        this.loading = false;
      } else {
        this.display = URL.createObjectURL(file);
      }
    },
  }
};
</script>

<style scoped>
.image-uploader {
}

.image-uploader__input {
  opacity: 0;
  height: 0;
}

.image-uploader__preview {
  --bg-url: v-bind(image);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), var(--bg-url);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader__text {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
