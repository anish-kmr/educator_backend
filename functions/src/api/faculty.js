const Faculty = require('../models/FacultyModel')
const auth = require('../services/auth')
const express = require('express')
const router = express.Router()


router.post('/create', (req,res)=>{
    let userdata = req.body
    auth.createUser(userdata)
    .then(newUser=>{
        let faculty = new Faculty(newUser.uid,newUser.displayName,newUser.email,false)
        faculty.save()
        return res.json({created:true,user:newUser})
    }).catch(err=>{
        return res.json({created:false,error:err.message})
    }) 
})

router.post('/authenticate',(req, res)=>{
    let email = req.body.email
    let password = req.body.password
    auth.signIn(email,password)
    .then(async response=>{
        let scheduleFilled = false;
        let faculty = await Faculty.findById(response.data.localId)
        if(faculty){
            scheduleFilled = faculty.scheduleFilled
        }
        response.data.scheduleFilled = scheduleFilled
        return res.json({signedIn:true,user:response.data})
    })
    .catch(err=>{
        return res.json({signedIn:false,err:err})
    })
})
module.exports=router