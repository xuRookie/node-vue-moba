const express = require('express')

const app = express()

app.set('secret', 'private.key')
app.use('/uploads', express.static(__dirname + '/uploads'))

// app.all('*', function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', req.headers.origin);
//     res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With');
//     res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
//     res.header('Access-Control-Allow-Credentials', 'true');
//     res.header('X-Powered-By', ' 3.2.1');
//     res.header('Content-Type', 'application/json;charset=utf-8');
//     if(req.method == 'OPTIONS') return res.send(200);
//     next();
// });
// 跨域
app.use(require('cors')({
    origin: ['http://localhost:8300', 'http://192.168.101.105:8330'],
    allowedHeaders: ['Content-Type','Content-Length','Authorization','Accept','X-Requested-With'],
    methods: ['PUT','POST','GET','DELETE','OPTIONS'],
    credentials: true
}))
app.use(express.json())


require('./plugins/db')(app)
require('./routes/admin')(app)
require('./routes/web')(app)

// 错误处理
app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
        message: err.message
    })
})

app.listen(3300, () => {
    console.log('服务器已启动，端口：3300...')
})
