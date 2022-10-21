<script lang="tsx">
import { defineComponent, ref, onMounted } from "vue";
import Token from "../utils/token"
import router from "../router"
import { login } from "../service/login"
import WBtn from "../components/wBtn.vue"
const { getToken } = Token


export default defineComponent({
  setup(props) {
    onMounted(() => {
      if (getToken()) {
        if (confirm("已登录, 是否前往创作界面?"))
          router.push({ name: "admin-article" });
      }
    });
    const password = ref("");

    async function toLogin() {
      const res = await login(password.value);
      const success = res.success
      console.log(success, "-********************-");
      if (success) router.push({ name: "admin" });
    }
    return () => (
      <>
        <div class="login">
          <input
            type="password"
            class="login-input"
            placeholder="请输入密码"
            v-model={password.value}
          />
          <WBtn text="登录" onClick={toLogin} />
        </div>
      </>
    );
  },
});
</script>

<style lang="scss">
.login {
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  width: 400px;
  max-width: 90vw;
  min-height: 200px;

  background-color: $bgColor-dark;
  border-radius: 4px;

  &-input {
    margin-top: 20px;
    color: $lightColor;
    background-color: $bgColor-light;
    width: 80%;
    padding: 0.5em;
    margin-bottom: 2rem;
    border: 1px solid $bgColor-dark;

    &::placeholder {
      color: $lightlightColor;
    }
  }
}
</style>
