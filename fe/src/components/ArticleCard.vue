<script lang="tsx">
import { defineComponent, ref } from "vue";
import { ArticleData } from "../types/ArticleData"
import router from "../router"
export default defineComponent({
  name: "ArticleCard",
  props: {
    data: { type: Object as () => ArticleData, required: true },
  },
  setup(props) {
    const { data } = props
    const gotoArticleDetail = () => {
      router.push({
        name: "article-detail",
        params: {
          id: data._id
        }
      })
    }
    return () => (
      <>
        <div class="articledetail" onClick={() => gotoArticleDetail()}>
          <div class="articledetail-title">
            {data.title}
          </div>
          <div class="articledetail-digest">{data.digest}</div>
          <div class="articledetail-tags">
            {data.tags.map(item =>
              (<div class="articledetail-tags-tag">{item.name}</div>)
            )}
            <div class="articledetail-visited">{data.visited}</div>
          </div>
        </div>
      </>
    );
  },
});
</script>

<style lang="scss">
.articledetail {
  height: 6rem;
  position: relative;
  background-color: $bgColor-light;
  border-radius: .8rem;
  padding: .8rem;
  box-sizing: border-box;

  &:hover {
    filter: brightness(1.4)
  }

  &-tags {
    display: flex;
    align-items: center;
    gap: 1rem;
    position: absolute;
    right: 2rem;
    bottom: 1rem;

    &-tag {
      color: $font-light;
      border-radius: .7rem;
      border: 3px solid $font-light;
      padding: .3rem;
    }
  }

  &-title {
    font-size: 1.6rem;
    font-weight: 530;
    cursor: auto;
  }

  &-digest {
    color: $font-gray;
    cursor: auto;
  }
}
</style>
