<template>
  <div class="menuItemsArea">
    <el-menu
      :default-active="defaultActive || '0-0'"
      class="el-menu-vertical-item"
      @open="handleOpen"
      @close="handleClose"
      @select="handleSelect"
    >
      <slot v-for="(d, i) in menuData">
        <slot v-if="d.children">
          <el-submenu :index="String(i)">
            <template slot="title">
              <i v-if="d.icon" :class="d.icon"></i>
              <span>{{d.label}}</span>
            </template>
            <slot v-for="(t, j) in d.children">
              <el-menu-item :index="i + '-' + j">
                <template slot="title">
                  <i v-if="t.icon" :class="t.icon"></i>
                  <span>{{t.label}}</span>
                </template>
              </el-menu-item>
            </slot>
          </el-submenu>
        </slot>
        <slot v-else="!d.children">
          <el-menu-item :index="i + ''">
            <template slot="title">
              <i v-if="d.icon" :class="d.icon"></i>
              <span>{{d.label}}</span>
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
    this.defaultActive = this.menuInfo.defaultActive || this.defaultActive;
    this.menuData = this.menuInfo.data || this.menuData;
  },
  data() {
    return {
      defaultActive: "1-1",
      menuData: [
        {
          icon: "",
          label: "菜单项1",
          children: [
            {
              icon: "",
              label: "菜单项1-1"
            },
            {
              icon: "",
              label: "菜单项1-2"
            }
          ]
        },
        {
          icon: "",
          label: "菜单项2",
          children: [
            {
              icon: "",
              label: "菜单项2-1"
            },
            {
              icon: "",
              label: "菜单项2-2"
            }
          ]
        },
        {
          icon: "",
          label: "菜单项3"
        },
        {
          icon: "",
          label: "菜单项4",
          children: [
            {
              icon: "",
              label: "菜单项4-1"
            },
            {
              icon: "",
              label: "菜单项4-2"
            }
          ]
        }
      ]
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  created() {},
  props: {
    menuInfo: Object
  }
};
</script>

<style scoped>
.menuItemsArea {
  width: 100%;
  height: 100%;
}
</style>
