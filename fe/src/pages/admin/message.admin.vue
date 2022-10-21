<script lang="tsx">
import { defineComponent, ref } from "vue";
import ShowMessage from "../../components/showMessage.vue"

export default defineComponent({
  setup(props) {
    const content = `
      留言管理模块火速开发中...
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
