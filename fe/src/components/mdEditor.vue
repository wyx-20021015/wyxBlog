<script lang="tsx">
import { defineComponent, ref, Ref } from "vue";
export default defineComponent({
  props: {
    text: { type: Object as () => Ref<string> },
    todo: Boolean,
    preview: Object as () => Ref<Boolean>
  },
  setup(props) {
    let { text, todo, preview } = props
    if (todo === undefined) { todo = false }
    if (text === undefined) text = ref("")
    if (preview === undefined) { preview = ref(false) }
    return () => (
      <div>
        {
          todo ?
            (
              <v-md-editor
                v-model={text.value}
                class="v-md-editor"
                left-toolbar="undo redo | todo-list"
                mode={"editable"}
                placeholder="写下要干的事情..." />
            )
            : preview.value ?
              (<v-md-editor
                class="v-md-editor"
                mode={"preview"}
                v-model={text.value}
              ></v-md-editor>)
              : (<v-md-editor
                v-model={text.value}
                class="v-md-editor"
                mode={"editable"}
                placeholder="创作文章..."
              ></v-md-editor>
              )
        }


      </div>
    );
  },
});
</script>

<style lang="scss">
.v-md-editor {
  height: 100%;
  background-color: $bgColor-dark;
  color: $font-dark;

  textarea {
    background-color: transparent;
  }

  td {
    background-color: transparent;
  }

  tr:nth-child(2n),
  th {
    * {
      background-color: $bgColor-light;
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5 {
    position: relative;
    padding-left: 14px;
    border: none;

    &::before {
      position: absolute;
      content: "";
      top: 1px;
      bottom: 0;
      left: 0;
      border-radius: 999px;
      width: 3px;
    }
  }

  h1 {
    &::before {
      width: 4px;
      background-color: $h1;
    }
  }

  h2 {
    &::before {
      width: 3px;
      background-color: $h2;
    }
  }

  h3 {
    &::before {
      width: 2px;
      background-color: $h3;
    }
  }

  h4 {
    &::before {
      width: 2px;
      background-color: $h4;
    }
  }

  h5 {
    &::before {
      width: 2px;
      background-color: $h5;
    }
  }

  strong {
    color: $strong;
  }

  code {
    color: $code;
    margin: 0.2rem;
    background-color: $code-bg;
  }

  [class^="v-md-prism"] {
    .token {
      background-color: transparent;
    }
  }

  a {
    color: $a;
  }
}
</style>
