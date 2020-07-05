<template>
    <div class="advert-list">
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="_id" label="ID" width="220"></el-table-column>
            <el-table-column prop="name" label="名称"></el-table-column>
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
                const result = await this.$http.get('/rest/ads');
                this.tableData = result;
            } catch (error) {
                const {message} = error.data
                this.$message.error(message || error.statusText || '广告位列表获取失败')
            }
        },
        handleEdit(scope) {
            this.$router.push(`/ads/edit/${scope._id}`);
        },
        handleDelete(scope) {
            this.$confirm(`是否确定删除【${scope.name}】?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
            .then(() => {
                this.$http.delete(`/rest/ads/${scope._id}`).then(() => {
                    this.$message.success('删除成功')
                    this.handleGetList()
                })
                .catch(error => {
                    const {message} = error.data
                    this.$message.error(message || error.statusText || '删除失败')
                })
            })
        }
    }
};
</script>
<style lang="scss" scoped>
</style>
