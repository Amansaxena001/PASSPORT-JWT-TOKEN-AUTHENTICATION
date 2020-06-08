
//dependencies
const express=require('express')
const mongoose=require('mongoose')
const app=express();
var bodyParser = require('body-parser')
const flash=require('connect-flash')
const session=require('express-session')
const passport=require('passport')




//connect to mongo
const db=require('./config/keys').MongoURI
mongoose.connect(db,{useNewUrlParser:true})
.then(()=>console.log('MongoDB ONLINE'))
.catch(err=>console.log(err))

const expressLayouts=require('express-ejs-layouts')




//initialize EJS
app.use(expressLayouts);
app.set('view engine','ejs')

//middleware for FLASH
app.use(session({
    secret:'unsecret',
    resave:true,
    saveUninitialized:true
}))

//passport middle ware
 app.use(passport.initialize())
 app.use(passport.session())


//middleware for flash
app.use(flash())

//GLOBAL TYPES FOR VARS
app.use((req,res,next)=>{
   res.locals.success_msg=req.flash('success_msg')
   res.locals.error_msg=req.flash('error_msg')
   res.locals.error=req.flash('error')

   next()

})



//Body-parser
app.use(bodyParser.urlencoded({extended:false}))





//Dashboard routes
app.use('/',require('./routes/index'))
app.use('/users',require('./routes/users'))












const PORT=process.env.PORT || 5000

app.listen(PORT,console.log(`Server CONNECTED ON PORT ${PORT}`))