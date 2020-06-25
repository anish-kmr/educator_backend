const db = require('../util/db')

class Schedule{
    constructor(day,startTime,endTime,subject,batch,year,facultyId,facultyName) {
        this.day = day;
        this.startTime = startTime;
        this.endTime = endTime;
        this.subject = subject;
        this.batch = batch;
        this.year = year;
        this.facultyId = facultyId;
        this.facultyName = facultyName;
    }
    static async get(field,condition,value){
        let schedules = {
            "Monday":[],
            "Tuesday":[],
            "Wednesday":[],
            "Thursday":[],
            "Friday":[],
            "Saturday":[],
        }
        let snapshots = await db.collection('Schedules').where(field,condition,value).get()
        if(!snapshots.empty){
            snapshots.forEach(doc=>{
                let s = doc.data()
                console.log(doc.id, '=>', doc.data());
                let schedule = {
                    day:s.day,
                    startTime: s.startTime,
                    endTime: s.endTime,
                    subject: s.subject,
                    batch: s.batch,
                    year:s.year,
                    facultyId:s.facultyId,
                    facultyName:s.facultyName,    
                }
                schedules[s.day].push(schedule)
            })
        }
        for(const day in schedules){
            schedules[day] = schedules[day].sort((a,b)=>parseInt(a.startTime.split(":")[0])-parseInt(b.startTime.split(":")[0]))
        }
        return schedules
    }

    async save(){
        return db.collection('Schedules').add({
            day:this.day,
            startTime: this.startTime,
            endTime: this.endTime,
            subject: this.subject,
            batch: this.batch,
            year:this.year,
            facultyId:this.facultyId,
            facultyName:this.facultyName,
            batch_year:`${this.batch}_${this.year}`
        })
        .then(res => {return true})
        .catch((err) => {
            console.log("err in fun ",err)
            return false
        })
    }
}

module.exports = Schedule