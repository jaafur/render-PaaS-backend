const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGDOB_URI
mongoose
.connect(url)
.then(()=> console.log('connected to DB'))
.catch(err =>{
    console.log('error connecting to db :',err.message)
})

const noteSchema = new mongoose.Schema({
    name : String ,
    number : String
})

noteSchema.set('toJSON',{
    transform : (document , returnedObject)=>{
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    },
})

module.exports = mongoose.model('Note', noteSchema)