<template>
  <div class="home-container">
    <van-nav-bar title="标题" fixed />

    <!-- 下拉刷新（顶部出数据） disabled 控制禁用-->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" :disabled="finished">
      <!-- 瀑布滚动加载（下边出数据） -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
      <!-- 文章列表 -->
      <ArticleList v-for="item in articleList" :key="item.art_id" :title="item.title" :aut-name="item.aut_name" :comm-count="item.comm_count" :pubdate="item.pubdate" :cover="item.cover"></ArticleList>
    </van-list>
  </van-pull-refresh>
  </div>
</template>

<script>
// 导入组件
import ArticleList from '@/components/Article/ArticleList.vue'

// 按需导入需要的API
import { getArticleAPI } from '@/api/articleAPI.js'

export default {
  name: 'Home',

  components: {
    ArticleList
  },

  data() {
    return {
      // 页码值
      page: 1,
      // 每页文章限制
      limit: 10,

      articleList: [],

      // 是否正在加载 初始值是true 防止上来就Loading
      // （控制调用Load,加载时为true,加载完变为false,不需要手动判断）
      loading: true,

      // 用于判断下拉刷新
      isLoading: true,

      // 是否数据已经全部加载完成（赋值，但不需要手动判断）
      finished: false
    }
  },

  created() {
    this.getData()
    // 请求完数据，将loading改成false
  },

  methods: {
    // 传参数判断是滚动加载还是下拉刷新(如果本来就是false，不用传)
    async getData(isRefresh) {
      const { data: res } = await getArticleAPI(this.page, this.limit)

      // 判断是不是已经将数据全部取出
      if (res.length === 0) {
        this.finished = true
      }
      if (isRefresh) {
        // 下拉刷新，需要往前拼接数据

        this.isLoading = false
        this.articleList = [...res, ...this.articleList]
      } else {
        // 数据请求完毕
        this.loading = false
        // 此次结果要和之前的结果拼接
        this.articleList = [...this.articleList, ...res]
      }
    },
    onLoad() {
      // this.loading = true
      console.log('触发了')
      this.page++
      this.getData()
    },
    onRefresh() {
      console.log('下拉刷新')
      this.page++
      this.getData(true)
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  padding: 46px 0 50px 0;

  .van-nav-bar {
    background-color: #007bff;
  }

  // 覆盖第三方样式不生效，用/deep/ 不仅是后代选择器，变成父[属性]后代选择器
  /deep/ .van-nav-bar__title {
    color: #fff;
  }
}
</style>
