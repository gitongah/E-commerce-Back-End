const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async(req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try{
    const tagData = await Tag.findAll({
      include:[{
        model: Product, 
        attributes:["id", "product_name", "price", "stock", "category_id"],

        through:ProductTag
      }]
    });
    if(!tagData){
      res.status(404).json({ message: 'no such tag with this id!'});
      return;
    }
    res.status(200).json(tagData);
  }catch(error){
    res.status(500).json(error);
  }
});

router.get('/:id', async(req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try{
    const productData = await Tag.findByPk(req.params.id,{
      include:[{
        model: Product, 
        attributes:["id", "product_name", "price", "stock", "category_id"],

        through:ProductTag
      }]
    });
    if(!productData){
      res.status(404).json({ message: 'no such tag with this id!'});
      return;
    }
    res.status(200).json(productData);
  }catch(error){
    res.status(500).json(error);
  }
});

router.post('/', async(req, res) => {
  // create a new tag
  try{
    const newTag = await Tag.create({
      tag_name: req.body.tag_name,
    })
    res.status(200).json(newTag);
  } catch (err) {
    res.status(400).json(err);
  
  }
});

router.put('/:id', async(req, res) => {
  // update a tag's name by its `id` value
  try{
    const updatedTag = await Tag.update(
      {
      tag_name:req.body.tag_name,
      },
      {
      where:{
        id: req.params.id
      }
  });
    if(!updatedTag){
      res.status(404).json({message:'No category with that id found'});
      return;
    }
    res.status(200).json(updatedTag);
    
  }catch(error){
    res.status(500).json(error);
  }
});

router.delete('/:id', async(req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
