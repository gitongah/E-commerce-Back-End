const router = require('express').Router();
const { where } = require('sequelize');
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
//GET all categories
router.get('/', async(req, res) => {
  try{
    const categoriesData = await Category.findAll();
    res.status(200).json(categoriesData);
  }catch(error){
    res.status(500).json(error);
  }
  // find all categories
  // be sure to include its associated Products
});
//Get one category by id
router.get('/:id', async(req, res) => {
  try{
    const categoriesData = await Category.findByPk(req.params.id, {
      include:[{model:Product}]
    });
    if(!categoriesData){
      res.status(404).json({message: 'No category found with this id!!'});
      return;
    }
    res.status(200).json(categoriesData)
  }
  catch(error){
    res.status(500).json(error)
  }

  // be sure to include its associated Products
});
//creating new category
router.post('/', async(req, res) => {
    try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});


router.put('/:id', async(req, res) => {
  // update a category by its `id` value
  try{
    const updatedCategory = await Category.update({
      where:{
        category_name: req.params.category_name
      }
    });
    if(!updatedCategory){
      res.status(404).json({message:'No category with that id found'});
      return;
    }
    res.status(200).json(updatedCategory);
    
  }catch(error){
    res.status(500).json(error);
  }
});

//Delete a category by id
router.delete('/:id', async(req, res) => {
    try {
    const categoriesData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!categoriesData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
