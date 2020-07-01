module.exports = (app) => {
    const express = require('express')
    const router = express.Router()
    const Category = require('../../models/Category')

    router.get('/categories', async (req, res) => {
        const result = await Category.find().populate('parent').limit(10)
        res.send(result)
    })
    router.get('/categories/:id', async (req, res) => {
        const id = req.params.id
        const result = await Category.findOne({_id: id})
        res.send(result)
    })
    router.post('/categories', async (req, res) => {
        const model = await Category.create(req.body)
        res.send(model)
    })
    router.put('/categories', async (req, res) => {
        const model = await Category.findOneAndUpdate({_id: req.body._id}, {$set: {name: req.body.name, parent: req.body.parent}})
        // const model = await Category.findByIdAndUpdate(req.body._id, req.body)
        res.send(model)
    })
    router.delete('/categories/:id', async (req, res) => {
        await Category.findByIdAndDelete(req.params.id)
        res.send({
            success: true
        })
    })

    app.use('/admin/api', router)
}
