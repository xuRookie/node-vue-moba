<template>
    <el-container>
        <el-aside>
            <el-menu :default-openeds="['1', '3']" router>
                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-message"></i>内容管理
                    </template>
                    <el-menu-item-group>
                        <template slot="title">分类</template>
                        <el-menu-item index="/categories/create">新建分类</el-menu-item>
                        <el-menu-item index="/categories/list">分类列表</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group>
                        <template slot="title">物品</template>
                        <el-menu-item index="/items/create">新建物品</el-menu-item>
                        <el-menu-item index="/items/list">物品列表</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>
        </el-aside>

        <el-container>
            <el-header>
                <el-dropdown>
                    <i class="el-icon-setting" style="margin-right: 15px"></i>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>查看</el-dropdown-item>
                        <el-dropdown-item>新增</el-dropdown-item>
                        <el-dropdown-item>删除</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <span>王小虎</span>
            </el-header>

            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
export default {
    data() {
        return {

        };
    }
};
</script>
<style lang="scss" scoped>
.el-container {
    height: 100vh;
}
.el-header {
    text-align: right;
    line-height: 60px;
    font-size: 12px;
    color: #333;
    background-color: #b3c0d1;
}

.el-aside {
    width: 200px;
    color: #333;
    background-color: #eef1f6;
}
</style>
