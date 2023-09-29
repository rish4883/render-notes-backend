const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.static('dist'))
app.use(cors())
app.use(express.json())


let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>')
})

app.get('/api/notes', (req, res) => {
  console.log(req.headers);
  res.json(notes)
  
})

app.get('/api/notes/:id', (req,res) => {
  const id = Number(req.params.id)
  
  const note = notes.find(n => n.id === id)
  if(note)
    res.json(note)
  else
    res.status(404).end()
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})

const generateId = () => {
  id = notes.reduce((a,b) => {
    return b.id > a ? b.id : a
  }, 0)
  return id + 1
}

app.post('/api/notes', (req, res) => {
    const body = req.body

    if(!body.content) {
      return response.status(400).json({error: 'content missing'})
    }

    const newNote = {
      content: body.content,
      important: body.important || false,
      id: generateId()
    }

    notes.push(newNote)
    console.log(newNote);
    res.json(newNote)
})


const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log('Server running on port', PORT);
})

