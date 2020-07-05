<template>
    <div class="admin-user-create">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>{{id ? '编辑' : '新增'}}管理员</span>
                <el-button class="btn-back" v-if="id" type="text" @click="handleBack">返回</el-button>
            </div>
            <el-form :model="modelForm" ref="modelForm" label-width="120px" @submit.native.prevent="handleSubmit">
                <el-form-item label="名称" prop="username">
                    <el-input v-model="modelForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input :type="inputType" v-model="modelForm.password">
                        <i
                            class="el-icon-view el-input__icon"
                            slot="suffix"
                            @click="handleIconClick">
                        </i>
                    </el-input>
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
            inputType: 'password',
            modelForm: {
                username: '',
                password: ''
            }
        }
    },
    created () {
        this.id && this.handleGetDetails()
    },
    methods: {
        async handleGetDetails() {
            try {
                const details = await this.$http.get(`/rest/admin_users/${this.id}`)
                this.modelForm = Object.assign({}, this.modelForm, details)
            } catch (error) {
                const {message} = error.data
                this.$message.error(message || error.statusText || '详情获取失败')
            }
        },
        handleIconClick() {
            this.inputType = this.inputType == 'password' ? 'text' : 'password'
        },
        // 表单提交
        async handleSubmit() {
            try {
                if (this.id) {
                    await this.$http.put('/rest/admin_users', this.modelForm)
                } else {
                    await this.$http.post('/rest/admin_users', this.modelForm)
                }
                this.$message.success('保存成功')
                this.$router.push('/admin_users/list')
            } catch (error) {
                const {message} = error.data
                this.$message.error(message || error.statusText || '保存失败')
            }
        },
        handleReset() {
            for (let key in this.modelForm) {
                this.modelForm[key] = ''
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
