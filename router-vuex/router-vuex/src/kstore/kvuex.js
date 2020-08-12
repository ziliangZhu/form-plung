let Vue

class Store {
  constructor (options) {
    this._mutations = options.mutations
    this._actions = options.actions
    this._wrappedGetters = options.getters

    // 定义computed选项
    const computed = {}
    this.getters = {}
    const store = this
    Object.keys(this._wrappedGetters).forEach(key => {
      //获取用户定义的getter
      const fn = store._wrappedGetters[key]
      //转换为compute可以使用的无参形式
      computed[key] = function () {
          return fn(store.state)
      }
      //为getter定义只读属性
      Object.defineProperty(store.getters, key, {
        get: () => store._vm[key]
      })   
    })

    // 响应话处理state
    // this.state = new Vue({
    //   data: options.state
    // })
    // 加两个$Vue/不做代理
    this._vm = new Vue({
      data: {
        $$state: options.state
      },
      computed: {

      }
    })
    // 绑定commit dispatch 上下文store实例
    this.commit = this.commit.bind(this)
    this.dispatch = this.dispatch.bind(this)
  }

  // 存取器 store.state
  get state () {
    return this._vm._data.$$state
  }

  set state (v) {
    console.log('it`s wrone')
  }
  // store.commit('add',1)  type/;mutation类型   payload参数

  commit (type, payload) {
    const entry = this._mutations[type]
    if (entry) {
      entry(this.state, payload)
    }
  }

  dispatch (type, payload) {
    const entry = this._actions[type]
    if (entry) {
      entry(this, payload)
    }
  }
}

function install (_Vue) {
  Vue = _Vue

  Vue.mixin({
    beforeCreate () {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store
      }
    }
  })
}

// Vuex
export default {
  Store,
  install
}
