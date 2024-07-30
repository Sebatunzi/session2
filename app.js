const express= require('express');
const bodyparser =require ('body-parser');
const multer =require ('multer');
const app =express();
const path = require('path');
const mysql = require('mysql');
const port =3000;
 
app.set('view engine','ejs');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));
app.set(express.static('public'));


const db = mysql.createConnection({
host:'localhost',
user:'root',
password:'',
database:'market'
});

db.connect((err)=>{
    console.log("connected");
});

app.get('/dashboard',(req,res)=>{
    const sql ='SELECT * FROM shop';
    db.quer(sql,(err, result)=>{
        if(err) throw err
        res.render('dashboard',{shop:result});
    });
});
app.post('/add',(req,res)=>{
    const {title,description} req.body;
    const sql ='INSERT INTO shop (title,description) VALUES (?,?)';
    db.query(sql,[title,description],(err,result)=>{
        if(err) throw err
        res.redirect('/dashboard');
    });
});
app.get('delete/:id',(req,res)=>{
    const {id} =req.params;
    const sql ='DELETE FROM shop where id=?';
    db.query(sql,[id],(err, result)=>{
        if(err) throw err
        res.render('dashoard');
    });
});







app.listen(port,()=>{
    console.log("app is listening on port ${port}");
})