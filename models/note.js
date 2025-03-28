require('dotenv').config()
const mongoose = require('mongoose')


// const persons  = [
//     {name :"Ayoub",number :"054-2526770"},
//     {name :"Jaafur",number :"054-2526771"},
//     {name :"Mahmoud",number :"054-2526772"},
//     {name :"Youssef",number :"054-2526773"},
// ]

const MONGODB_URI = process.env.MONGODB_URI
mongoose
.connect(MONGODB_URI)
.then(()=>{
    console.log('Connected to MongoDB')
})
.catch((err)=>{
    console.log('Error connecting to MongoDB' , err.message)
mongoose
.connect(MONGODB_URI)
.then(()=>{
    console.log('Connected to MongoDB')
})
.catch((err)=>{
    console.error('Error connecting to MongoDB', err.message)
    process.exit(1)
})
    
})
const noteSchema = new mongoose.Schema({
    name : {
         type: String,
         required: true ,
         unique: true,
        },  
    number : {
        validate : {
            validator: function(v){
                return /^\d{3}-\d{4,}$/.test(v)
            } ,
            message : props => `${props.value} not valid number`
        },
        type: String,
        required: true,
        unique: true}
})

noteSchema.set('toJSON',{
    transform : (document , returnedObject)=>{
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    }
})
// const Note = mongoose.model('Note',noteSchema) 
// Note
// .insertMany(persons)
// .then((result)=>{
//     console.log('data inserted successfully' ,result )
// })
// .catch((err)=>{
//     console.log('error inserting data'  , err.message)
// }).finally(()=>{
//     mongoose.connection.close()
// })
module.exports = mongoose.model('Note',noteSchema)


 


