// 将类型大小写转换
const inflection = require('inflection')
const multer = require('multer')
const stringRandom = require('string-random')

const LETTER = 'abcdefghijklmnopqrstuvwxyz'

module.exports = (app) => {
    const express = require('express')
    const router = express.Router({
        mergeParams: true
    })
    // 获取CRUD通用接口，单个模型注释
    // const Category = require('../../models/Category')

    router.get('/', async (req, res) => {
        const queryOptions = {}
        if (req.modleName === 'Category') {
            queryOptions.populate = 'parent'
        }
        const result = await req.Model.find().setOptions(queryOptions).limit(10)
        res.send(result)
    })
    router.get('/:id', async (req, res) => {
        const id = req.params.id
        const result = await req.Model.findById(id)
        // const result = await Category.findOne({_id: id})
        res.send(result)
    })
    router.post('/', async (req, res) => {
        const model = await req.Model.create(req.body)
        res.send(model)
    })
    router.put('/', async (req, res) => {
        // const model = await Category.findOneAndUpdate({_id: req.body._id}, {$set: {name: req.body.name, parent: req.body.parent}})
        const model = await req.Model.findByIdAndUpdate(req.body._id, req.body)
        res.send(model)
    })
    router.delete('/:id', async (req, res) => {
        await req.Model.findByIdAndDelete(req.params.id)
        res.send({
            success: true
        })
    })

    app.use('/admin/api/rest/:resource', async (req, res, next) => {
        const modleName = inflection.classify(req.params.resource)
        // 请求对象上挂载一个Model
        req.Model = require(`../../models/${modleName}`)
        req.modleName = modleName
        next()
    }, router)

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
    app.post('/admin/api/upload', upload.single('file'), async (req, res) => {
        const file = req.file
        file.url = `http://localhost:3300/uploads/${file.filename}`
        res.send(file)
    })
}
