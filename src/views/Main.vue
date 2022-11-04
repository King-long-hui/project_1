<template>
    <div>
        <el-container id="container-01">
            <el-aside width="auto">
                <common-aside />
            </el-aside>
            <el-container>
                <el-header><common-header /></el-header>
                <common-tag />
                <el-main>
                    <!-- <h1>i am main</h1> -->
                    <!-- 路由匹配到的组件将渲染在这里 -->
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import CommonAside from "../components/CommonAsid"
import CommonHeader from "../components/CommonHeader.vue"
import CommonTag from "../components/CommonTag"
export default {
    data(){
        return {
            
        }
    },
    components:{
        CommonAside,
        CommonHeader,
        CommonTag,
    }

}
</script>

<style lang="less" scoped>
.el-header{
    padding: 0;
}

</style>