const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(express.static('dist'))
app.use(cors())


morgan.token('postdata', (req, res) => Object.keys(req.method.toLowerCase() === 'post') ? JSON.stringify(req.body) : '')

app.use(morgan(function (tokens, req, res) {
    var postdata = tokens['postdata'](req, res)
    postdata = postdata !== '{}' ? postdata : '' 
    
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      postdata
    ].join(' ')
  })
)


app.use(express.json())

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






app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(note => note.id === id)
    
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })

app.get('/api/persons', (request, response) => response.json(persons))


app.get('/info', (request, response) => {
    return response.send(`<div>
                            <p>Phonebook has info for ${persons.length} people<p/>
                            <p>${Date()}</p>
                          <div/>`
                          )
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})


app.post('/api/persons', (request, response) => {
    const body = request.body
    if (!body.name){
        return response.status(400).json({error: 'name missing'})
    }
    else if(!body.number){
        return response.status(400).json({error: 'number missing'})
    }
    else if(persons.map(person => person.name).includes(body.name)){
        return response.status(400).json({error: 'name must be unique'})
    }
    
    const person = {
        id: Math.floor(Math.random() * 1000000),
        name: body.name,
        number: body.number
    }
    
    persons = persons.concat(person)
    
    response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})