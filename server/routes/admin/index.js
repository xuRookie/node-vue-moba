const multer = require('multer')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const assert = require('http-assert')
const stringRandom = require('string-random')
const AdminUser = require('../../models/AdminUser')
// 登录校验中间件
const authMiddleware = require('../../middleware/auth')
// 资源中间件
const resourceMiddleware = require('../../middleware/resource')

const LETTER = 'abcdefghijklmnopqrstuvwxyz'

module.exports = (app) => {
    const express = require('express')
    const router = express.Router({
        mergeParams: true
    })
    // 获取CRUD通用接口，单个模型注释
    // const Category = require('../../models/Category')

    // 资源列表
    router.get('/', async (req, res) => {
        const queryOptions = {}
        if (req.modleName === 'Category') {
            queryOptions.populate = 'parent'
        }
        const result = await req.Model.find().setOptions(queryOptions).limit(10)
        res.send(result)
    })
    // 资源详情
    router.get('/:id', async (req, res) => {
        const id = req.params.id
        const result = await req.Model.findById(id)
        // const result = await Category.findOne({_id: id})
        res.send(result)
    })
    // 创建资源
    router.post('/', async (req, res) => {
        const model = await req.Model.create(req.body)
        res.send(model)
    })
    // 修改资源
    router.put('/', async (req, res) => {
        // const model = await Category.findOneAndUpdate({_id: req.body._id}, {$set: {name: req.body.name, parent: req.body.parent}})
        const model = await req.Model.findByIdAndUpdate(req.body._id, req.body)
        res.send(model)
    })
    // 删除资源
    router.delete('/:id', async (req, res) => {
        await req.Model.findByIdAndDelete(req.params.id)
        res.send({
            success: true
        })
    })

    app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(), router)

    const storage = multer.diskStorage({
        //设置上传后文件路径
        destination: function (req, file, cb) {
            cb(null, __dirname + '/../../uploads')
        },
        //给上传文件重命名，获取添加后缀名
        filename: function (req, file, cb) {
            const fileFormat = (file.originalname).split(".");
            const random = stringRandom(32, {letters: LETTER})
            cb(null, random + "." + fileFormat[fileFormat.length - 1]);
        }
    });
    const upload = multer({storage: storage})
    // upload.single(file) 上传单个文件，文件名是 file
    app.post('/admin/api/upload', authMiddleware(), upload.single('file'), async (req, res) => {
        try {
            const file = req.file
            file.url = `http://localhost:3300/uploads/${file.filename}`
            res.send(file)
        } catch (error) {
            next(error)
        }
    })

    app.post('/admin/api/login', async (req, res, next) => {
        try {
            const { username, password} = req.body
            // 查找用户
            const user = await AdminUser.findOne({ username }).select('+password')
            assert(user, 422, '用户不存在')
            // 校验密码
            const isValid = bcrypt.compareSync(password, user.password)
            assert(isValid, 422, '密码不正确')
            // 返回token
            const token = jwt.sign({ id: user._id }, app.get('secret'))
            res.send({
                token,
                username: user.username
            })
        } catch (error) {
            next(error)
        }
    })
}
