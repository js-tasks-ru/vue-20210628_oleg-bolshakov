<script>
import { compile, h, defineComponent } from 'vue';

export default {
  name: 'TemplateRenderer',

  props: {
    template: {
      type: String,
      required: true,
    },

    bindings: {
      type: Object,
      default: () => ({}),
    },

    components: {
      type: [Object, Array],
      default: () => [],
    },
  },

  render() {
    const renderFunction = compile(this.template);
    const component = defineComponent({
      props: {
        bindings: {type: Object}
      },
      components: this.components,
      render: renderFunction,
    });
    return h(component, {bindings: this.bindings});
  },

};
</script>
