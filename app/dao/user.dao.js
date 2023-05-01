const db = require("../config/dbConfig")
const {getUserDetails} = require("../utils/hashpassword")

const findUser =  (email,done)=>{
    //use filter method to find the user from json file
    db.user.findOne({ where: {email: email}}).then((result,err) =>{
        
        if(!result){
            return done(null,"User not Found")
        }else{
            return done(null,result);
        }
    }).catch(err=>{
        console.log(err)
    })
}



const registerUser = (userData,done) =>{
    db.user.findOne({ where: {email: userData.email}}).
    then(result =>{
        if(result){
            return done("User Exists")
        }else{
            const userObj = getUserDetails(userData)
            const newUser = new db.user(userObj)
            newUser.save().then((res)=>{
                done(undefined,res)
            }).catch(err=>{
                done("Error saving user")
            })
        }
    }).catch(err=>{
        done("this didnt work 2")
    })
}

const getAllUsers = (done)=>{
    db.user.findAll({}).then((result,err) =>{
        if(!result){
            return done(null,"No user not Found")
        }else{
            return done(null,result);
        }
    }).catch(err=>{
        done(err)
    })
}

const verifyUser = (userId,done)=>{
    db.user.findOne({where: { id: userId }}).then((result,err) =>{
        if(!result){
            return done(null,"No user not Found")
        }else{
            db.operator.findOne({where:{userId:userId}}).then((result,err)=>{
                if(result){
                    result.update({verified:true}).then((res=>{
                        done(null,res)
                    }))
                }
                else{
                    return done("No Operator submission for this user found",null)
                }
            })
        }
    }).catch(err=>{
        done(err)
    })
}

module.exports = {
    findUser,registerUser,getAllUsers,verifyUser
}