<template>
    <div class="item-list">
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="_id" label="ID" width="220"></el-table-column>
            <el-table-column prop="name" label="物品名称"></el-table-column>
            <el-table-column prop="icon" label="物品图标">
                <template slot-scope="scope">
                    <img class="items-icon" :src="scope.row.icon" alt="icon">
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="120">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="handleEdit(scope.row)"><i class="el-icon-edit"></i>编辑</el-button>
                    <el-button type="text" size="small" @click="handleDelete(scope.row)"><i class="el-icon-delete"></i>删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    data() {
        return {
            tableData: []
        };
    },
    created() {
        this.handleGetList();
    },
    methods: {
        async handleGetList() {
            try {
                const result = await this.$http.get('/rest/items');
                this.tableData = result;
            } catch (error) {
                console.log("err", error);
            }
        },
        handleEdit(scope) {
            this.$router.push(`/items/edit/${scope._id}`);
        },
        handleDelete(scope) {
            this.$confirm(`是否确定删除分类【${scope.name}】?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
            .then(() => {
                this.$http.delete(`/rest/items/${scope._id}`).then(() => {
                    this.$message.success('删除成功')
                    this.handleGetList()
                })
                .catch(error => {
                    console.log("err", error);
                })
            })
        }
    }
};
</script>
<style lang="scss" scoped>
.items-icon {
    height: 3rem;
    vertical-align: middle;
}
</style>
