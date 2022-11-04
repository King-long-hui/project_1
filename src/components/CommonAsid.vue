<template>
  <div>
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <h3>{{ isCollapse ? '后台' : '通用后台管理系统' }}</h3>
      <el-menu-item @click="clickMenu(item)" v-for="item in noChildren" :key="item.name" :index="item.name">
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{item.label}}</span>
      </el-menu-item>
      <el-submenu v-for="item in hasChildren" :key="item.label" :index="item.label">
        <template slot="title">
          <i :class="`el-icon-${item.icon}`"></i>
          <span slot="title">{{item.label}}</span>
        </template>
        <el-menu-item-group v-for="subItem in item.children" :key="subItem.name">
          <el-menu-item @click="clickMenu(subItem)" :index="subItem.name">{{subItem.label}}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu {
  height: 100vh;
  h3 {
    color: #fff;
    text-align: center;
    line-height: 48px;
    font-size: 16px;
    font-weight: 400;
    border-right: none;
  }
}
</style>

<script>
import Cookie from 'js-cookie'
export default {
  data() {
    return {
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    clickMenu(item){
      console.log(item)
      // 当页面的路由与跳转的路由不一致才允许跳转 
      if(this.$route.path !== item.path && !(this.$route.path === '/home' && (item.path === '/'))){
        this.$router.push(item.path)
      }
      this.$store.dispatch('selectMenu',item)
      // this.$store.commit('SELECT_MENU',item)
    }
  },
  computed: {
    // 沒有子菜单
    noChildren(){
        return this.menuData.filter(item => !item.children)
    },
    // 有子菜单
    hasChildren(){
        return this.menuData.filter(item => item.children)
    },
    isCollapse(){
      return this.$store.state.tab.isCollapse
    },
    // 获取菜单数据
    menuData(){
      // 判断当前数据,如果缓存中没有,在当前store中获取
      return JSON.parse(Cookie.get('menu')) || this.$store.state.tab.menu
    }
  }
};
</script>

