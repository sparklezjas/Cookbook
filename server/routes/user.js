const express = require('express')

const {signupUser, loginUser} = require ('../controllers/userController')

const {findAllRecipes} = require ('../controllers/cookbookController')

const router = express.Router()

router.post('/login', loginUser)
router.get('/all/recipes', findAllRecipes)

router.post('/signup', signupUser)

module.exports = router