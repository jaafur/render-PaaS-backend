require('dotenv').config(); // Ensure dotenv is loaded at the top
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const morgan = require('morgan');
const cors = require('cors');
const Note = require('./models/note')
// const {MONGODB_URI} = require('./config')
const app = express();
const PORT = process.env.PORT || 3001

app.use(express.json())
morgan.token('body',(req)=>JSON.stringify(req.body))
app.use(morgan(':method :url :status :response-time ms :body'))
app.use(cors({
    origin: ['http://localhost:5173', 'https://render-paas-bpom.onrender.com'], // Allow both local dev and deployed frontend
    methods: 'GET,POST,PUT,DELETE',
    credentials: true
}));
app.use(express.static('dist'))

app.get('/api/persons',(req,res)=>{
    
    Note.find({}).then(notes =>{
        res.json(notes)
        
    })
    .catch(err =>{
        console.log(err)
        res.status(500).json({error : 'database query field'})
    })
    
})

app.get('/info',(req,res)=>{
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

    const personslength = persons.length
    res.status(200).send(`
        <p>phonebook has infon for ${personslength} people</p>
        <p>${formattedDate}</p>
        `)
})

app.get('/api/persons/:id',(req,res)=>{
    const id = req.params.id
    const person = persons.find(person => person.id === id)
    if(!person){
        return res.status(404).json({
            "error": "person not found"
        })
    }  
    res.status(200).json(person)
})
app.delete('/api/persons/:id',(req,res)=>{
    const id = req.params.id
    const targetPerson = persons.find(person => person.id === id)
    if(!targetPerson){
        return res.status(404).json({"error":"person not existed"})
    }
    persons = persons.filter(person => person.id !== id)
    res.status(200).json(targetPerson)
    
})
app.post('/api/persons',(req,res)=>{
    const person = req.body
    const isExisted = persons.find(son => son.name === person.name)
    if(!person.name || !person.number ){
        return res.status(400).json({"error" :"name and number are required"})
    }
    if(isExisted){
        res.status(400).json({"error":"name should be unique"})
    }
    const newPerson ={
        id : uuidv4(),
        name : person.name ,
        number : person.number
    }
   persons = persons.concat(newPerson)
    res.status(201).json(newPerson)
     
})
app.put('/api/persons/:id',(req,res)=>{
    const id = Number(req.params.id)
    const newPerson = req.body
    const targetPerson = persons.findIndex(person =>person.id === id)
    if(targetPerson === -1){
        return res.status(404).json({"error":"perosn is not existed"})
    }
    persons[targetPerson] = {...persons[targetPerson],...newPerson}
    res.status(200).json(persons[targetPerson])
})

app.listen(PORT,()=>console.log('Hello from the PORT'))