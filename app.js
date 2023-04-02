const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
/*app.get('/',function(req,res){
    res.send("hello");
});*/
//set template engine
app.set('view engine','ejs');
//body parser to get input from input field
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
//static files
app.use(express.static('public'));

//for method ovverride
app.use(methodOverride('_method'));

//database url
const url = "mongodb+srv://sugi:12345@studentcluster.aybfi9k.mongodb.net/StudentCluster?retryWrites=true&w=majority";

mongoose.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(console.log("db connected"))
.catch(err => console.log(err));

//importing model
const stud = require('./models/student'); //with this we can interact with db


app.get('/',(req,res)=>{
    //fetching data
    stud.find().then(data=>{
        res.render('home',{value:"Home page",data:data});
        console.log(data);
    })
});

//for display records :id for all other ids
app.get('/:id',(req,res)=>{
    //res.send(req.params.id);
    stud.findOne({ //returns only one document
        _id:req.params.id
    }).then(data=>{
        res.render('display',{data:data});
    })
});

//inserting
app.post('/add-item',(req,res)=>{
    //saving data to db
    const data = new stud({
        name:req.body.name,
        rollno:req.body.rollno
    });
    data.save().then(()=>{
        res.redirect('/');
    }).catch(err=>console.log(err));
});

//updating
app.get('/edit/:id',(req,res)=>{
    stud.findOne({
        _id:req.params.id
    }).then(data=>{
        res.render('edit',{data:data,value:"edit page"})
    }).catch(err=>console.log(err));
});

app.put('/edit/:id',(req,res)=>{
    stud.findOne({
        _id:req.params.id
    }).then(data=>{
        data.name = req.body.name
        data.rollno = req.body.rollno
        data.save().then(()=>{
            res.redirect('/');
        }).catch(err=>console.log(err));
    }).catch(err=>console.log(err));
});

//delete from database
app.delete('/delete/:id',(req,res)=>{
    stud.deleteOne({
        _id:req.params.id
    }).then(()=>{
        res.redirect('/');
    }).catch(err=>console.log(err));
});

app.listen(3000,()=>{console.log("server is running")});