const db = require('../util/db')
class Student{
    constructor(id,name,batch,year,email) {
        this.id = id;
        this.name = name;
        this.batch = batch;
        this.year = year;
        this.email = email
    }
    static get(conditions=null){
        if(conditions === null){
            return db.collection('Students').get()
        }
        else{
            let query = db.collection('Students')
            conditions.forEach((key,value)=>{
                query = query.where(key,"==",value)
            })
            return query.get()
        }
    }
    save(){
        if(this.id === null || this.name === null || this.email === null || this.batch === null || this.year === null) throw new Error("Fields can';t be Empty")
        else{
            
            return db.collection('Students').doc(this.id).set({
                name:this.name,
                batch:this.batch,
                year:this.year,
                email:this.email
            })
        }
    }
}


module.exports=Student