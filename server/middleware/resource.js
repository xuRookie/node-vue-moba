// 将类型大小写转换
const inflection = require('inflection')
module.exports = () => async (req, res, next) => {
    try {
        const modleName = inflection.classify(req.params.resource)
        // 请求对象上挂载一个Model
        req.Model = require(`../models/${modleName}`)
        req.modleName = modleName
        next()
    } catch (error) {
        next(error)
    }
}
