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
                label-width="120px"
                @submit.native.prevent="handleSubmit"
            >
                <!-- <el-form-item label="上级分类" props="parent">
                    <el-select v-model="itemForm.parent">
                        <el-option
                            v-for="item in parents"
                            :key="item._id"
                            :label="item.name"
                            :value="item._id"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>-->
                <el-form-item label="名称" props="name">
                    <el-input v-model="itemForm.name"></el-input>
                </el-form-item>
                <el-form-item label="图标" props="icon">
                    <el-upload
                        class="avatar-uploader"
                        :action="$http.defaults.baseURL + '/upload'"
                        :show-file-list="false"
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
        // this.handleGetParents()
        this.id && this.handleGetDetails();
    },
    methods: {
        async handleGetParents() {
            try {
                const list = await this.$http.get("/rest/items");
                this.parents = list;
            } catch (error) {
                console.log(error);
            }
        },
        async handleGetDetails() {
            try {
                const details = await this.$http.get(`/rest/items/${this.id}`);
                const { __v, ...res } = details;
                this.itemForm = res;
            } catch (error) {
                console.log(error);
            }
        },
        // 表单提交
        async handleSubmit() {
            try {
                let res = undefined;
                if (this.id) {
                    res = await this.$http.put("/rest/items", this.itemForm);
                } else {
                    res = await this.$http.post("/rest/items", this.itemForm);
                }
                this.$message.success("保存成功");
                this.$router.push("/items/list");
            } catch (error) {
                console.log(error);
            }
        },
        handleAvatarSuccess(res, file) {
            console.log('res', res)
            this.itemForm.icon = res.url
            // this.itemForm.icon = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            // const isJPG = file.type === "image/jpeg";
            const isLt5M = file.size / 1024 / 1024 < 5;

            // if (!isJPG) {
            //     this.$message.error("上传头像图片只能是 JPG 格式!");
            // }
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
        $route: function(newValue) {
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
.avatar-uploader /deep/ .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 54px;
    height: 54px;
    line-height: 54px;
    text-align: center;
}
.avatar {
    width: 54px;
    height: 54px;
    display: block;
}
</style>
