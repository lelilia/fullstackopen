const express = require('express')
const morgan = require('morgan')

// tiny configuration
//:method :url :status :res[content-length] - :response-time ms
const app = express()

app.use(express.json())


morgan.token('content', function (req, res) {
  const content = JSON.stringify({
    name: req.body.name,
    number: req.body.number
  })
  return content
})

morgan.token('type', function(req,res) { 
  return req.headers['content-type']
})

//app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(morgan('tiny', {
  skip: function (req, res) { return req.method === "POST" }
}))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content', {
  skip: function (req, res) { return req.method !== "POST" }
}))

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4
  }
]

// generate random Id
const generateId = () => {
  const id =  Math.floor(Math.random()*1000)
  if (persons.filter(p => p.id === id).length === 0) {
    return id 
  }
  else {
    return generateId()
  }
}

app.get('/', (request, response) => {
  response.send("<h1>Hello World</h1>")
})

// GET: shows list of persons
app.get('/api/persons', (request, response) => {
  response.json(persons)
})

// GET: shows number of entries and time stamp of request
app.get('/api/persons/info', (request, response) => {
  const numberOfEntries = persons.length 
  const dateOfRequest = new Date()
  const message = `
    <p>Phonebook has info for ${numberOfEntries} people </p>
    <p> ${dateOfRequest} </p>`
  response.send(message)
})

// GET: shows single resource
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(p => p.id === id)
  if (person) {
    response.json(person)
  }
  else {
    response.status(404).end()
  }
})

// DELETE: delete single resource
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

// POST: add person
app.post('/api/persons', (request, response) => {
  const body = request.body
  const name = body.name
  const number = body.number 
  if (!name) {
    return response.status(400).json({
      error: 'name missing'
    })
  }
  else if (!number) {
    return response.status(400).json({
      error: 'number missing'
    })
  }
  else if (persons.filter(person => person.name === name).length !== 0) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }

  const person = {
    name,
    number,
    id: generateId()
  }

  persons = persons.concat(person)
  response.json(person)
  
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})