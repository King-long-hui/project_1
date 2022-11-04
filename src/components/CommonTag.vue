<template>
  <div class="tags">
    <el-tag
      v-for="(tag, index) in tags"
      :key="tag.path"
      :closable="tag.name !== 'home'"
      :effect="$route.name === tag.name ? 'dark' : 'plain'"
      @click="changeTag(tag)"
      @close="closeTag(tag, index)"
      size="small"
    >
      {{ tag.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "CommonTag",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      tags: (state) => state.tab.tabList,
    }),
  },
  methods: {
    changeTag(tag) {
      this.$router.push(tag.name);
    },
    closeTag(tag, index) {
      this.$store.dispatch("closeTag", tag);
      const length = this.tags.length;

      // 删除的标签不是当前高亮的标签
      if (tag.name !== this.$route.name) {
        return
      }

      // 表示的是删除最后一项
      if (index === length) {
        this.$router.push({
          name: this.tags[index - 1].name,
        });
      } else {
        this.$router.push({
          name: this.tags[index].name,
        });
      }
    // console.log(length)
    },
  },
};
</script>

<style lang="less" scoped>
.tags{
    padding: 20px;
    .el-tag{
        margin-right: 15px;
        cursor: pointer;
    }
}
</style>