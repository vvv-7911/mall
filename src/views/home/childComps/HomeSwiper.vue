<template>
  <swiper>
    <swiperItem v-for="(item, index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad">
      </a>
    </swiperItem>
  </swiper>
</template>

<script>
import {Swiper, SwiperItem} from '@/components/common/swiper'

export default {
  name: "homeSwiper",
  data() {
    return {
      isLoad: false
    }
  },
  props: {
    banners: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    imageLoad() {
      if (!this.isLoad) {
        this.$emit('swiperImageLoad')
        this.isLoad = true
      }
    }
  },
}
</script>

<style scoped>

</style>
