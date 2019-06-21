const express = require('express')
const helmet = require('helmet')

const StudentRouter = require('../students/student-router.js')

const server = express();

server.use(express.json());

server.get('/', (req,res) => {
    res.status(200).json({api:"up"});
});

server.use('/students',StudentRouter)

module.exports = server;