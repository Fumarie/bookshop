const Router = require('express')
const router = new Router()
const bookController = require('../controllers/BookController')

router.get('/', bookController.getAllBooks)
router.get('/genre', bookController.getGenres)
router.get('/author', bookController.getAuthors)
router.post('/create', bookController.createBook)
router.delete('/delete/:id', bookController.deleteBook)
router.put('/update/:id', bookController.updateBook)
router.get('/average/genre', bookController.getAveragePrice)

module.exports = router