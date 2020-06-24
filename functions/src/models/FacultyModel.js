const db = require('../util/db')
class Faculty{
    constructor(id,name,email,scheduleFilled) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.scheduleFilled = scheduleFilled;
    }
    static findById(id){
        return db.collection('Faculty').doc(id).get()
        .then(doc => {
           if (doc) {
                let faculty = doc.data()
                return new Faculty(id,faculty.name,faculty.email,faculty.scheduleFilled)
           }
           else return null
        }).catch(err=>{
            throw new Error(err)
        })
    }
    static async update(facultyId,newValues){
        return db.collection('Faculty').doc(facultyId).update(newValues)
        .then(() =>{ return true})
        .catch(() =>{return false})
    }
    save(){
        if(this.name === null || this.id === null || this.email === null) throw new Error("Fields can't be Empty")
        else{
            return db.collection('Faculty').doc(this.id).set({
                name:this.name,
                email:this.email,
                scheduleFilled:this.scheduleFilled          
            })
        }
    }
}


module.exports=Faculty