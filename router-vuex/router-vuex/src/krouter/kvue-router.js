let Vue
// 实现一个插件 挂在$router 实现install方法

class KVueRouter {
  constructor (options) {
    this.$options = options
    // 需要创建响应式的current
    // Vue.util.defineReactive(this, 'current', '/')
    this.current = window.location.hash.slice(1) || '/'
    Vue.util.defineReactive(this, 'matched', [])
    // match 方法可以递归遍历路由表或得路由关系数组
    this.match()
    // 监听URL变化

    window.addEventListener('hashchange', this.onHashChange.bind(this))
    window.addEventListener('load', this.onHashChange.bind(this))

    // this.routeMap = {}
    // options.routes.forEach(route => {
    //   this.routeMap[route.path] = route
    // })
  }

  onHashChange () {
    this.current = window.location.hash.slice(1)
    this.matched = []
    this.match()
  }

  match (route) {
    const routes = route || this.$options.routes
    for (const route of routes) {
      if (route.path === '/' && this.current === '/') {
        this.matched.push(route)
        return
      }

      if (route.path !== '/' && this.current.indexOf(route.path) !== -1) {
        this.matched.push(route)
        if (route.children) {
          this.match(route.children)
        }
        return
      }
    }
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

      this.$vnode.data.routerView = true
      let depth = 0
      let parent = this.$parent
      while (parent) {
        const vnodeData = parent.$vnode && parent.$vnode.data
        if (vnodeData) {
          if (vnodeData.routerView) {
            // 说明当前parent是一个touter-view
            depth++
          }
        }
        parent = parent.$parent
      }
      //   const { routeMap, current } = this.$router
      //   const component = routeMap[current].component || null

      let component = null
      const route = this.$router.matched[depth]
      if (route) {
        component = route.component
      }
      return h(component)
    }
  })
}

export default KVueRouter
