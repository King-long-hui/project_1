<template>
  <div>
    <el-form
      ref="form"
      label-width="70px"
      :inline="true"
      class="login-container"
      :model="loginForm"
      :rules="loginRules"
    >
      <h3 class="login_title">系统登录</h3>
      <el-form-item label="用户名" prop="username">
        <el-input
          v-model="loginForm.username"
          placeholder="请输入账号"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          placeholder="请输入密码"
          v-model="loginForm.password"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          style="margin-top: 10px; margin-left: 105px"
          @click="submit"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Mock from "mockjs";
import Cookie from "js-cookie";
import { getMenu } from "../api/index.js";
import {mapMutations} from "vuex"
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", message: "请输入用户名" },
        ],
        password: [
          { required: true, trigger: "blur", message: "请输入用密码" },
        ],
      },
    };
  },
  methods: {
    ...mapMutations(['SET_MENU','ADD_ROUTERS']),
    // 登录
    submit() {
      // // 利用mock模拟后端发送token
      // const token = Mock.Random.guid();
      // // 将token信息存入cookie用于不同页面间的通信
      // Cookie.set('token',token)

      // 校验通过
      this.$refs.form.validate((valid) => {
        if (valid) {
          getMenu(this.loginForm).then(({ data }) => {
            console.log(data);
            if (data.code === 20000) {
              //token信息存入cookie用于不同页面间的通信
              Cookie.set("token", data.data.token);

              // 获取菜单的数据，存入store中
              this.SET_MENU(data.data.menu)

              // 获取路由 router实例
              this.ADD_ROUTERS(this.$router)
              
              // // 跳转到首页
              this.$router.push('/home')
            }else {
                this.$message.error('密码有误，请重新输入！');
            }
          });
        }
      });
    },
  },
};
</script>


<style lang="less" scoped>
.login-container {
  width: 350px;
  border: 1px solid #eaeaea;
  margin: 180px auto;
  padding: 35px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 0 25px #cac6c6;
  box-sizing: border-box;
  .el-input {
    width: 198px;
  }
  .login_title {
    margin-bottom: 40px;
    text-align: center;
    color: #505458;
  }
}
</style>