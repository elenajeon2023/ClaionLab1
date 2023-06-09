var express = require('express');
var router = express.Router();
var repository = require('../repository/InventoryRepository');

var name = "inventory";

router.post('/', function(req, res, next) {
  
  repository.save(req.body).then(result => {
    res.json(hateoas.hal_post(result.dataValues, req, name));
  })
  

});

router.get('/', function(req,res,next){
  repository.read().then(result => {
    res.json(hateoas.hal_get_list(result, req, name));
  });
});

router.get('/:id', function(req,res,next){
  repository.read_by_id(req.params.id).then(result=>{
    res.json(hateoas.hal_get_id(result, req, name));
  });
});

router.put('/:id', function(req,res,next){
  repository.update(req.params.id, req.body).then(result=>{
    res.json(hateoas.hal_get_id(result, req, name));
  });
})

router.delete('/:id', function(req,res,next){
  repository.delete(req.params.id).then(result=> {
    res.json(result)
  });
})


module.exports = router;

