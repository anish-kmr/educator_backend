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
               console.log("Doc found")
                let faculty = doc.data()
                console.log("Returning faculty",faculty)
                return new Faculty(id,faculty.name,faculty.email,faculty.scheduleFilled)
        
           }
           else return null
           
           
        }).catch(err=>{
            console.log("Throwing error")
            throw new Error(err)
        })
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