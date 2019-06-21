const db = require('../data/dbConfig.js')

module.exports = {
    insert,
    remove
}

function insert(student){
    return db('students')
    .insert(student,'id')
    .then(ids => {
        return db('students')
        .where({id:ids[0]})
        .first();
    })
}

function remove(id){
    return db('students')
    .where({id})
    .del()
}