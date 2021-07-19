<template>
  <div class="headerTitle">
    <span style="margin-right:10px;">图片logo</span>
    <span
      class="headerSpan"
      v-for="(item, index) in dataInfo.data"
      :key="index"
      @click="getClick(item.value)"
     :class="{ active:headerCur == item.value}"
      >{{ item.name }}</span
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataInfo: {
        isShow: "header",
        data: [
          { name: "政治", value: 1 },
          { name: "安全", value: 2 },
          { name: "经济", value: 3 },
          { name: "外交", value: 4 },
          { name: "军事", value: 5 },
          { name: "科技", value: 6 },
        ],
      },
      headerCur: "",
    };
  },
  methods: {
    getClick(v) {
      this.headerCur = v;
      this.$emit("itemChildren", v);
    },
  },
};
</script>

<style>
.headerSpan {
  color: #83e3ff;
  margin-right: 15px;
}
.active {
  color: red;
}
</style>