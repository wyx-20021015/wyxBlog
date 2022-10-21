<script lang="tsx">
import { defineComponent, ref } from "vue";
import { createArticle } from "../../service/article"
import MdEditor from "../../components/mdEditor.vue"
import WBtn from "../../components/wBtn.vue"
import Tags from "../../components/tags.vue"
import { Tag } from "../../types/tag"
export default defineComponent({
  setup(props) {
    const text = ref("")
    const title = ref("")
    const digest = ref("")
    const currTags = ref<Tag[]>([])
    const postArticle = async () => {
      // text.value = text.value.trim()
      title.value = title.value.trim()
      digest.value = digest.value.trim()
      if (text.value.length === 0 || title.value.length === 0 || digest.value.length === 0) {
        alert("内容、标题、摘要不能为空！")
        return
      }
      return await createArticle({ content: text.value, title: title.value, digest: digest.value, tags: currTags.value })
    }
    return () => (
      < >
        <div class="admin-article">
          <div class="admin-article-top">
            <div class="admin-article-top-t">
              <div class="admin-article-top-t-addInfo">
                <div class="admin-article-top-t-addInfo-infoName">标题</div>
                <input class="admin-article-top-t-addInfo-i" v-model={title.value} />
              </div>
              <div class="admin-article-top-t-addInfo">
                <div class="admin-article-top-t-addInfo-infoName">摘要</div>
                <input class="admin-article-top-t-addInfo-i" v-model={digest.value} />
              </div>
            </div>

            <div class="admin-article-top-tagmenu"></div>
          </div>
          <div class="admin-article-editor-box">
            <MdEditor class="admin-article-editor" text={text} />
          </div>
          <WBtn text="确认投稿" onClick={() => postArticle()} />
        </div>
        <Tags currTags={currTags} style="top:unset;bottom: 20px;height:30vh;left:15px;" isInputTag={true} />
      </>
    );
  },
});
</script>

<style lang="scss">
.admin-article {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  align-items: center;
  gap: 20px;
  box-sizing: border-box;
  padding-top: 1rem;

  &-editor {
    // flex: 1;
    // width: 100%;
    height: 100%;

    &-box {
      flex: 1;
      width: 100%;
      overflow: hidden;
    }
  }



  &-top {
    display: flex;
    justify-content: flex-start;
    width: 100%;

    &-tagmenu {
      flex: 1
    }

    &-t {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 1rem;

      &-addInfo {
        display: flex;
        align-items: center;
        align-self: flex-start;
        gap: 1.5rem;
        width: 100%;

        &-infoName {
          color: $font-light;
          font-size: 1.3rem;
        }

        &-i {
          height: 1.5rem;
          flex: 1;
          max-width: 700px;
          padding: .2rem 10px;
          outline: 0;
          border: 0;
          background-color: $bgColor-light;
          font-size: 1.2rem;
          line-height: 1.5rem;
          border-radius: .5rem;
        }
      }
    }
  }
}
</style>
