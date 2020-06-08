const express=require('express')
const router=express.Router()
const User=require('../models/User')
const bcrpyt=require('bcryptjs')
const passport=require('passport')
const jwt=require('jsonwebtoken')

require('../config/passportauth')

router.get('/login',(req,res)=>{
    res.render('login')
})


//register users
router.post('/register',(req,res)=>{

    const { name, email, password, password2 } = req.body;
    let errors = [];
  
    if (!name || !email || !password || !password2) {
      errors.push({ msg: 'Please enter all fields' });
    }
  
    if (password != password2) {
      errors.push({ msg: 'Passwords do not match' });
    }
  
    if (  password.length < 6) {
      errors.push({ msg: 'Password must be at least 6 characters' });
    }
    if(errors.length>0){
        res.render('register',{
            errors,
            name,
            email,
            password,
            password2
        })

    }else{
        //save user to DB
        User.findOne({ email:email })
        .then(user=>{
            if(user){
                errors.push({msg:'Email is already Registered'})
                //user already exists
                res.render('register',{

                    errors,
                    name,
                    email,
                    password,
                    password2
                })
                
              
            }
            else{
                //save user to DB
                const newUser=new User({
                    name,
                    email,
                    password
                })
                //HASH THE PASSWORD
                try{
                    bcrpyt.genSalt(10,(err,salt)=>bcrpyt.hash(newUser.password,salt,(err,hash)=>{
                        if(err) throw err;
                        newUser.password=hash;
                        const saveUser=newUser.save()
                        .then(user=>{
                            req.flash('success_msg','You are now successfully registered,login to continue ')
                            setTimeout(()=>{
                          

                                res.redirect('/users/login')

                            },3000)
                        })
                        .catch(err=>console.log(err))

                    }))
                   

                }catch{
                  error.push({msg:'Error saving user to database'})
                }
           
            }
        })
       
    }

   
})



//login
router.post('/login', async (req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {   
          try {
        if(err || !user){
            req.flash('error_msg','wrong username or password')
          res.redirect('/users/login');
        }
        else{
        req.login(user, { session : false }, async (error) => {
          if( error ) return next(error)
          //We don't want to store the sensitive information such as the
          //user password in the token so we pick only the email and id
          const body = { _id : user._id, email : user.email , name:user.name };
          //Sign the JWT token and populate the payload with the user email and id
          const token = jwt.sign({ user : body },'top_secret');
          //Send back the token to the user
          res.redirect('/dashboard?secret_token='+token)
    

        });  
        

       } 

    }
        catch (error) {
        return next(error);
      }
    })(req, res, next);
  });
  
  // Logout
  router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
  });
router.get('/register',(req,res)=>{
    res.render('register')
})
module.exports=router