var express = require('express');
var router = express.Router();

const Travel=require('../models/travel')
const Plan=require('../models/plan')

router.get('/', function(req, res, next) {
  res.render('homepage');
});

router.get('/log-in', function(req, res, next){
  res.render('login');
});

router.get('/logged-in', function(req, res, next){
  res.render('homeAfterLog');
});

router.get('/register', function(req, res, next){
  res.render('register');
});

router.get('/list-of-destinations', async function(req, res,next){
  const destination=await Plan.find();
  res.render('destinations', {destinations:destination});
});

router.get('/individual', async function(req, res, next){
  const destin=req.body.destination_name;
  console.log(destin)
  const destination=await Plan.find({destination_name:destin});
  res.render('searchResult',{destinations:destination, title:destin});
})

router.get('/no-user-list-of-destinations', async function(req, res,next){
  const destination=await Plan.find();
  res.render('noUserDestinations', {destinations:destination});
});

router.get('/no-user-individual', async function(req, res, next){
  const destin=req.body.destination_name;
  console.log(destin)
  const destination=await Plan.find({destination_name:destin});
  res.render('noLogsearchResult',{destinations:destination, title:destin});
})

router.post('/upload', function(req, res, next){
  const travel=new Travel(req.body);
  console.log(travel);

  let promise=travel.save()
  promise.then(()=>{
    console.log('Data has been successfully pushed into the database.');
      res.redirect('/')
  })
});

router.post('/add-plan-to-database', function(req, res, next){
    const plan=new Plan(req.body);
    console.log(plan);
    let promise=plan.save()
    promise.then(()=>{
    console.log("Plan has been pushed successfully.");
    res.redirect('/logged-in')
  })
})

router.post('/check', async(req, res)=>{
  try{
    // console.log("Reached here!!");
    const email=req.body.email;
    const password=req.body.password;
    const useremail=await Travel.findOne({email:email});
    console.log(useremail)
    if(useremail.password===password){
      res.render("homeAfterLog");
    }else{
      res.send("Password are not matching");
    }
    // res.send(useremail.password);
    console.log(useremail.password);
  }
  catch(err){
    res.status(400).send("Invalid email")
  }
});

router.post('/search-result', async(req, res)=>{
 try{
    const dest_name=req.body.search;
    const destination=await Plan.find({destination_name:dest_name});
    console.log(destination)
    // console.log(destination.length())
    if(destination)
    {
      res.render('searchResult',{destinations:destination, title:dest_name});
    }
    else{
      res.render('searchResult2');
    }
  }
  catch(err){
    res.status(400).send("Error")
  }
  
  // res.render('searchResult');
})

router.post('/no-user-search-result', async(req, res)=>{
  try{
    const dest_name=req.body.search;
    const destination=await Plan.find({destination_name:dest_name});
    console.log(destination)
    // console.log(destination.length())
    if(destination)
    {
      res.render('noLogsearchResult',{destinations:destination, title:dest_name});
    }
    else{
      res.render('noLogsearchResult2')
    }
  }
  catch(err){
    res.status(400).send("Error")
  }
  
})

router.post('/filtering-date', async(req, res)=>{
  try{
    const destName=req.body.destination_name;
    const numb_days=req.body.number_of_days;
    const destination=await Plan.find({num_of_days:numb_days, destination_name:destName});
    console.log(destination)
    // console.log(destination.length())
    if(destination)
    {
      res.render('searchResult',{destinations:destination, title:destName});
    }
    else{
      res.render('searchResult2')
    }
  }
  catch(err){
    res.status(400).send("Error");
  }
})

router.post('/no-user-filtering-date', async(req, res)=>{
  try{
    const destName=req.body.destination_name;
    const numb_days=req.body.number_of_days;
    const destination=await Plan.find({num_of_days:numb_days, destination_name:destName});
    console.log(destination)
    // console.log(destination.length())
    if(destination)
    {
      res.render('noLogsearchResult',{destinations:destination, title:destName});
    }
    else{
      res.render('noLogsearchResult2');
    }
  }
  catch(err){
    res.status(400).send("Error")
  }
})

router.get('/add-a-plan', function(req, res, next){
  res.render('addAPlan');
})



module.exports = router;
