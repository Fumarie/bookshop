const Router = require('express')
const router = new Router()
const magazineController = require('../controllers/magazineController')

router.get('/', magazineController.getAllMagazines)
router.get('/themes', magazineController.getThemes)
router.get('/publisher', magazineController.getPublishers)
router.post('/create', magazineController.createMagazine)
router.delete('/delete/:id', magazineController.deleteMagazine)
router.put('/update/:id', magazineController.updateMagazine)

module.exports = router