<script lang="tsx">
import { defineComponent, ref, Ref } from "vue";
import { Tag } from "../types/tag"
import router from "../router"
export default defineComponent({
  props: {
    data: { type: Object as () => Tag, required: true },
    currTags: Object as () => Ref<Tag[]>,
    inputTag: Boolean
  },
  setup(props) {
    const { data, currTags, inputTag } = props;
    const hasTag = (tag: Tag) => {
      if (currTags === undefined || tag === undefined || currTags.value === undefined) return -1
      // console.log(currTags.value.length, "*/*/*/*/*/")
      for (let i = 0; i < currTags.value.length; i++) {
        if (currTags.value[i].name === tag.name) return i
      }
      return -1
    }
    const searchTag = () => {
      if (inputTag === true) return
      if (currTags != undefined) {
        let res = hasTag(data)
        if (res != -1) {
          currTags.value.splice(res, 1)
        }
        else {
          currTags.value.push(data)
        }
      }
      else {
        router.replace({
          name: `article`,
          query: {
            tag: (data as any).name,
            offset: 1
          }
        })
      }

    }
    return () => (
      <div class={hasTag(data as any) != -1 ? "tag-item-active" : ""} onClick={() => searchTag()}>
        <div class="tag-item">
          <div class="tag-item-name">{(data as any).name}</div>
          <div class="tag-item-count">{(data as any).count}</div>
        </div>
      </div>

    );
  },
});
</script>

<style lang="scss">
.tag-item-active {
  background-color: $bgColor-light;
  border-radius: 20px;
}

.tag-item {
  display: flex;
  gap: 5px;
  padding: 6px 8px;
  border-radius: 20px;
  border: 2px solid $tag-border;
  color: $tag-font;
  cursor: pointer;
}
</style>
