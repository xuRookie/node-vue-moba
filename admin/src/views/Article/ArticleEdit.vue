<template>
    <div class="article-create">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>{{id ? '编辑' : '新增'}}文章</span>
                <el-button class="btn-back" v-if="id" type="text" @click="handleBack">返回</el-button>
            </div>
            <el-form :model="articleForm" ref="articleForm" label-width="120px" @submit.native.prevent="handleSubmit">
                <el-form-item label="所属分类">
                    <el-select class="select-width" v-model="articleForm.categories" multiple>
                        <el-option
                            v-for="item in categories"
                            :key="item._id"
                            :label="item.name"
                            :value="item._id"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="标题">
                    <el-input v-model="articleForm.title"></el-input>
                </el-form-item>
                <el-form-item label="详情">
                    <vue-editor
                        v-model="articleForm.body"
                        useCustomImageHandler
                        @image-added="handleImageAdded"></vue-editor>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" native-type="submit">保存</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<script>
import { VueEditor } from 'vue2-editor'
export default {
    props: {
        id: {
            type: String
        }
    },
    components: {
        VueEditor
    },
    data() {
        return {
            articleForm: {
                title: '',
                categories: [],
                body: ''
            },
            categories: []
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
                this.categories = list
            } catch (error) {
                this.$message.error(error.statusText || '分类获取失败')
            }
        },
        async handleGetDetails() {
            try {
                const details = await this.$http.get(`/rest/articles/${this.id}`)
                this.articleForm = Object.assign({}, this.articleForm, details)
            } catch (error) {
                this.$message.error(error.statusText || '文章详情获取失败')
            }
        },
        async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
            try {
                const formData = new FormData();
                formData.append("file", file);

                const res = await this.$http.post('upload', formData)
                Editor.insertEmbed(cursorLocation, "image", res.url);
                resetUploader();
            } catch (error) {
                this.$message.error(error.statusText || '图片上传失败')
            }
        },
        // 表单提交
        async handleSubmit() {
            try {
                if (this.id) {
                    await this.$http.put('/rest/articles', this.articleForm)
                } else {
                    await this.$http.post('/rest/articles', this.articleForm)
                }
                this.$message.success('保存成功')
                this.$router.push('/articles/list')
            } catch (error) {
                this.$message.error(error.statusText || '文章保存失败')
            }
        },
        handleReset() {
            for (let key in this.articleForm) {
                this.articleForm[key] = ''
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
.select-width {
    width: 100%;
}
</style>
