const Cookbook = require('../models/cookbookModels');

exports.findAllRecipes = async (req, res) => {
  try {
    const user_id = req.user._id
    const recipes = await Cookbook.find({ user_id });
    res.json(recipes);
  } catch (error) {
    console.log('Error fetching recipes:', error);
    res.status(500).json({ error: 'An error occurred while fetching recipes' });
  }
};

exports.createRecipe = async (req, res) => {
  try {
    const user_id = req.user._id;
    const recipeData = {
      ...req.body,
      user_id: user_id
    };

    const recipe = await Cookbook.create(recipeData);
    res.json(recipe);
  } catch (error) {
    console.log('Error creating recipe:', error);
    res.status(500).json({ error: 'An error occurred while creating the recipe' });
  }
};


exports.findOneRecipe = async (req, res) => {
  const { id } = req.params;
  try {
    const recipe = await Cookbook.findById(id);
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    res.json(recipe);
  } catch (error) {
    console.log('Error finding recipe:', error);
    res.status(500).json({ error: 'An error occurred while finding the recipe' });
  }
};

exports.updateRecipe = async (req, res) => {
  const { id } = req.params;
  const { recipeName, recipeIngredients, recipeInstructions } = req.body;

  try {
    const recipe = await Cookbook.findById(id);
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    // Update recipe fields
    recipe.recipeName = recipeName;
    recipe.recipeIngredients = recipeIngredients;
    recipe.recipeInstructions = recipeInstructions;

    const updatedRecipe = await recipe.save();
    res.json(updatedRecipe);
  } catch (error) {
    console.log('Error updating recipe:', error);
    res.status(500).json({ error: 'An error occurred while updating the recipe' });
  }
};

exports.deleteRecipe = async (req, res) => {
  const { id } = req.params;
  try {
    const recipe = await Cookbook.findByIdAndRemove(id);
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    res.json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    console.log('Error deleting recipe:', error);
    res.status(500).json({ error: 'An error occurred while deleting the recipe' });
  }
};

exports.searchRecipes = async (req, res) => {
  const { query } = req.query;
  try {
    const recipes = await Cookbook.find({
      recipeName: { $regex: query, $options: 'i' },
    });
    res.json(recipes);
  } catch (error) {
    console.log('Error searching recipes:', error);
    res.status(500).json({ error: 'An error occurred while searching recipes' });
  }
};
