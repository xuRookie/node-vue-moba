<template>
    <div class="category-create">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>{{id ? '编辑' : '新增'}}分类</span>
                <el-button class="btn-back" v-if="id" type="text" @click="handleBack">返回</el-button>
            </div>
            <el-form :model="categoryForm" ref="categoryForm" label-width="120px" @submit.native.prevent="handleSubmit">
                <el-form-item label="上级分类" prop="parent">
                    <el-select v-model="categoryForm.parent">
                        <el-option
                            v-for="item in parents"
                            :key="item._id"
                            :label="item.name"
                            :value="item._id"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="名称" prop="name">
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
    props: {
        id: {
            type: String
        }
    },
    data() {
        return {
            categoryForm: {
                name: '',
                parent: ''
            },
            parents: []
        }
    },
    created () {
        this.handleGetParents()
        this.id && this.handleGetDetails()
    },
    methods: {
        async handleGetParents() {
            try {
                const list = await this.$http.get('/rest/categories')
                this.parents = list
            } catch (error) {
                const {message} = error.data
                this.$message.error(message || error.statusText || '分类获取失败')
            }
        },
        async handleGetDetails() {
            try {
                const details = await this.$http.get(`/rest/categories/${this.id}`)
                this.categoryForm = Object.assign({}, this.categoryForm, details)
            } catch (error) {
                const {message} = error.data
                this.$message.error(message || error.statusText || '分类详情获取失败')
            }
        },
        // 表单提交
        async handleSubmit() {
            try {
                if (this.id) {
                    await this.$http.put('/rest/categories', this.categoryForm)
                } else {
                    await this.$http.post('/rest/categories', this.categoryForm)
                }
                this.$message.success('保存成功')
                this.$router.push('/categories/list')
            } catch (error) {
                const {message} = error.data
                this.$message.error(message || error.statusText || '分类保存失败')
            }
        },
        handleReset() {
            for (let key in this.categoryForm) {
                this.categoryForm[key] = ''
            }
        },
        handleBack() {
            this.$router.go(-1)
        }
    },
    watch: {
        '$route': function() {
            if (!this.id) this.handleReset()
        }
    }
}
</script>
<style lang="scss" scoped>
.btn-back {
    float: right;
    padding: 3px 0;
}
</style>
