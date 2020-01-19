<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick"><img src="@/assets/img/common/back.svg" alt=""></div>
      <div slot="center" class="title">
        <div v-for="(item, index) in titles"
           :key="index"
           class="title-item"
           :class="{active: currentIndex === index}"
           @click="itemClick(index)">
          {{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'

export default {
  name: "DetailNavBar",
  components: {
    NavBar
  },
  data() {
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index
    },
    backClick() {
      this.$router.back()
    }
  },
}
</script>

<style scoped>
.title {
  display: flex;
  font-size: 14px;
}
.title-item {
  flex: 1;
}
.back {
  margin-top: 10px;
}
.active {
  color: var(--color-high-text)
}
</style>
