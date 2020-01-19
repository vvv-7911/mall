<template>
  <div class="wrapper" ref="aaa">
    <ul>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
    </ul>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: "Category",
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
    // console.log(document.querySelector('wrapper'))
    this.scroll = new BScroll(this.$refs.aaa,{

    })
  },
}
</script>

<style scoped>
  .wrapper {
    height: 150px;
    background-color: green;
  }
</style>
