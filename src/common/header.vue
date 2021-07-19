<template>
  <div class="pageHeader">
    <div class="LogoArea" style="display: inline-block;">
      <slot name="logo">LogArea</slot>
    </div>
    <div class="menuArea">
      <slot name="menu"></slot>
    </div>
    <div class="loginArea" style="display: inline-block;">
      <slot name="login"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },
  methods: {
    dealLoginEvent(param) {

      console.log(param);
    },
  },
  created() {},
};
</script>

<style scoped>
.pageHeader {
  width: 100%;
}

.LogoArea {
  float: left;
  margin-left: 20px;
}

.menuArea {
  float: left;
  margin-left: 20px;
}

.loginArea {
  float: right;
  margin-right: 10px;
}
</style>
