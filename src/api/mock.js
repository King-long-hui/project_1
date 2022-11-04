import Mock from "mockjs";
import homeApi from "./mockServeData/permission.js"
import user from "./mockServeData/user.js"
import userPermission from "./mockServeData/userPermision.js"

// 定义mock请求拦截 模拟后端发送响应数据
Mock.mock('/api/home/getData','get', homeApi.getStatisticalData)

// 用户列表的数据
Mock.mock('/api/user/add',"post",user.createUser)
Mock.mock('/api/user/del',"post",user.deleteUser)
Mock.mock('/api/user/edit',"post",user.updateUser)
Mock.mock(/api\/user\/getUser/,user.getUserList)
// Mock.mock('/api/user/batDel',user.batchremove)

Mock.mock(/api\/userPermission\/getMenu/,"post",userPermission.getMenu)