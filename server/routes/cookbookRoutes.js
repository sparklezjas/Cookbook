const CookbookController = require('../controllers/cookbookController')
const Cookbook = require('../models/cookbookModels')
const requireAuth = require('../middleware/requireAuth')

module.exports = (app) => {
    app.get('/api/all/recipes', requireAuth, CookbookController.findAllRecipes)
    app.post('/api/new/recipe', requireAuth, CookbookController.createRecipe)
    app.get('/api/one/recipe/:id', requireAuth, CookbookController.findOneRecipe)
    app.patch('/api/update/recipe/:id', requireAuth, CookbookController.updateRecipe)
    app.delete('/api/delete/recipe/:id', requireAuth, CookbookController.deleteRecipe)
    app.get('/api/recipes/search', requireAuth, CookbookController.searchRecipes)
}