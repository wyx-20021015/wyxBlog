<script lang="tsx">
import { defineComponent, ref, Ref } from "vue";
import { Tag } from "../types/tag"
import TagItem from "./tag-item.vue"
import store from "../store"
export default defineComponent({
  props: {
    data: { type: Object as () => Tag[] },
    tagStyle: String,
    currTags: Object as () => Ref<Tag[]>,
    isInputTag: Boolean
  },
  setup(props) {
    let data = ref(store.state.tags)
    let { tagStyle, currTags, isInputTag } = props;
    isInputTag = isInputTag === undefined ? false : isInputTag
    console.log(isInputTag)
    const isInputing = ref(false)
    const inputLength = ref(" ")
    const newTag = () => {
      isInputing.value = true
    }

    const a = ref<Tag>({ name: "+tag" })
    const getCurrLength = () => {
      let len = 0;
      for (let i = 0; i < inputLength.value.length; i++) {
        let reg = new RegExp("[\\u4E00-\\u9FFF]+", "g");
        if (reg.test(inputLength.value[i])) len += 1;
        else {
          len += 0.55
        }
      }
      return len
    }
    const submit = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        isInputing.value = false
        for (let i = 0; i < data.value.length; i++) {
          if (data.value[i].name === (e.target as HTMLInputElement).value) return
        }
        let obj: Tag = {
          name: (e.target as HTMLInputElement).value
        }
        data.value.push(obj)
      }
    }
    return () => (
      <div class="tags-list" style={tagStyle} >
        {
          data.value.map(t => (
            <TagItem data={t} currTags={currTags} />
          ))
        }
        {
          isInputTag && (!isInputing.value ? <TagItem data={a.value} currTags={currTags} onClick={() => newTag()} inputTag={true} />
            : <input class="tags-list-input" style={{ width: getCurrLength() + "rem" }} v-model={inputLength.value} onKeydown={submit} />)
        }
      </div>
    );
  },
});
</script>

<style lang="scss">
.tags-list {
  display: flex;
  position: absolute;
  top: 20px;
  gap: 10px;
  left: 30px;
  width: 30vw;
  flex-wrap: wrap;
  max-width: 260px;
  overflow-y: auto;
  align-content: flex-start;

  &-input {
    height: 1.5rem;
    // flex: 1;
    max-width: 30vw;
    padding: .2rem 10px;
    outline: 0;
    border: 0;
    background-color: $bgColor-light;
    font-size: 1rem;
    line-height: 1rem;
    border-radius: .3rem;
    min-width: 1rem;
    display: inline-block;
  }
}
</style>
