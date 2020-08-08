import Vue from 'vue';

function create(Component,props){
    // 组件的构造函数如何获取
    // 1.vue.extend()

    const Ctor = Vue.extend(Component);

    //  创建 组件实例
    const Comp = new Ctor({propsData:props})
    Comp.$mount()
    document.body.appendChild(Comp.$el)
    Comp.remove = function(){
        document.body.removeChild(Comp.$el)
        Comp.$destroy()
    }
    return Comp


    // 2.render
   /*  const vm = new Vue({
        // h是createElement，返回VNode，是虚拟dom
        // 需要挂载才能变成真实dom
        render:h=>h(Component,{props}),
    }).$mount()//不指定宿主元素，则创建真实dom，但不会追加操作

    document.body.appendChild(vm.$el)

    const comp = vm.$children[0]

    comp.remove = function(){
        document.body.removeChild(vm.$el)
        vm.$destroy()
    }
    return comp */
}

export default create