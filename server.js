const express = require('express')
const path = require('path')
const app = express()
app.use(express.static(path.join(__dirname, './Frontent/')))
const publicDir = path.join(__dirname, "./Frontent/")
app.get('/', (_, res) => {
    res.sendFile('index.html')
}) 
app.get('/contacts',(_, res) =>{
    res.sendFile(publicDir + 'index3.html')
} )
app.get('/work',(_, res) =>{
    res.sendFile(publicDir + 'index2.html')
} )
app.listen(8888)