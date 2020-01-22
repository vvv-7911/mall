<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button" 
                    :isChecked="isSelectAll"
                    @click.native="checkClick"/>
      <span>全选</span>
    </div>

    <div class="price">
      合计: {{totalPrice}}
    </div>

    <div class="calculate">
      去计算({{checkLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from '@/components/content/checkButton/CheckButton'

export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  computed: {
    totalPrice() {
      return '¥' + this.$store.state.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.price * item.count
      }, 0).toFixed(2)
    },
    checkLength() {
      return this.$store.state.cartList.filter(item => item.checked).length
    },
    isSelectAll() {
      if (this.$store.state.cartList.length === 0) return false
      //1. 使用find
      // return !(this.$store.state.cartList.find(item => !item.checked))
      //2. 使用filter
      // return !(this.$store.state.cartList.filter(item => !item.checked).length)
      //3. 使用for循环
      for (let item of this.$store.state.cartList) {
        if (!item.checked) {
          return false
        }
      }
      return true
    }
  },
  methods: {
    checkClick() {
      if (this.isSelectAll) { // 全选中状态
        this.$store.state.cartList.forEach(item => item.checked = false)
      } else { // 部分不选中或全不选中
        this.$store.state.cartList.forEach(item => item.checked = true)
      }
    }
  },
}
</script>

<style scoped>
.bottom-bar {
  position: relative;
  display: flex;

  height: 40px;
  background-color: #eee;
  line-height: 40px;
  font-size: 14px;
}
.check-content {
  display: flex;
  width: 60px;
  align-items: center;
  margin-left: 10px;
}
.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}
.price {
  margin-left: 20px;
  flex: 1;
}
.calculate {
  width: 90px;
  text-align: center;
  background-color: red;
  color: #fff;
}
</style>
