<template>
  <div class="rwhxWeb">
    <div @click="showRight" v-show="!isShow">
        <img src="../assets/image/人物图谱.png" />
   </div>
    <div v-show="isShow">
      <div class="rwhxWebLeft">
        <img src="../assets/image/人物图谱.png" />
      </div>
      <div class="rwhxWebRight">
        <img v-show="isShow" src="../assets/image/右侧栏.png" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
    };
  },
  methods: {
    showRight() {
      this.isShow = !this.isShow;
    },
  },
};
</script>

<style>
.rwhxWeb {
  width: 100%;
  position: absolute;
  z-index: 999;
  display: flex;
  justify-content: space-around;
}
.rwhxWebLeft {
  float: left;
}
.rwhxWebLeft img {
  width: auto;
  height: 690px;
  background-size: contain;
}
.rwhxWebRight {
  float: right;
}
.rwhxWebRight img {
  width: auto;
  height: 690px;
  background-size: contain;
}
</style>
