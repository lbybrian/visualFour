<template>
  <div class="menuItemsArea">
    <el-menu
      :default-active="defaultActive || '0-0'"
      :mode="mode || 'horizontal'"
      :collapse="isCollapse"
      :router="router"
      v-if="show"
      @open="handleOpen"
      @close="handleClose"
      @select="handleSelect"
    >
      <slot v-for="(d, i) in menuData">
        <slot v-if="d.children">
          <el-submenu :index="String(i)">
            <template slot="title">
              <i v-if="d.icon" :class="d.icon"></i>
              <span>{{ d.label }}</span>
            </template>
            <slot v-for="(t, j) in d.children">
              <el-menu-item :index="t.path || i + '-' + j">
                <template slot="title">
                  <i v-if="t.icon" :class="t.icon"></i>
                  <span>{{ t.label }}</span>
                </template>
              </el-menu-item>
            </slot>
          </el-submenu>
        </slot>
        <slot v-else="!d.children">
          <el-menu-item :index="d.path || i + ''">
            <template slot="title">
              <i v-if="d.icon" :class="d.icon"></i>
              <span>{{ d.label }}</span>
            </template>
          </el-menu-item>
        </slot>
      </slot>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "",
  beforeMount() {
    if (this.menuInfo) {
      this.updateData(this.menuInfo);
    }
  },
  data() {
    return {
      show: true,
      defaultActive: "1-1",
      isCollapse: false,
      router: false,
      mode: "vertical",
      menuData: [
        {
          icon: "",
          label: "菜单项1",
          children: [
            {
              icon: "",
              label: "菜单项1-1",
            },
            {
              icon: "",
              label: "菜单项1-2",
            },
          ],
        },
        {
          icon: "",
          label: "菜单项2",
          children: [
            {
              icon: "",
              label: "菜单项2-1",
            },
            {
              icon: "",
              label: "菜单项2-2",
            },
          ],
        }
      ],
    };
  },
  methods: {
    updateData(menuInfo) {
      if (menuInfo) {
        this.show = false;
        this.defaultActive = menuInfo.defaultActive || this.defaultActive;
        this.menuData = menuInfo.data || this.menuData;
        this.router = menuInfo.router || true;
        this.isCollapse = menuInfo.isCollapse || this.isCollapse;
        this.mode = menuInfo.mode || this.mode;
        this.$nextTick(function(){
          this.show = true;
        });
      }
      
    },
    swtichMode(flag) {
      if (flag === true || flag === false) {
        this.isCollapse = flag;
      } else {
        this.isCollapse = !this.isCollapse;
      }
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelect(key, keyPath, test) {
      console.log(key, keyPath);
      this.$emit("menuItemSelect", keyPath);
    },
  },
  created() {},
  props: {
    menuInfo: Object,
  },
};
</script>

<style scoped>
.menuItemsArea {
  width: 100%;
  height: 100%;
}
</style>
