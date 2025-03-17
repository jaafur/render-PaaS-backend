// const mongoose = require('mongoose')

// if (process.argv.length < 3) {
//   console.log('give password as argument')
//   process.exit(1)
// }

// const password = process.argv[2]
// const url = `mongodb+srv://fullStackCourse:${password}@cluster0.mjmpc.mongodb.net/NoteApp?retryWrites=true&w=majority&appName=Cluster0`

// mongoose.connect(url)

// const noteSchema = new mongoose.Schema({
//   name : String,
//   number: String,
// })

// const Note = mongoose.model('Note', noteSchema)

const notes = [
    {
        name : "Jaafur",
        number: "054-2526770",
    },
    {
        name : "Ayoub",
        number : "054-2526771"
    },
    {
        name : "Mahmoud",
        number : "054-2526772"
    },
    {
        name : "Youssef",
        number : "054-2526771"
    }
]

// Note.insertMany(notes)
// .then (()=>{
//     console.log("notes addeed")
// })
// .catch((err)=>{
// console.log(err)
// })
// .finally(()=>{
//     mongoose.connection.close()
// })
// Note.find({name:"Jaafur"}).then(result=>{
//     result.forEach(note =>{
//         console.log(note)
//     })
//     mongoose.connection.close()
// })

const mongoose = require('mongoose')
if(process.argv.length < 3){
    console.log('Please provide a password')
    process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://fullStackCourse:${password}@cluster0.mjmpc.mongodb.net/NoteApp?retryWrites=true&w=majority&appName=Cluster0`
mongoose
.connect(url)
.then(()=>console.log('connected to db'))
.catch((err)=>{
    console.log(err)
    process.exit(1)
})

const phoneBookSchema = new mongoose.Schema({
    name :String,
    number :String
})
const phoneBook = mongoose.model('PhoneBook',phoneBookSchema)

if(process.argv.length >4){
    const newNote = new phoneBook( {
        name : process.argv[3],
        number : process.argv[4]
    }
)
    newNote
    .save()
    .then(result =>{
        console.log(`added ${result.name} number ${result.number} to phonebook`)
        mongoose.connection.close()
    })
    
}else if(process.argv.length === 3){
    phoneBook.find({})
    .then (responses =>{
        if(responses.length === 0){
            console.log("no data found in db")
            
        }else
        console.log('phonebook:')
        responses.forEach(response =>{
            console.log(`${response.name} ${response.number}`)
        })
    mongoose.connection.close()
    })
.catch(err =>{
    console.log(err)
    mongoose.connection.close()
})
    
}else {
    console.log('please provide name and number')
    mongoose.connection.close()
}
