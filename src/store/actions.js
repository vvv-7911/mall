export default{
  addCart(context, payload) {
    return new Promise((resolve) => {
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      // 判断oldProduct
      if(oldProduct) {
        // oldProduct.count += 1
        context.commit('addCounter', oldProduct)
        resolve('当前商品数量+1')
      } else {
        payload.count = 1
        // state.cartList.push(payload)
        context.commit('addToCart', payload)
        resolve('添加了新的商品')
      }
    })
  }
}