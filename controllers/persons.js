const personRouter = require('express').Router()
const Entry = require('../models/entry')


personRouter.get("/", (request, response) => {
  Entry.find({}).then((result) => {
    response.json(result)
  })
})

personRouter.get("/info", (request, response) => {
  const date = new Date()
  Entry.find({}).then((result) => {
    response.send(
      `<div><p>Phonebook has info for ${result.length} people</p>
      <p>${date}</p></div>`
    )
  })
})

personRouter.delete("/delete/:id", (request, response, next) => {
  const id = String(request.params.id)
  Entry.findByIdAndRemove(id)
    .then(() => {
      response.status(204).end("Success")
    })
    .catch((error) => next(error))
})

const generateId = () => {
  const randomNumber = Math.floor(Math.random() * 1000000) + 1
  return randomNumber
}

personRouter.post("/", (request, response, next) => {
  const body = request.body

  if (body.name === undefined || body.number === undefined) {
    return response.status(400).json({
      error: "content missing"
    })
  }
  const entry = new Entry({
    name: body.name,
    number: body.number,
    id: generateId()
  })

  entry
    .save()
    .then((savedEntry) => {
      response.json(savedEntry)
    })
    .catch((error) => next(error))
})

personRouter.get("/:id", (request, response, next) => {
  const id = String(request.params.id)
  Entry.findById(id)
    .then((entry) => {
      if (entry) {
        response.json(entry)
      }
      else {
        response.status(404).end("Not found")
      }
    })
    .catch((error) => next(error))
})

personRouter.put("/:id", (request, response, next) => {
  const { name, number } = request.body
  const entry = {
    name: name,
    number: number
  }

 Entry.findByIdAndUpdate(
   String(request.params.id),
   entry,
   { new: true, runValidators: true, context: "query" }
 )
    .then((updatedNote) => {
      response.json(updatedNote)
    })
    .catch((error) => next(error))
})

module.exports = personRouter