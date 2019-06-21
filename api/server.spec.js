const supertest = require('supertest')
const server = require('./server.js')

describe('server', () => {
    describe('GET /', () =>{
        it('responds with 200 OK', () => {
            return supertest(server)
            .get('/')
            .expect(200)
        })

        it('checking the content type to be json',async () => {
            await supertest(server)
            .get('/')
            .expect('Content-Type',/json/i)
        })

        it('using done', done => {
            supertest(server)
            .get('/')
            .expect(200,done);
        })

        it('responds {api:"up"}',async () => {
            await supertest(server)
            .get('/')
            .then(res => {
                expect(res.body).toEqual({api:'up'});
            })
        })
    })
})