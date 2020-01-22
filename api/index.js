const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())

const knex = require('knex')({
  client: 'mysql',
  connection: {
    host : '127.0.0.1',
    user : 'root',
    password : '',
    database : 'nodejs'
  }
});

// app.use(express.bodyParser())
 
app.get('/', function (req, res) {
  res.send('API')
})

app.get('/users', function(req, res) {
  knex.select('*').from('user')
    .then(result=> {
      console.log(result)
      res.json(result)
    })
    .catch(err => {
      res.status(500).json({
        message: 'Error! contact administrator.'
      })
      console.log(err)
    })
})

app.get('/users/:id', function(req, res) {
  console.log(req.params.id)
  knex.select('*')
    .from('user')
    .where({ id: req.params.id })
      .then(result => res.json(result))
      .catch(err => {
        res.status(500).json({
          message: 'Contact Administrator'
        })
      })
})

app.post('/users', function(req, res) {
  console.log(req)
  // res.json(req.body)

  // {
  //   name: 'prawee',
  //   surname: 'Wongsa',
  //   birthday: '1984-10-08',
  //   email: 'prawee@hotmail.com',
  //   sex: 'male',
  //   created_at: new Date()
  // }

  const input = {...req.body, created_at: new Date()}
  // const input = Object.assign(
  //     {},
  //     req.body,
  //     { created_at: new Date()}
  // )
  knex('user').insert(input)
  .then(() => res.json({ message: 'Added successfully' }))
  .catch(err => {
    res.status(500).json({
      message: 'Contact administrator.'
    })
    console.log(err)
  })
})

app.put('/users/:id', function(req, res) {
  knex('user')
    .where({ id: req.params.id })
    .update(req.body)
    .then(() => res.json({ message: 'Update Successfully'}))
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: 'Contact Administrator'})
    })
})

app.delete('/users/:id', function(req, res) {
  knex('user')
    .where({ id: req.params.id })
    .del()
    .then(() => res.json({ message: 'Deleted!'}))
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: 'Contact administrator'})
    })
})
 
app.listen(3000, () => {
  console.log('server is running...')
})