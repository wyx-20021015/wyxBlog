<script lang="tsx">
import { defineComponent, ref } from "vue";

export default defineComponent({
  props: {
    msg: String
  },
  setup(props) {
    let { msg } = props
    msg = msg.trim()
    const msgShowed = ref("")
    let i = 0
    const timer = window.setInterval(showMsg, 200);
    function showMsg() {
      // $:回退
      // ^:等待一拍
      if (i === msg.length) {
        // console.log("end of str", msg[i])
        return clearInterval(timer)
      }
      let currChar = msg[i]
      // console.log(msg[i], i)
      if (currChar === "$") {
        msgShowed.value = msgShowed.value.substring(0, msgShowed.value.length - 1)
      }
      else if (currChar === "^") {
      }
      else {
        msgShowed.value += msg[i]
      }
      i++
    }
    return () => (
      <div class="show-message">
        <span class="show-message-msg" v-html={msgShowed.value}></span>
        <span class="show-message-cursor">_</span>
      </div>
    );
  },
});
</script>

<style lang="scss">
.show-message {
  width: 100%;
  height: 100%;

  color: white;

  &-cursor {
    animation: shine 1s infinite;

    @keyframes shine {
      0% {
        opacity: 0;
      }

      49% {
        opacity: 0;
      }

      50% {
        opacity: 1;
      }

      100% {
        opacity: 1;
      }
    }
  }
}
</style>
