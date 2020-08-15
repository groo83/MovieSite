const express = require('express');
const router = express.Router();
const {Favorite} = require('../models/Favorite');

router.post("/favoriteNumber", (req, res) => {
      
    // db에서 favorite 숫자를 가져옴
    Favorite.find({"movieId": req.body.movieId}) // index.js의 bodyparser로 req.body 사용가능
        .exec((err, info)=>{
            if(err) return res.status(400).send(err)
             // 프론트에 다시 숫자 정보 보내줌
            res.status(200).json({success:true, favoriteNumber: info.length})
        })
    

   
});



router.post("/favorited", (req, res) => {
      
    // Favorite 리스트에 넣었는지 DB에서 정보 가져오기
    Favorite.find({"movieId": req.body.movieId, "userFrom":req.body.userFrom})
    .exec((err, info)=>{
        if(err) return res.status(400).send(err)
        let result = false;
        if(info.length !== 0) result = true

        res.status(200).json({success:true, favorited:result})
    })

    
});

router.post("/addToFavorite", (req, res) => {
    // document instance 생성
    const favorite = new Favorite(req.body)
    favorite.save((err, doc)=>{
        if(err) return res.status(400).send(err)
        return res.status(200).json({success:true})
    })

    
});
router.post("/removeFromFavorite", (req, res) => {
      
    Favorite.findOneAndRemove({movieId : req.body.movieId,userFrom:req.body.userFrom})
        .exec((err,doc)=>{
            if(err) return res.status(400).send(err)
            res.status(200).json({success:true,doc})
        })

    
});

router.post("/getFavoritedMovie", (req, res) => {
    Favorite.find({'userFrom': req.body.userFrom})
        .exec((err, favorites)=>{
            if(err) return res.status(400).send(err)
            res.status(200).json({success:true,favorites})
        })
    
});

router.post("/removeFromFavorite", (req, res) => {
    Favorite.findOneAndDelete({movieId:req.body.movieId, userFrom:req.body.userFrom})
    .exec((err, result)=>{
        if(err) return res.status(400).send(err)
        res.status(200).json({success:true,result})
    })

    
});
module.exports = router;
