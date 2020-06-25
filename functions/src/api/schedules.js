const Schedule = require('../models/ScheduleModel')
const Faculty = require('../models/FacultyModel')
const express = require('express')
const router = express.Router()

router.post('/',async (req,res)=>{
    let facultyId = req.body.facultyId
    let facultyName = req.body.facultyName
    let schedules = req.body.schedules
    let promises=[]
    schedules.forEach(async scheduleObject=>{
        let day = scheduleObject.day
        let time = scheduleObject.time
        let subject = scheduleObject.subject
        let batch = scheduleObject.batch
        let year = scheduleObject.year

        let [ startTime , endTime ]  = time.split("-") 

        let schedule = new Schedule(day,startTime,endTime,subject,batch,year,facultyId,facultyName)
        
        promises.push(schedule.save())
    })
    Promise.all(promises.map(promise => promise.catch(e => false)))
    .then(async (arr) => {
        let saved = arr.filter(x=>x).length
        await Faculty.update(facultyId,{scheduleFilled:true})
        return res.json({saved:saved,failed:arr.length-saved})
    }).catch(err=>{
        return res.json({errr:err})
    })
})

router.get('/faculty/:id',async (req,res)=>{
    let id = req.params.id
    let schedules = await Schedule.get("facultyId","==",id)
    res.json({schedules: schedules})

})

module.exports = router