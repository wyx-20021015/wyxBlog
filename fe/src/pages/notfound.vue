<script lang="tsx">
import { defineComponent, ref } from "vue";
import ShowMessage from "../components/showMessage.vue"

export default defineComponent({
  setup(props) {
    const content = `
    出错了,请检查您的路径。
    `
    return () => (
      <div class="not-found">
        <ShowMessage msg={content} />
      </div>
    );
  },
});
</script>

<style lang="scss">
.not-found {
  width: 500px;
  height: 30vh;
  position: fixed;
  top: 50%;
  left: 50%;
  translate: -250px -30vh;
}
</style>
