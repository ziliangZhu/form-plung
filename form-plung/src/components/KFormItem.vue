<template>
  <div>
    <!-- label -->
    <label v-if="label">{{label}}</label>
    <slot></slot>
    <!-- 校验信息 -->
    <p v-if="error">{{error}}</p>
  </div>
</template>

<script>
import Schema from "async-validator";
import emitter from "@/mixins/emitter.js";
export default {
  name: "KFormItem",
  componentName: "KFormItem",
  mixins: [emitter],
  inject: ["form"],
  data() {
    return {
      error: "", //error空说明校验通过
    };
  },
  props: {
    label: {
      type: String,
      default: "",
    },
    prop: {
      type: String,
    },
  },
  mounted() {
    this.$on("validate", () => {
      this.validate();
    });

    // 派发事件，通知KForm，新增一个KFormItem
    if (this.prop) {
      this.dispatch("KForm", "kkb.form.addField", [this]);
    }
  },
  methods: {
    validate() {
      //规则
      const rules = this.form.rules[this.prop];
      //当前值
      const value = this.form.model[this.prop];

      const desc = { [this.prop]: rules };
      // 创建schema
      const schema = new Schema(desc);
      return schema.validate({ [this.prop]: value }, (errors) => {
        if (errors) {
          this.error = errors[0].message;
        } else {
          this.error = "";
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>