<script lang="tsx">
import { defineComponent, ref } from "vue";
import ShowMessage from "../components/showMessage.vue"

export default defineComponent({
  setup(props) {
    const content = `
      留言模块火速开发中...\n
    `
    return () => (
      <>
        <ShowMessage msg={content} />
      </>
    );
  },
});
</script>

<style lang="scss">

</style>
