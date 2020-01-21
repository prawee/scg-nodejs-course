const express = require('express')
const web = express()

web.get('/', (req, res) => {
    res.send('hello web')
})

web.listen(4000, () => 
    console.log('server is running...'))