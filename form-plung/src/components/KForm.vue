<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "KForm",
  componentName: "KForm",
  provide() {
    return {
      form: this,
    };
  },
  props: {
    model: {
      type: Object,
      required: "",
    },
    rules: {
      type: Object,
    },
  },
  created() {
    this.fields = [];
    this.$on("kkb.form.addField", (item) => {
      this.fields.push(item);
    });
  },
  methods: {
    validate(cb) {
      //  获取所有KFormInput
      /* const tasks = this.$children
        .filter((item) => item.prop)
        .map((item) => item.validate()); */
      const tasks = this.fields.map(item => item.validate());

      // 统一处理所有promise结果
      Promise.all(tasks)
        .then(() => cb(true))
        .catch(() => cb(false));
    },
  },
};
</script>

<style lang="scss" scoped>
</style>