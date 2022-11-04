<template>
  <div class="header-container">
    <div class="l-content">
      <el-button
        @click="handlerMenu"
        icon="el-icon-menu"
        size="mini"
        style="margin-right:20px"
      ></el-button>
      <!-- 面包屑 -->
      <!-- <span class="text">首页</span> -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="tab in this.$store.state.tab.tabList" :key="tab.path" :to="{ path: tab.path }">{{tab.label}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown @command="handlerClick">
        <img src="../assets/images/user.png" class="user" />
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item command="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import Cookie from "js-cookie"
export default {
  data() {
    return {};
  },
  methods: {
    handlerMenu() {
      this.$store.dispatch("collapseMenu");
    },
    handlerClick(command){
      if (command === "logout"){
        console.log("logout")
        // 清除cookie中的token信息
        Cookie.remove('token')
        // 清除cookie中的menu信息
        Cookie.remove('menu')
        // 跳转到登录页面
        this.$router.push('/login')
      }
    }
  },
  computed: {
    // tabList : this.$store.state.tab.tabList
  },
  mounted() {
    // console.log(this.$store.state.tab.tabList)
  },
};
</script>

<style lang="less" scoped>
.header-container {
  padding: 0 20px;
  background-color: #333;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .text {
    color: #fff;
    font-size: 14px;
    margin-left: 10px;
  }
  .r-content {
    .user {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
  .l-content{
    display: flex;
    align-items: center;
    /deep/.el-breadcrumb__item{
      .el-breadcrumb__inner{
        font-weight: normal;
        &.is-link{
          color: #666;
        }
      }
      &:last-child{
        .el-breadcrumb__inner{
          color: #fff;
        }
      }
    }
  }

}
</style>