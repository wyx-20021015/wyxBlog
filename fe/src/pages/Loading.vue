<script lang="tsx">
import { defineComponent, withDefaults, ref } from "vue";

export default defineComponent({
  name: "loading",
  props: {
    msg: String,
  },
  setup(props) {
    let { msg } = props
    if (!msg) { msg = "加载中，请稍等" }
    return () => (
      <>
        <div class="loading">
          {msg}<span class="loading_dot">. . .</span>
        </div>
      </>
    );
  },
});
</script>

<style lang="scss">
.loading {
  display: flex;
  margin: auto;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 200px;
  position: relative;
  border-radius: 999px;
  font-size: .9rem;
  border: 3px solid $darkColor;
  position: relative;

  &_dot {
    overflow: hidden;
    width: 1.5rem;
    animation: dot infinite linear 4s;
    white-space: nowrap;

    &_container {
      width: 1.5rem;
    }
  }
}

.loading::before {
  content: "";
  position: absolute;
  inset: 6px 6px 6px 6px;
  animation: rotate 2s linear infinite;
  border-radius: 999px;
  border-top: 3px solid $lightColor;
}

@keyframes dot {
  0% {
    width: 1.5rem;
  }

  25% {
    width: 1rem;
    margin-right: .5rem;
  }

  50% {
    width: 0.5rem;
    margin-right: 1rem;
  }

  75% {
    width: 1rem;
    margin-right: .5rem;
  }

  100% {
    width: 1.5rem;
    margin-right: 0rem;
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
