<template>
    <div class="item-create">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>{{id ? '编辑' : '新增'}}物品</span>
                <el-button class="btn-back" v-if="id" type="text" @click="handleBack">返回</el-button>
            </div>
            <el-form
                :model="itemForm"
                ref="itemForm"
                label-width="68px"
                @submit.native.prevent="handleSubmit"
            >
                <el-form-item label="名称" props="name">
                    <el-input v-model="itemForm.name"></el-input>
                </el-form-item>
                <el-form-item label="图标" props="icon">
                    <el-upload
                        class="avatar-uploader"
                        :action="uploadUrl"
                        :show-file-list="false"
                        :headers="getAuthorization()"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                    >
                        <img v-if="itemForm.icon" :src="itemForm.icon" class="avatar" />
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
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
            itemForm: {
                name: "",
                icon: ""
            }
        };
    },
    created() {
        this.id && this.handleGetDetails();
    },
    methods: {
        async handleGetDetails() {
            try {
                const details = await this.$http.get(`/rest/items/${this.id}`);
                this.itemForm = Object.assign({}, this.itemForm, details)
            } catch (error) {
                const {message} = error.data
                this.$message.error(message || error.statusText || '详情获取失败')
            }
        },
        // 表单提交
        async handleSubmit() {
            try {
                if (this.id) {
                    await this.$http.put("/rest/items", this.itemForm);
                } else {
                    await this.$http.post("/rest/items", this.itemForm);
                }
                this.$message.success("保存成功");
                this.$router.push("/items/list");
            } catch (error) {
                const {message} = error.data
                this.$message.error(message || error.statusText || '保存失败')
            }
        },
        handleAvatarSuccess(res) {
            this.itemForm.icon = res.url
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
        handleReset() {
            for (let key in this.itemForm) {
                this.itemForm[key] = "";
            }
        },
        handleBack() {
            this.$router.go(-1);
        }
    },
    watch: {
        $route: function() {
            if (!this.id) this.handleReset();
        }
    }
};
</script>
<style lang="scss" scoped>
.btn-back {
    float: right;
    padding: 3px 0;
}
</style>
