const supertest = require('supertest')

const server = require('../api/server.js')
const db = require('../data/dbConfig.js')

describe('student router', () => {
    beforeEach(async () => {
        await db('students').truncate();
      });

    describe('GET /', () =>{
        it('responds with 200 OK',async () => {
            await supertest(server)
            .get('/students')
            .expect(200)
        })

        it('check for an empty array',async () => {
            const res = await supertest(server)
            .get('/students')
            expect(res.body.student).toEqual([])
            // expect(res.body).toEqual([])
        })

        it('checking the content type to be json',async () => {
            await supertest(server)
            .get('/students')
            .expect('Content-Type',/json/i)
        })
    })

    describe('POST /', () =>{
        it('checks if res.body is not null',async () => {
            let stu = {name:'stu3'}
            await supertest(server)
            .post('/students')
            .send(stu)
            .then(res => {
                expect(res.body).not.toBeNull()
                
            })
            
        })

        it('responds with 201 OK',async () => {
            let stu = {name:'stu4'}
            const res = await supertest(server)
            .post('/students')
            .send(stu)
            .expect(201)
            
            
        })

        it('checking the content type to be json',async () => {
            let stu = {name:'stu3'}

            await supertest(server)
            .post('/students')
            .send(stu)
            .expect('Content-Type',/json/i)
        })
    })

    describe('DELETE /', () =>{

        it('responds with 201 OK',async () => {
            let stu = {name:'stu3'}
            await supertest(server)
            .post('/students')
            .send(stu)
            const res = await supertest(server)
            .get('/students')
            await supertest(server)
            .delete(`/students/${res.body.student[0].id}`)
            .expect(201)
        })

        it('check if the delete item exists',async () => {
            let stu = {name:'stu3'}
            await supertest(server)
            .post('/students')
            .send(stu)
            const res = await supertest(server)
            .get('/students')
            await supertest(server)
            .delete(`/students/${res.body.student[0].id}`)
            .then(res => {
                expect(res.body).not.toBeNull()
                
            })
        })

        it('check if the delete item has a json',async () => {
            let stu = {name:'stu3'}
            await supertest(server)
            .post('/students')
            .send(stu)
            const res = await supertest(server)
            .get('/students')
            await supertest(server)
            .delete(`/students/${res.body.student[0].id}`)
            .expect('Content-Type',/json/i)

        })


    })
})