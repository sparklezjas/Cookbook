const mongoose = require('mongoose')
const CookbookSchema = new mongoose.Schema({
    recipeName: { type: String,
    required: [true, 'Recipe name is required'],
    minLength: [2, 'Recipe name must be unique and contain at least 2 characters'],
    maxLength: [100, 'Recipe name is too long'],
    trim: true,
    },
    recipeIngredients: { type: String,
        required: [true, 'Ingredients list is required'],
        minLength: [3, 'Ingredients list must have 3 or more characters'],
        maxLength: [500, `Ingredients list can't have more than 500 characters`],
        trim: true,
    },
    recipeInstructions: { type: String,
        required: [true, 'Recipe instructions are required'],
        minLength: [3, 'Recipe instructions must have 3 or more characters'],
        maxLength: [500, `Recipe instructions can't have more than 500 characters`],
        trim: true,
    },
    user_id:{
        type: String,
        required: true
    }
}, { timestamps: true, validateBeforeSave: true })
module.exports = mongoose.model('Cookbook', CookbookSchema)