<template>
  <div>
    <HelloWorld></HelloWorld>
    <KForm :model="userInfo" :rules="rules" ref="loginForm">
      <KFormItem label="用户名" prop="username">
        <KInput v-model="userInfo.username" placeholder="请输入用户名"></KInput>
        {{userInfo.username}}
      </KFormItem>
      <KFormItem label="用户密码" prop="password">
        <KInput type="password" v-model="userInfo.password" placeholder="请输入用户密码"></KInput>
        {{userInfo.password}}
      </KFormItem>
      <KFormItem>
        <button @click="login">登陆</button>
      </KFormItem>
    </KForm>
  </div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld.vue";
import KInput from "@/components/KInput.vue";
import KFormItem from "@/components/KFormItem.vue";
import KForm from '@/components/KForm.vue';
import Notice from '@/components/Notice.vue';
export default {
  name: "About",
  data() {
    return {
      userInfo: {
        username: "",
        password: "",
      },
      rules: {
        username: [{ required: true, message: "请您输入用户名" }],
        password: [{ required: true, message: "请输入密码" }],
      },
    };
  },
  components: {
    HelloWorld,
    KInput,
    KFormItem,
    KForm
  },
  methods: {
    login() {
      this.$refs["loginForm"].validate(valid => {
        const notice = this.$create(Notice,{
          title:'sssss',
          message:valid?"请求登陆":"校验失败",
          duration:1000
        })
        notice.show()
        /* if(valid){
          // alert("submit")
          // this.$create(Notice)

        }else{
          console.log("error submit!")
          return false
        } */
      })
    }
  },
};
</script>

<style lang="scss" scoped>
</style>
