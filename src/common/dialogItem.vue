<template>
  <el-dialog
    :title="param.title"
    :visible.sync="param.visible"
    :width="param.width"
    :before-close="handleClose"
    @opened="$emit('openDialog')"
  >
    <slot>Dialog内容区域</slot>
    <span v-if="param.withFooter" slot="footer" class="dialog-footer">
      <el-button size="small" @click="param.visible = false">取 消</el-button>
      <el-button
        size="small"
        type="primary"
        @click="
          param.visible = false;
          $emit('confirmDialog');
        "
        >确 定</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "",
  beforeMount() {
    this.param = this.config || this.param;
    this.param.visible = false;
  },
  data() {
    return {
      dialogVisible: false,
      param: {
        visible: false,
        title: "提示",
        width: "40%",
        withFooter: true,
      },
    };
  },
  methods: {
    close() {
      this.param.visible = false;
    },
    show() {
      this.param.visible = true;
    },
    handleClose() {
      this.close();
    },
  },
  created() {},
  props: {
    config: Object,
  },
};
</script>

<style scoped>
.menuItemsArea {
  width: 100%;
  height: 100%;
}
</style>
