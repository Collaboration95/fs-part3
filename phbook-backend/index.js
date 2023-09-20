const mongoose = require('mongoose')
const express = require('express');
require('dotenv').config()
const Entry = require('./models/note')
const morgan = require('morgan');
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())

app.use(express.static('dist'))

morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

// const entry = new Entry({
//   name: name,
//   number: number,
//   id: generateId(),
// })

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
    })

app.get('/api/persons',(request,response)=>{
    Entry.find({}).then(result => {
        response.json(result)
      })
      // mongoose.connection.close()
})

app.get('/info',(request,response)=>{
    const date = new Date()
    response.send(`<div><p>Phonebook has info for ${persons.length} people</p>
                    <p>${date}</p></div>`)
}
)
app.delete('/api/persons/delete/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(note => note.id !== id)
    response.status(204).end()
}
)

const generateId = () => {
  const randomNumber = Math.floor(Math.random() * 1000000) + 1;
  return randomNumber;
  }
  
  app.post('/api/persons', (request, response) => {
    const body = request.body
  
    if (body.conent === undefined) {
      return response.status(400).json({
        error: 'content missing'
      })
    }
    const entry = new Entry({
    content: body.content,
    id: generateId(),
    })

    entry.save().then(savedEntry => {
    response.json(savedEntry)
    })
    
    // // Comment
    // if (!body.name) {
    //   return response.status(400).json({ 
    //     error: 'content missing' 
    //   })
    // }
    // const personName = persons.find(note => note.name === body.name)
    // if(personName){
    //     return response.status(400).json({
    //         error: 'name must be unique'
    //     })
    // }
  
    // const person = {
    //   name:body.name,
    //   number:body.number,
    //   id: generateId()
    // }
  
    // persons = persons.concat(person)
  
    // response.json(persons)
  })

app.get('/api/persons/:id', (request, response) => {
  const id =Number(request.params.id);
  Entry.findById(id).then(entry => {
    if (entry) {
      // response.json(entry)
      response.json("entry")
    }
    else {
    console.log("entry not found")
    }
  })
  })
  
const PORT =process.env.PORT || 3001
    app.listen(PORT)
    console.log(`Server running on port ${PORT}`)
