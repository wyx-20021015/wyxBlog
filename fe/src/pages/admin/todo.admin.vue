<script lang="tsx">
import { defineComponent, ref } from "vue";
import MdEditor from "../../components/mdEditor.vue"
export default defineComponent({
  setup(props) {
    return () => (
      <>
        <MdEditor todo={true} />
      </>
    );
  },
});
</script>

<style lang="scss">

</style>
