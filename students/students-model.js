const db = require('../data/dbConfig.js')

module.exports = {
    insert,
    remove,
    getStudents,
    getStudentsById,
    update

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

function getStudents(){
    return db('students')
}

function getStudentsById(id){
    return db('students')
    .where({id})
    .first()
}

function update(id,changes){
    return db('students')
    .where({id})
    .update(changes)
}