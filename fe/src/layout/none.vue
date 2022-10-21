<script lang="tsx">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup(props, { slots }) {
    return () => (
      <div class="_none">
        {slots.default && slots.default()}
      </div>
    );
  },
});
</script>

<style lang="scss">
._none {
  min-height: 100vh;
}
</style>
