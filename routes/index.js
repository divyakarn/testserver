var express = require('express');
var router = express.Router();
var Article = require('./users')

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.send("data found");

});

router.route('/articles').get(function(req,res){
  Article.find(function(err, foundArticle){
    res.send(foundArticle)
  })
  
})

router.post(function(req,res){
  const newArticle = new Article({
    title: req.body.title,
    content:req.body.content
  })
  console.log(req.body.title),
  console.log(req.body.content)
  newArticle.save()
})

// router.post('/postArticles',function(req,res){
//   Article.create({
//     title: req.body.title,
//     content:req.body.content
//   })
//   console.log(req.body.title),
//   console.log(req.body.content)
//   newArticle.save()
// })

.delete(function(req,res){
  Article.deleteMany(function(err){
    if(!err){
      res.send('Deleted Successfully!')
    }
    else{
      res.send(err)
    }
  })
});

router.route('/articles/:articleTitle')

.get(function(req,res){
  Article.findOne({title: req.params.articleTitle}, function(err,foundtitle){
    if(foundtitle){
      res.send(foundtitle)
    }
    else{
      res.send('Not Found')
    }
  })
})

.put(function(req,res){
  Article.update(
    {title:req.params.articleTitle},
    {title: req.body.title, content:req.body.content},
    {overwrite: true},
    function(err){
      if(!err){
        res.send('Updated Successfully!')
      }
      else{
        res.send(err)
      }
    }
  )
})
.patch(function(req,res){
  Article.update(
    {title:req.params.articleTitle},
    {$set: req.body},
    function(err){
      if(!err){
        res.send('Updated Successfully!patch')

      }
      else{
        res.send(err)
      }
    }
  )
})










// router.get('/articles', function(req,res){
//   Article.find(function(err, foundArticle){
//     res.send(foundArticle)
//   })
  
// })
// router.post('/create', function(req,res){
//   console.log(req.body.title),
//   console.log(req.body.content)
//   const newArticle = new Article({
//     title: req.body.title,
//     content:req.body.content
//   })
//   newArticle.save()
// })
// router.delete('/articles', function(req,res){
//   Article.deleteMany(function(err){
//     if(!err){
//       res.send('Deleted Successfully!')
//     }
//     else{
//       res.send(err)
//     }
//   })
// })
module.exports = router;
