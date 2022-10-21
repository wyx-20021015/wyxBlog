<script lang="tsx">
import { defineComponent, ref } from "vue";
import { RouterView } from "vue-router";
import myAvator from "../assets/img/myAvator.png"
import { navigateTo } from "../router/index"
export default defineComponent({
  setup(props, { slots }) {
    return () => (
      <>
        <div class="container">        <div class="header">
          <div class="myInfo">
            <img src={myAvator} alt="我的头像" />
            <p>wyx帅帅</p>
            <div class="navBar">
              <span onClick={() => navigateTo("/article?offset=1")}>文章</span>
              <span onClick={() => navigateTo("/aboutMe")}>关于我</span>
              <span onClick={() => navigateTo("/message")}>留言</span>
              <span onClick={() => navigateTo("/admin")}>管理</span>
            </div>
          </div>
        </div>
          <div class="router-view">{slots.default && slots.default()}</div>
        </div>

      </>
    );
  },
});
</script>

<style lang="scss" scoped>
.router-view {
  flex: 1;
}

.container {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 100vh;
  gap: 10px;
  align-items: center;
}

.myInfo img {
  width: 200px;
  height: 200px;
  border-radius: 50%;
}

.header {
  text-align: center;
}

.header span {
  margin: 0 10px;
  text-decoration: none;
}

.header span:hover {
  color: #948C76;
  text-decoration: none;
  cursor: pointer;
}
</style>
