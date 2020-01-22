<template>
  <div id="detail">
    <detail-nav-bar ref="nav" class="detail-nav" @titleClick="titleClick"/>
    <scroll class="content" 
            ref="scroll" 
            :probeType="3"
            @scroll="contentScroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="params" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommendList"/>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"/>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
    <toast :message="message" :show="show"/>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'

import Scroll from '@/components/common/scroll/Scroll'
import GoodsList from '@/components/content/goods/GoodsList'
import Toast from '@/components/common/toast/Toast'

import {getDetail, Goods, Shop, GoodsParam, getRecommend} from '@/network/detail.js'
import {debounce} from '@/common/until'
import {itemListenerMixin, backTopMixin} from '@/common/mixin'
import { mapActions } from 'vuex'

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList,
    Toast
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommendList: [],
      themeTopYs: [],
      getThemeY: null,
      currentIndex: 0,
      message: '',
      show: false
    }
  },
  mixins: [itemListenerMixin, backTopMixin],
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid
    // 2. 根据iid请求详情数据
    getDetail(this.iid).then(res => {
      console.log(res)
      const data = res.result
      //1.获取顶部的图片轮播数据
      this.topImages = data.itemInfo.topImages
      //2.获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      //3.获取店铺信息
      this.shop = new Shop(data.shopInfo)
      // 4.保存商品的详情数据
      this.detailInfo = data.detailInfo
      // 5.获取参数的信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      // 6.获取评论信息
      if (data.rate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
    })
    // 3. 获取推荐数据
    getRecommend().then(res => {
      this.recommendList = res.data.list
    })

    // 4.给getThemeY赋值(对给 this.themeTopYs赋值的操作进行防抖)
    this.getThemeY = debounce(() => {
      this.themeTopYs = []
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      this.themeTopYs.push(Number.MAX_VALUE)
      console.log(this.themeTopYs)
    },100)
  },
  methods: {
    ...mapActions(['addCart']),
    imageLoad() {
      //1.监听详情页面图片加载完后重刷新一次
      this.refresh()
      //2.获取详情页面的offsetTop
      this.getThemeY()
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
    },
    contentScroll(position) {
      // 1. 判断BackTop是否展示
      this.listenShowBackTop(position)

      //2.滚动内容显示对应标题
      const positionY = -position.y;
      let length = this.themeTopYs.length
      for (let i = 0; i < length; i++) {
        if(this.currentIndex !== i && (positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i+1])) {
          this.currentIndex = i
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
    },
    // 添加到购物车
    addToCart() {
      // 1.获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid

      // 2.将商品添加到购物车里
      this.addCart(product).then(res => {
        this.message = res
        this.show = true
        setTimeout(() => {
          this.message = ''
          this.show = false
        }, 1500)
      })
    }
  },
  mounted() {
  },
  destroyed() {
    this.$bus.$off('itemImageLoad', this.itemImgListener)
  },
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.content {
  height: calc(100% - 44px - 49px);
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>
