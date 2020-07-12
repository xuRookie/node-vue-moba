<template>
    <div class="hero-create">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>{{id ? '编辑' : '新增'}}英雄</span>
                <el-button class="btn-back" v-if="id" type="text" @click="handleBack">返回</el-button>
            </div>
            <el-form
                :model="heroForm"
                ref="heroForm"
                label-width="88px"
                @submit.native.prevent="handleSubmit"
            >
                <el-tabs v-model="activeName" type="border-card">
                    <el-tab-pane label="基础信息" name="basic">
                        <el-form-item label="名称" prop="name">
                            <el-input v-model="heroForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="头像" prop="avatar">
                            <el-upload
                                class="avatar-uploader"
                                :action="uploadUrl"
                                :show-file-list="false"
                                :headers="getAuthorization()"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload"
                            >
                                <img v-if="heroForm.avatar" :src="heroForm.avatar" class="avatar" />
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="称号" prop="title">
                            <el-input v-model="heroForm.title"></el-input>
                        </el-form-item>
                        <el-form-item label="类型">
                            <el-select class="select-width" v-model="heroForm.categories" multiple>
                                <el-option v-for="item of categories"
                                    :key="item._id"
                                    :label="item.name"
                                    :value="item._id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="难度">
                            <el-rate class="hero-rate" :max="10" show-score v-model="heroForm.scores.difficult"></el-rate>
                        </el-form-item>
                        <el-form-item label="技能">
                            <el-rate class="hero-rate" :max="10" show-score v-model="heroForm.scores.skills"></el-rate>
                        </el-form-item>
                        <el-form-item label="攻击">
                            <el-rate class="hero-rate" :max="10" show-score v-model="heroForm.scores.attack"></el-rate>
                        </el-form-item>
                        <el-form-item label="生存">
                            <el-rate class="hero-rate" :max="10" show-score v-model="heroForm.scores.survive"></el-rate>
                        </el-form-item>
                        <el-form-item label="顺风出装">
                            <el-select class="select-width" v-model="heroForm.items1" multiple>
                                <el-option v-for="item of items"
                                    :key="item._id"
                                    :label="item.name"
                                    :value="item._id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="逆风出装">
                            <el-select class="select-width" v-model="heroForm.items2" multiple>
                                <el-option v-for="item of items"
                                    :key="item._id"
                                    :label="item.name"
                                    :value="item._id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="使用技巧">
                            <el-input type="textarea" :autosize="{ minRows: 3 }" v-model="heroForm.usageTips"></el-input>
                        </el-form-item>
                        <el-form-item label="攻击技巧">
                            <el-input type="textarea" :autosize="{ minRows: 3 }" v-model="heroForm.battleTips"></el-input>
                        </el-form-item>
                        <el-form-item label="团战思路">
                            <el-input type="textarea" :autosize="{ minRows: 3 }" v-model="heroForm.teamTips"></el-input>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="技能信息" name="skills">
                        <el-button type="primary" size="small" icon="el-icon-plus" @click="handleAddSkills">添加技能</el-button>
                        <el-row type="flex" class="mt-2" style="flex-wrap: wrap">
                            <el-col :span="12" v-for="(item, index) in heroForm.skills"
                                :key="index"
                                class="b-dashed mb-1">
                                <el-form-item label="名称">
                                    <el-input v-model="item.name"></el-input>
                                </el-form-item>
                                <el-form-item label="图标">
                                    <el-upload
                                        class="avatar-uploader"
                                        :action="uploadUrl"
                                        :show-file-list="false"
                                        :headers="getAuthorization()"
                                        :on-success="res => ($set(item, 'icon', res.url))"
                                        :before-upload="beforeAvatarUpload"
                                    >
                                        <img v-if="item.icon" :src="item.icon" class="avatar" />
                                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                    </el-upload>
                                </el-form-item>
                                <el-form-item label="描述">
                                    <el-input type="textarea" :autosize="{ minRows: 3 }" v-model="item.description"></el-input>
                                </el-form-item>
                                <el-form-item label="小提示">
                                    <el-input type="textarea" :autosize="{ minRows: 3 }" v-model="item.tips"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="danger" size="small" @click="handleDeleteSkill(index)">删除</el-button>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-tab-pane>
                </el-tabs>
                <el-form-item class="mt-2">
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
            categories: [],
            items: [],
            activeName: 'basic',
            heroForm: {
                name: '',
                title: '',
                categories: [],
                scores: {
                    difficult: 0,
                    skills: 0,
                    attack: 0,
                    survive: 0
                },
                skills: [],
                items1: [],
                items2: [],
                usageTips: '',
                battleTips: '',
                teamTips: '',
                avatar: ''
            }
        };
    },
    created() {
        this.id && this.handleGetDetails();
        this.handleGetCategory()
        this.handleGetItems()
    },
    methods: {
        async handleGetDetails() {
            try {
                const details = await this.$http.get(`/rest/heroes/${this.id}`);
                this.heroForm = Object.assign({}, this.heroForm, details);
            } catch (error) {
                const {message} = error.data
                this.$message.error(message || error.statusText || '英雄详情获取失败')
            }
        },
        async handleGetCategory() {
            try {
                const category = await this.$http.get('/rest/categories')
                this.categories = category
            } catch (error) {
                const {message} = error.data
                this.$message.error(message || error.statusText || '英雄分类获取失败')
            }
        },
        async handleGetItems() {
            try {
                const result = await this.$http.get('/rest/items')
                this.items = result
            } catch (error) {
                const {message} = error.data
                this.$message.error(message || error.statusText || '物品获取失败')
            }
        },
        handleAddSkills() {
            this.heroForm.skills.push({})
        },
        handleDeleteSkill(index) {
            this.heroForm.skills.splice(index, 1)
        },
        // 表单提交
        async handleSubmit() {
            try {
                if (this.id) {
                    await this.$http.put("/rest/heroes", this.heroForm);
                } else {
                    await this.$http.post("/rest/heroes", this.heroForm);
                }
                this.$message.success("保存成功");
                this.$router.push("/heroes/list");
            } catch (error) {
                const {message} = error.data
                this.$message.error(message || error.statusText || '保存失败')
            }
        },
        handleAvatarSuccess(res) {
            this.heroForm.avatar = res.url
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
        handleBack() {
            this.$router.go(-1);
        }
    }
};
</script>
<style lang="scss" scoped>
.btn-back {
    float: right;
    padding: 3px 0;
}
.select-width {
    width: 100%;
}
.hero-rate {
    margin-top: 0.6rem;
}
</style>
