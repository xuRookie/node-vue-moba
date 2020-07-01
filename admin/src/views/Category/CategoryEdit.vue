<template>
    <div class="category">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>新建分类</span>
                <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>
            <el-form :model="categoryForm" label-width="120px" @submit.native.prevent="handleSubmit">
                <el-form-item label="名称" props="name">
                    <el-input v-model="categoryForm.name"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" native-type="submit">保存</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<script>
export default {
    data() {
        return {
            categoryForm: {
                name: ''
            }
        }
    },
    methods: {
        // 表单提交
        async handleSubmit() {
            const res = await this.$http.post('categories', this.categoryForm)
            this.$message.success('新增成功')
            this.$router.push('/categories/list')
        }
    }
}
</script>
