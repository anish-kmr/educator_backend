const admin = require('firebase-admin')
const axios = require('axios')

const API_KEY = 'AIzaSyBvlvu7wo5AgjHQkm1HLtQDL4rl5_3p-c0'

const createUser = user => {
    if(!user.email){
        console.log("throwing error")
        return new Promise(resolve => {
            throw new Error("Email is mandatory.")
        })  
    }
    return admin.auth().createUser({
        email: user.email,
        password: user.password,
        displayName: user.name,
        disabled: false
    })
}

const signIn = async (email,password) =>{
    let payload = {
        email: email,
        password:password,
        returnSecureToken:true
    }
    return axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
         payload
    )

}

module.exports={
    createUser : createUser,
    signIn:signIn,
    
}   