var express = require('express');
var router = express.Router();
var Article = require("../models/articleModel");

/////////////////////////////////////////////////////multer/////////////////////////////////////////////////////////
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/uploads')
    },
    filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
        }
});
var upload = multer({ storage: storage }).single('file');
/////////////////////////////////////////////////////multer/////////////////////////////////////////////////////////
//TODO: use the quill-delta npm to transform the RTF's back
router.get('/', function (req, res, next) {
  Article.find(function(error, result){
    if (error) {
      console.log(error);
    } else {
      res.send(result);
    }//else
  })//find()
});//get all articles that were ever published

router.get('/search/:publisher', function(req, res, next){
  Article.find({publisher: req.params.publisher}, function(err, resultArticle){
    if (err) {
      console.log(err);
    } else {
      res.send(resultEvents);
    }//else
  })//findCb
}) // get event by publisher
//
// router.get('/search/:tag', function(req, res, next){
//   Article.find({type: req.params.type}, function(err, resultArticles){
//     if (err) {
//       console.log(err);
//     } else {
//       res.send(resultEvents);
//     }//else
//   })//findCb
// }) //NOTE: get article by specific tag. for future use. it is currently unclear to me how the search is going to operate
//
router.post('/upload', function (req, res1, next) {
  upload(req,res1,function(err){
             if(err){
                  res1.json({error_code:1,err_desc:err});
                  return;
             }
             console.log("request to work with is", req.body);
             console.log("file name:", req.file.filename);
              var a = new Article(req.body.article);
              e.image = req.file.filename;
              e.save(function(error, result){
                if (error) {
                  console.log("reached error route");
                  console.log(error);
                } else {
                  console.log("reached result route");
                  // res.send(result);
                  res1.send({error_code:0,err_desc:null, file_name: req.file.filename});
                }//else
              });
         })
     });// path for regular uploads

router.post('/', function (req, res1, next) {
 var e = new Article(req.body.event);
 //e.image = req.file.filename; //TODO: save some default image
 e.save(function(error, result){
 if (error) {
 console.log("reached error route");
 console.log(error);
  } else {
    console.log("reached result route");
    // res.send(result);
    res1.send(result);
    }//else
  });
})//regular uploads (for articles without a pic)
//
router.delete("/:id",function(req,res){
  //TODO: delete associated image
  Article.findOneAndRemove({ _id: req.params.id }, function(err, Article) {
    if (err) {
      console.log(err);
      res.send(err);
    }  else {
      console.log("removed article");
      res.send(event);
    }
});
});//delete an article

// router.post('/deleteAndUpload', function(req, res1, next) {
//   //TODO: check if the image has changed. if it did, delete and replace it with the new one
//   upload(req,res1,function(err){
//            if(err){
//                 res.json({error_code:1,err_desc:err});
//                 return;
//            }
//            console.log("request to work with is", req.body);
//            if (req.body.event.imgPath!="/img/uploads/undefined") {
//            var fs = require('fs');
//            var addressToDelete = 'public/img/uploads/'+req.body.event.image
//          }//if there's no image, there is nothing to delete. TODO: change to default picture
//            console.log("file name:", req.file.filename);
//            req.body.event.image = req.file.filename;
//            Event.findByIdAndUpdate(req.body.event._id, req.body.event, { new: true }, function(error, event) {
//              if (error) {
//                console.error(error)
//                return next(error);
//              } else {
//                if (addressToDelete) {
//                  fs.unlink(addressToDelete,function(response){
//                    res1.send({error_code:0,err_desc:null, file_name: req.file.filename});
//                  }); //TODO: need the path for the file
//                } else {
//                res1.send({error_code:0,err_desc:null, file_name: req.file.filename});
//              }//else file wasnt deleted
//             }//else mongo
//            });
//          }); // path for updates
//        })// put request for also updating image
//
// router.put('/:id', function(req, res1, next) {
//   console.log("request body is", req.body);
//   Event.findByIdAndUpdate(req.body._id, req.body, { new: true }, function(error, event) {
//     if (error) {
//      console.error(error)
//      return next(error);
//     } else {
//      res1.send(event);
//    }//else
//   });//mongo CB
// })// put route - without updating pictures
module.exports = router;
