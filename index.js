require('dotenv').config(); // *Ensure dotenv is loaded at the top
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const morgan = require('morgan');
const requestLogger = require('./middleware/requestLogger')
const cors = require('cors');
const Note = require('./models/note')
const errorHandler = require('./middleware/errorHandler')

const app = express();
const PORT = process.env.PORT || 3001

app.use(express.json())
morgan.token('body',(req)=>JSON.stringify(req.body))
app.use(morgan(':method :url :status :response-time ms :body'))
app.use(requestLogger) // *Use requestLogger for all incoming requests
app.use(cors({
    origin: ['http://localhost:5173', 'https://render-paas-bpom.onrender.com'], // Allow both local dev and deployed frontend
    methods: 'GET,POST,PUT,DELETE',
    credentials: true
}));
app.use(express.static('dist'))

app.get('/info',(req,res,next)=>{
    const date = new Date()
    const formattedDate = Intl.DateTimeFormat('en-US',{
        weekday:'long',
        month:'long',
        day:'numeric',
        hour:'2-digit',
        minute :'2-digit',
        second :'2-digit',
        timeZoneName :'long'
    }).format(date)

   Note
   .countDocuments()
   .then(count=> {
    res.status(200).send(`
        <p>phonebook has infon for ${count} people</p>
        <p>${formattedDate}</p>
        `)
   })
   .catch(err=> next(err))
   
})

app.get('/api/persons',(req,res,next)=>{
    
    Note.find({}).then(notes =>{
        res.json(notes)    
    })
    .catch(err =>next(err))   
})

app.get('/api/persons/:id',(req,res,next)=>{
    Note
    .findById(req.params.id)
    .then(person =>{
        if(!person){
            return res.status(404).json({error : "person not found"})
        }
        res.json(person)
    })
    .catch(err=>next(err))
})

app.post('/api/persons',(req,res,next)=>{
    const person = req.body
    const newPerson = new Note({
        name : person.name ,
        number : person.number
    })
 newPerson
 .save()
 .then(savedPerson =>{
    res.status(201).json(savedPerson) 
 }).catch(err=> next(err))    
})

app.put('/api/persons/:id',(req,res,next)=>{
   const {number} = req.body
   Note
   .findByIdAndUpdate(req.params.id ,{number} ,{new:true , runValidators: true})
   .then(modifiedPerson =>{
    if(!modifiedPerson){
        return res.status(404).json({error : "person not found"})
    }
    res.status(201).json(modifiedPerson)
   })
   .catch(err=> next(err))
 })

app.delete('/api/persons/:id',(req,res,next)=>{
    Note
    .findByIdAndDelete(req.params.id)
    .then(deletedPerson =>{
        if(!deletedPerson){
          return  res.status(404).json({error: "person not found"})
        }
       return res.status(204).end()
    })
    .catch(err =>next(err))  
})

// *middlewart to catch unknown endpoint
app.use((req,res)=>{
    res.status(404).json({error: 'Unknown endpoint'})
})

// *this middleware should defined at the end always
app.use(errorHandler)

app.listen(PORT,()=>console.log('Hello from the PORT'))