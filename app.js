const express = require('express')
const cors = require('cors')

const app = express()
const port = 8000

const state = require('./state.json')
const titles = state.titles
const lists = state.lists

app.use(cors())

app.get('/titles', function (req, res) {
  res.send(titles)
})
app.get('/titles/:id', function (req, res) {
  let title = titles.find(title => title.id === req.params.id)
  res.send(title)
})
app.get('/lists/:id', function (req, res) {
  let listName = req.params.id.toString()
  let list = []
  titles.map(title =>
    title.photos.map(photo =>
      photo.list ?
        photo.list.includes(listName) ?
          list.push(photo) 
          : null 
        : null)
  )
  res.send(list)
})
app.get('/toprate', function(req, res) {
  let topTitles = [...titles]
  topTitles.sort(function(a, b) {
    if (a.rating < b.rating) {
      return 1;
    }
    if (a.rating > b.rating) {
      return -1;
    }
    return 0;
  })
  res.send(topTitles.slice(0, 10))
})

app.get('/prime', function(req, res) {
  let primeTitles = titles.filter(title => title.prime)
  res.send(primeTitles)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})