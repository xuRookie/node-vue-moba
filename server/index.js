const express = require('express')

const app = express()

// 跨域
app.use(require('cors')())
app.use(express.json())

require('./plugins/db')(app)
require('./routes/admin')(app)


app.listen(3300, () => {
    console.log('服务器已启动，端口：3300...')
})
