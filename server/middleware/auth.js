const jwt = require('jsonwebtoken')
const assert = require('http-assert')
const AdminUser = require('../models/AdminUser')
module.exports = (options) => {
    return async (req, res, next) => {
        try {
            const token = String(req.headers.authorization || '').split(' ').pop()
            assert(token, 401, '无效token，请先登录')
            const { id } = jwt.verify(token, req.app.get('secret'))
            const user = await AdminUser.findById(id)
            assert(token, 401, '无效token，请先登录')
            req.user = user
            assert(user, 401, '请先登录')
            await next()
        } catch (error) {
            next(error)
        }
    }
}
