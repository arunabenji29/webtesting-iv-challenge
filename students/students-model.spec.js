const Students = require('./students-model.js')
const db = require('../data/dbConfig.js')

describe('students model', () => {
    beforeEach(async () => {
        await db('students').truncate();
      });
    it('should set environment to testing', () => {
        expect(process.env.DB_ENV).toBe('testing');
    })
})

describe('insert()', () => {
    it('should insert the provided student', async () => {
        await Students.insert({ name: 'Tina' })

        const allStudents = await db('students')

        expect(allStudents).toHaveLength(1)
    })
})