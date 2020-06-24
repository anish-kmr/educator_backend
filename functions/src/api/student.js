const Student = require('../models/StudentModel')
const auth = require('../services/auth')
const express = require('express')
const router = express.Router()


router.post('/create',(req,res)=>{
    let userdata = req.body
    let payload = {
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
    }
    auth.createUser(userdata)
    .then(async newUser=>{
        let student = new Student(
            newUser.uid,
            newUser.displayName,
            req.body.batch,
            req.body.year,
            newUser.email
            )
        await student.save()
        
        return res.json({created:true,user:newUser})
    }).catch(err=>{
        return res.json({created:false,error:err.message})
    }) 
})

router.post('/authenticate',(req, res)=>{
    let email = req.body.email
    let password = req.body.password
    auth.signIn(email,password)
    .then(response=>{
        response.data.uid = response.data.localId
        return res.json({signedIn:true,user:response.data})
    })
    .catch(err=>{
        res.json({signedIn:false,err:err.response.data.error.message})
    })
})
module.exports=router