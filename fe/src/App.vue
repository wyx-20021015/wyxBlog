<script lang="tsx">
import { defineComponent, ref, watch } from "vue";
import { RouterView } from "vue-router";
import Layout from "./layout/layout.vue"
import router from "./router"
import Admin from "./layout/admin.vue"
import None from "./layout/none.vue"
import store from "./store"

export default defineComponent({
  setup(props) {
    store.dispatch("getTags")

    return () => (
      <>
        {router.currentRoute.value.meta.admin ? (
          <Admin v-slots={{ default: () => <RouterView /> }} />
        ) : router.currentRoute.value.meta.none ? (
          <None v-slots={{ default: () => <RouterView /> }} />
        ) : (
          <Layout v-slots={{ default: () => <RouterView /> }} />
        )}
      </>
    );
  },
});
</script>

<style lang="scss">

</style>
