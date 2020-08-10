let Vue
// 实现一个插件 挂在$router 实现install方法

class KVueRouter {
  constructor (options) {
    this.$options = options
    // 需要创建响应式的current
    Vue.util.defineReactive(this, 'current', '/')
    // this.current = '/'
    // 监听URL变化
    window.addEventListener('hashchange', this.onHashChange.bind(this))
    window.addEventListener('load', this.onHashChange.bind(this))

    this.routeMap = {}
    options.routes.forEach(route => {
      this.routeMap[route.path] = route
    })
  }

  onHashChange () {
    this.current = window.location.hash.slice(1)
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
  Vue.component('router-view', {
    render (h) {
    // 获取path对应的component
      /* let component = null
      this.$router.$options.routes.forEach(route => {
        if (route.path === this.$router.current) {
          component = route.component
        }
      }) */
      const { routeMap, current } = this.$router
      const component = routeMap[current].component || null
      return h(component)
    }
  })
}

export default KVueRouter
