const { Router } = require('express');
const express = require('express');
const router =express.Router();
const mongoose = require('mongoose')
const User = require("../models/user")
const bcript = require("bcrypt")

// /////////////////////////////////////Api//////////////////

router.post('/signup',(req,res)=>{

const {name,email,password}=req.body;

if(!email || !name || !password ){
    res.json({error:"massage is dle"})
}

 User.findOne({email:email})

 .then((saveduser)=>{

         if(saveduser){
         res.json({error:"this eemailid already exit"})
         }

        bcript.hash(password,12)
           .then(hashpassword=>{
              const user = new User({
              email,
              name,
              password:hashpassword,
              })
              user.save()
                .then(user=>{
                   res.json({massage:"all data save"})
                 })
                .catch(err=>{
                   res.json({error:"this some error"})
                 })
    
            })
            .catch(err=>{
                console.log(err)
            })

 })

 .catch(err=>{
   console.log(err)
 });

    
})

// /////////////////////////////////////Api//////////////////



module.exports = router;