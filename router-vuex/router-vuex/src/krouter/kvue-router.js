let Vue
// 实现一个插件 挂在$router 实现install方法

class KVueRouter {
  constructor (options) {
    this.$options = options
  }
}

KVueRouter.install = function (_Vue) {
// 保存构造函数，在KVueRouter里面使用
  Vue = _Vue

  //   挂在$router
  //   怎么获取跟市里中的router选项
  Vue.mixin({
    beforeCreate () {
      console.log(this)
      // 确保根实例才执行
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router
      }
    }
  })

  //   实现两个全局组件 router-link router-view
  Vue.component('router-link', {
    props: {
      to: {
        type: String,
        required: true
      }
    },
    render (h) {
      //  <a href="#/about">aaa</a>
      return h('a', {
        attrs: {
          href: '#' + this.to
        }
      }, this.$slots.default)
    }
  })
  Vue.component('router-view', {})
}

export default KVueRouter
