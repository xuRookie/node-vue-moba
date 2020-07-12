<template>
  <div class="page-article">
      <div class="d-flex py-3 px-2">
          <div class="iconfont iconarrow-lift text-blue"></div>
          <strong class="flex-1 text-blue">
              {{model.title}}
          </strong>
          <div class="text-grey">20193-34-34</div>
      </div>
      <div v-html="model.body" class="px-3 article-body"></div>
      <div class="px-3 border-top py-3">
          <div class="d-flex ai-center">
              <i class="iconfont iconemail"></i>
              <strong class="text-blue fs-lg">相关咨询</strong>
          </div>
      </div>
      <div>
          <router-link tag="div"
            v-for="(item, index) in model.related"
            :key="index"
            :to="`/articles/${item._id}`"
            class="py-1 px-2">
              {{item.title}}
          </router-link>
      </div>
  </div>
</template>

<script>
export default {
    props: {
        id: { required: true }
    },
    data () {
        return {
            model: {}
        }
    },
    created () {
        this.handleGetDetails()
    },
    methods: {
        async handleGetDetails() {
            try {
                const res = await this.$http.get(`articles/${this.id}`)
                this.model = res
            } catch (error) {
                console.log(error)
            }
        }
    },
    watch: {
        id: function() {
            this.handleGetDetails()
        }
    }
}
</script>
<style lang="scss" scoped>
.article-body {

    img {
        max-width: 100%;
        height: auto;
    }
    iframe {
        max-width: 100%;
        height: auto;
    }
}
</style>
