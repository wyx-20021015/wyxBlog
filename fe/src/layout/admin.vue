<script lang="tsx">
import { defineComponent, ref } from "vue";
import { navigateTo } from "../router/navigateTo"
export default defineComponent({
  setup(props, { slots }) {
    return () => (
      <div class="admin-container">
        <div class="admin-container-sidenav">
          <div onClick={() => navigateTo("/admin/article")}>文章管理</div>
          <div onClick={() => navigateTo("/admin/log")}>日志</div>
          <div onClick={() => navigateTo("/admin/todo")}>todo list</div>
          <div onClick={() => navigateTo("/admin/message")}>留言审核</div>
          <div onClick={() => navigateTo("/")}>返回首页</div>
        </div>
        <div class="admin-container-outview">{slots.default && slots.default()}</div>

      </div>
    );
  },
});
</script>

<style lang="scss">
.admin-container {
  display: flex;
  gap: 20px;
  min-height: 100vh;
  align-items: center;
  box-sizing: border-box;

  &-sidenav {
    width: 12rem;
    color: $font-dark;
    font-size: 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    margin-bottom: 15%;

    & div {
      width: 8rem;
      border-radius: 20px;
      line-height: 3rem;
      height: 3rem;
      text-align: center;
      background-color: $bgColor-dark;
      box-sizing: border-box;

      &:hover {
        cursor: pointer;
      }
    }
  }

  &-outview {
    flex: 1;
    height: 100vh;
    padding: 2% 8% 2% 8%;
    // overflow: scroll;
  }
}
</style>
