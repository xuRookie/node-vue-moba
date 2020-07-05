<template>
    <div class="advert-create">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>{{id ? '编辑' : '新增'}}广告位</span>
                <el-button class="btn-back" v-if="id" type="text" @click="handleBack">返回</el-button>
            </div>
            <el-form :model="advertForm" ref="advertForm" label-width="140px" @submit.native.prevent="handleSubmit">
                <el-form-item label="名称" prop="name">
                    <el-input v-model="advertForm.name"></el-input>
                </el-form-item>
                <el-form-item label="广告">
                    <el-button type="primary" size="small" icon="el-icon-plus" @click="handleAddAd">添加广告</el-button>
                    <el-row type="flex" class="mt-2" style="flex-wrap: wrap">
                        <el-col :span="24" v-for="(item, index) in advertForm.items"
                            :key="index"
                            class="b-dashed mb-1">
                            <el-form-item label="跳转链接（URL）">
                                <el-input v-model="item.url"></el-input>
                            </el-form-item>
                            <el-form-item label="图标" class="mt-2">
                                <el-upload
                                    class="avatar-uploader"
                                    :action="uploadUrl"
                                    :show-file-list="false"
                                    :headers="getAuthorization()"
                                    :on-success="res => ($set(item, 'image', res.url))"
                                    :before-upload="beforeAvatarUpload"
                                >
                                    <img v-if="item.image" :src="item.image" class="avatar" />
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </el-form-item>
                            <el-form-item class="pb-1">
                                <el-button type="danger" size="small" @click="handleDeleteAd(index)">删除</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
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
            advertForm: {
                name: '',
                items: []
            }
        }
    },
    created () {
        this.id && this.handleGetDetails()
    },
    methods: {
        async handleGetDetails() {
            try {
                const details = await this.$http.get(`/rest/ads/${this.id}`)
                this.advertForm = Object.assign({}, this.advertForm, details)
            } catch (error) {
                const {message} = error.data
                this.$message.error(message || error.statusText || '广告位详情获取失败')
            }
        },
        beforeAvatarUpload(file) {
            const reg = /(png|jpg|gif|jpeg|webp)$/
            const isLt5M = file.size / 1024 / 1024 < 5;

            if (!reg.test(file.type)) {
                this.$message.error("上传图片格式错误！");
                return false
            }
            if (!isLt5M) {
                this.$message.error("上传头像图片大小不能超过 5MB!");
            }
            return isLt5M;
        },
        handleAddAd() {
            this.advertForm.items.push({})
        },
        handleDeleteAd(index) {
            this.advertForm.items.splice(index, 1)
        },
        // 表单提交
        async handleSubmit() {
            try {
                if (this.id) {
                    await this.$http.put('/rest/ads', this.advertForm)
                } else {
                    await this.$http.post('/rest/ads', this.advertForm)
                }
                this.$message.success('保存成功')
                this.$router.push('/ads/list')
            } catch (error) {
                const {message} = error.data
                this.$message.error(message || error.statusText || '广告位保存失败')
            }
        },
        handleReset() {
            for (let key in this.advertForm) {
                this.advertForm[key] = ''
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
