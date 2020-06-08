const express=require('express')
const passport=require('passport')
const router=express.Router()

router.get('/',(req,res)=>{
    res.render('welcome')
})
router.get('/dashboard',passport.authenticate('jwt',{session:false}),(req,res,next)=>{
    res.render('dashboard',{
        name:req.user.name,
       
    })
    //checkinh with postman
    
    // res.json({
    //     user:req.user,
    //     token:req.query.secret_token
    // })
    next()
})
module.exports=router