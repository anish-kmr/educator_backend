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

    async save(){
        return db.collection('Schedules').add({
            day:this.day,
            startTime: this.startTime,
            endTime: this.endTime,
            subject: this.subject,
            batch: this.batch,
            year:this.year,
            facultyId:this.facultyId,
            facultyName:this.facultyName
        })
        .then(res => {return true})
        .catch((err) => {
            console.log("err in fun ",err)
            return false
        })
    }
}

module.exports = Schedule