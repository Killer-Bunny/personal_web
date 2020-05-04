const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const config = require('./config/config.js').get(/*process.evn.NODE_ENV*/null);
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})

//MODELS
const { auth } = require('./middleware/auth');
const { Contact } = require('./models/contact');
const { PlaceHolder } = require('./models/textPlaceHolders');
const { User } = require('./models/user');


app.use(bodyParser.json());
app.use(cookieParser('MY SECRET'));

app.use(express.static('client/build'))


//DISPLAY
app.get('/api/display', (req,res) => {
  PlaceHolder.findOne({'pageName': req.query.page}, (err,data) => {
    if(err) return res.status(404).send(err);

    res.json({
      success: true,
      data: data
      })
    }
  )
})




//ADMIN

app.get('/api/auth',auth,(req,res)=>{
  res.json({
    isAuth: true,
    id: req.user._id,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname
  })
})

// app.delete('/api/logout',auth,(req,res)=>{
//   console.log(req.token)
//   req.user.clearCookie(req.token,(err,user)=>{
//     if(err) return res.status(404).send(err);
//     res.sendStatus(200);
//   });
// })

app.post('/api/contact',(req,res)=>{

  const contact = new Contact(req.body);

  contact.save((err,doc)=>{
    if(err) return res.status(404).send(err);
    res.status(200).json({
      success: true,
      user: doc
    })
  })
})

app.get('/api/getcontact',(req,res)=>{

  Contact.find({}, (err,details)=>{
    if(err) return res.status(404).send(err);
      console.log(details)
      res.status(200).json({
        success: true,
        details: details
    })
  })
})


app.post('/api/register',(req,res)=>{

  const user = new User(req.body);

  user.save((err,doc)=>{
    if(err) return res.status(404).send(err);
    res.status(200).json({
      success: true,
      user: doc
    })
  })
})

app.post('/api/login',(req,res)=>{
  User.findOne({'email':req.body.email},(err,user)=>{
    if(!user) return res.json({isAuth:false,message:'Auth failed, email not found.'});

    user.comparePassword(req.body.password,(err,isMatch)=>{
      if(!isMatch) return res.json({
        isAuth: false,
        message: 'Wrong password'
      });

      user.generateToken((err,user)=>{
        if(err) return res.status(404).send(err);

        // let options = {
        //   signed:true,
        //   maxAge: 1000 * 60 * 200, //15 minutes
        //   httpOnly: true,
        //   signed: true
        // }

        res.cookie('auth',user.token).json({
          isAuth: true,
          id: user._id,
          email: user.email
        })
      })

    })
  })
})

app.post('/api/addpage', (req,res) => {
  const placeHolder = new PlaceHolder(req.body);

  placeHolder.save((err,doc)=>{
    if(err) return res.status(404).send(err);
    res.status(200).json({
      success: true,
      placeHolder: doc
    })
  })
})

if(process.env.NODE_ENV == 'production') {
  const path = require('path');
  app.get('/*', (req,res) => {
    res.sendfile(path.resolve(__dirname, '../client', 'build', 'index.html'))
  })
}

const port = process.env.PORT || 8000;
app.listen(port,()=>{
  console.log('mothafucka im running');
})
