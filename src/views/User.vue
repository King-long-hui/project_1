<template>
  <div class="manage">
    <el-dialog
      title="新增用户"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <!-- 用户的表单信息 -->
      <el-form
        ref="form"
        :rules="rules"
        inline
        :model="form"
        label-width="80px"
      >
        <el-form-item label="姓名" prop="name">
          <el-input placeholder="请输入姓名" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input placeholder="请输入年龄" v-model="form.age"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择性别">
            <el-option label="男" :value="1"></el-option>
            <el-option label="女" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="birth">
          <el-date-picker
            v-model="form.birth"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="家庭住址" prop="addr">
          <el-input placeholder="请输入家庭住址" v-model="form.addr"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancle">取 消</el-button>
        <el-button type="primary" @click="handlerSubmit">确 定</el-button>
      </span>
    </el-dialog>
    <div class="manage-header">
      <el-button @click="dialogVisible = true" type="primary" :modelType="0">
        + 新增
      </el-button>
      <!-- form的搜索区 -->
      <el-form :model="userForm" :inline="true">
        <el-form-item>
          <el-input placeholder="请输入姓名" v-model="userForm.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="commonTable">
      <el-table :data="tableData" stripe style="width: 100%" height="90%">
        <el-table-column prop="name" label="姓名"> </el-table-column>
        <el-table-column prop="age" label="年龄"> </el-table-column>
        <el-table-column prop="sex" label="性别">
          <template slot-scope="scope">
            <!-- 在table中对prop使用过滤器进行数据不同的映射时，需要使用插槽 -->
            {{ scope.row.sex | changeSexWord(scope.row.sex) }}
          </template>
        </el-table-column>
        <el-table-column prop="birth" label="出生日期"> </el-table-column>
        <el-table-column prop="addr" label="地址"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
              :modelType="1"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination
          @current-change="handleCurrentChange"
          :page-size="pageData.limit"
          layout="prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getUser, addUser, editUser, delUser } from "../api/index.js";
export default {
  data() {
    return {
      dialogVisible: false,
      form: {
        name: "",
        age: "",
        sex: "",
        birth: "",
        addr: "",
      },
      rules: {
        name: [{ required: true, message: "请输入姓名" }],
        age: [{ required: true, message: "请输入年龄" }],
        sex: [{ required: true, message: "请选择性别" }],
        birth: [{ required: true, message: "请输入出生日期" }],
        addr: [{ required: true, message: "请输入地址" }],
      },
      tableData: [],
      modelType: 0, // 0表示新增弹窗，1表示编辑弹窗
      total: 0, // 表示当前数据的总条数，默认为零
      pageData: {
        // 返回的页码数和页面的数据行数
        page: 1,
        limit: 20,
      },
      userForm: {
        name: "",
      },
    };
  },
  methods: {
    // 用户输入信息后，点击提交就可以关闭表单
    handlerSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.modelType === 0) {
            addUser(this.form).then(() => {
              // console.log(this.form)
              // this.tableData.unshift(this.form)
              // 重新获取用户数据
              this.getUserList();
            });
          } else {
            editUser(this.form).then(() => {
              // console.log(this.form);
              this.getUserList();
            });
          }
          // 可以获取输入的表单信息并进行处理
          // console.log(this.form);
          // 关闭表单
          this.dialogVisible = false;

          this.$refs.form.resetFields();
        }
      });
    },
    // 点击关闭图标后无论是否提交还是关闭表单都重置表单
    handleClose() {
      // 重置表单
      this.$refs.form.resetFields();
      this.dialogVisible = false;
    },
    // 点击取消后无论是否提交都执行关闭
    cancle() {
      this.handleClose();
    },
    handleEdit(index, row) {
      // console.log(index, row);
      this.modelType = 1;
      this.dialogVisible = true;

      // 注意这里需要对当前行数据进行深拷贝，否则会出错
      // console.log(row)
      // console.log(JSON.stringify(row))
      // console.log(JSON.parse(JSON.stringify(row)))
      this.form = JSON.parse(JSON.stringify(row));
    },
    handleDelete(index, row) {
      // console.log(index,row)
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delUser({ id: row.id }).then(() => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            // 重新获取用户数据
            this.getUserList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 封装获取用户数据列表方法
    getUserList() {
      // ES6 的合并对象属性的写法
      getUser({ params: { ...this.userForm, ...this.pageData } }).then(
        ({ data }) => {
          // console.log(data)

          // 给tableList中赋值
          this.tableData = data.list;

          // 给total返回数据总数
          this.total = data.count || 0;
        }
      );
    },
    // 页面跳转
    handleCurrentChange(pageNum) {
      // console.log(pageNum)
      this.pageData.page = pageNum;
      this.getUserList();
    },
    // 查询方法
    onSubmit(){
      this.getUserList()
    }
  },
  mounted() {
    // 获取用户数据
    this.getUserList();
  },
  filters: {
    changeSexWord(sex) {
      if (sex === 0) {
        return "女";
      } else {
        return "男";
      }
    },
  },
};
</script>

<style lang="less" scoped>
.manage {
  height: 90%;
  .manage-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .commonTable {
    height: calc(100% - 62px);
    background-color: #fff;
    position: relative;
    .page {
      position: absolute;
      bottom: 0;
      right: 20px;
    }
  }
}
</style>