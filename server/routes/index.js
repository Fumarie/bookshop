const Router = require('express')
const router = new Router()

const magazineRouter = require('./magazine.routes')
const bookRouter = require('./book.routes')

router.use('/magazine', magazineRouter)
router.use('/book', bookRouter)

module.exports = router