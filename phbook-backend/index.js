const mongoose = require('mongoose')
const express = require('express');
require('dotenv').config()
const Entry = require('./models/note')
// const morgan = require('morgan');
const app = express()
const cors = require('cors')
app.use(cors())
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method);
  console.log('Path:  ', request.path);
  console.log('Body:  ', request.body);
  console.log('---');
  next();
}

app.use(express.static('build'))
app.use(express.json())
app.use(requestLogger)
app.use(express.static('dist'))

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint


// morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

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
    Entry.find({}).then(result => {
      response.send(`<div><p>Phonebook has info for ${result.length} people</p>
      <p>${date}</p></div>`)
      })
    
}
)
app.delete('/api/persons/delete/:id', (request, response,next) => {
    const id = String(request.params.id)

    Entry.findByIdAndRemove(id)
    .then(result => {
      response.status(204).end("Success")
    }
    )
    .catch(error => next(error))
}
)

const generateId = () => {
  const randomNumber = Math.floor(Math.random() * 1000000) + 1;
  return randomNumber;
  }
  
  app.post('/api/persons', (request, response) => {
    const body = request.body


    if (body.name === undefined || body.number === undefined) {
      return response.status(400).json({
        error: 'content missing'
      })
    }
    const entry = new Entry({
    name: body.name,
    number: body.number,
    id: generateId(),
    })

    entry.save().then(savedEntry => {
    response.json(savedEntry)
    })
      })

app.get('/api/persons/:id', (request, response,next) => {
  const id = String(request.params.id)
  Entry.findById(id).then(entry => {
    if (entry) {
        response.json(entry)
    }
    else {
        response.status(404).end( "Not found")
    }
  })
  .catch(error => next(error))
})
// app.put('/api/persons/:id', (request, response, next) => {
//   const body = request.body

//   const entry = {
//     name: body.name,
//     number: body.number,
//     id:generateId(),
//   }
//   console.log(request.params.id)
//  Entry.findByIdAndUpdate(request.params.id, entry, { new: true })
//     .then(updatedNote => {
//       response.json(updatedNote)
//     })
//     .catch(error => next(error))
// })

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}
app.use(unknownEndpoint)
// this has to be the last loaded middleware.
app.use(errorHandler)


const PORT =process.env.PORT || 3001
    app.listen(PORT)
    console.log(`Server running on port ${PORT}`)
