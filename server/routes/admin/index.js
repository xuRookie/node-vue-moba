// 将类型大小写转换
const inflection = require('inflection')

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
}
