<script lang="tsx">
import { defineComponent, ref, Ref } from "vue";
import MdEditor from "../components/mdEditor.vue"
import { getArticleById, deleteArticle, updateArticle } from "../service/article"
import { Tag } from "../types/tag"
import WBtn from "../components/wBtn.vue"
import Token from "../utils/token"
import router from "../router";
import { statSync } from "fs";
const { getToken } = Token
export default defineComponent({
  props: {
    id: String
  },
  setup(props) {
    const { id } = props
    const text = ref<string>("")
    const title = ref<string>("")
    const digest = ref<string>("")
    const tags = ref<Tag[]>([])
    const isPreview = ref(true)
    const getData = async () => {
      const res = await getArticleById(id)
      if (res.success === false) router.replace({ name: "notfound" })
      text.value = res.data.content
      digest.value = res.data.digest
      title.value = res.data.title
      tags.value = res.data.tags
      console.log(res.data)
    }
    getData()

    const status = ref(0)
    //0:游客模式  1:登录且预览  2：登录且修改
    if (getToken()) status.value = 1
    const update_ = async () => {
      try {
        const res = await updateArticle({ content: text.value, digest: digest.value, title: title.value, tags: tags.value, _id: id })
        status.value = 1;
        alert("修改成功！")
      } catch (e) {
        alert("修改失败！")
      }

    }
    const delete_ = async () => {
      if (confirm("确认删除吗")) {
        const res = deleteArticle(id)
        router.go(-1)
      }
    }
    const toUpdate_ = () => {
      status.value = 2;
      console.log(status.value)
      isPreview.value = false
    }
    const preview_ = () => {
      status.value = 1;
    }
    return () => (
      <div class="detail-article">
        <MdEditor preview={isPreview} text={text} />
        {
          status.value > 0 && (
            <div class="btns">
              {
                status.value === 1 ? <WBtn text="编辑" onClick={() => toUpdate_()} />
                  : (
                    <>
                      <WBtn text="预览" onClick={() => preview_()} />
                      <WBtn text="提交" onClick={() => update_()} />
                    </>
                  )
              }
              <WBtn text="删除" onClick={() => delete_()} />
            </div>
          )
        }
      </div>
    );
  },
});
</script>

<style lang="scss">
.detail-article {
  width: 75vw;
  max-width: 1000px;
}

.btns {
  display: flex;
  justify-content: space-around;
}
</style>
