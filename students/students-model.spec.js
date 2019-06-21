const Students = require('./students-model.js')
const db = require('../data/dbConfig.js')

describe('students model', () => {
    beforeEach(async () => {
        await db('students').truncate();
      });
    it('should set environment to testing', () => {
        expect(process.env.DB_ENV).toBe('testing');
    })


describe('insert()', () => {
    it('should insert students', async () => {
        await Students.insert({ name: 'Tina' })
        await Students.insert({ name: 'Fiona' })
        const allStudents = await db('students')

        expect(allStudents).toHaveLength(2)
    })

    it('should insert the provided student', async () => {
        let stu = { name: 'Anita' }
        let inserted = await Students.insert(stu)
        expect(inserted.name).toBe(stu.name)

        stu = { name: 'Lauren' }
        inserted = await Students.insert(stu)
        expect(inserted.name).toBe(stu.name)
    })
})

describe('remove()', () => {
    it('should remove the provided student', async () => {
        await Students.remove({ id:1 })

        const allStudents = await db('students')

        expect(allStudents).toHaveLength(0)
    })
})

describe('getStudents()', () => {
    it('should get all students', async () => {
        await Students.insert({ name: 'Tina' })
        await Students.insert({ name: 'Fiona' })
        const allStudents = await Students.getStudents()
        expect(allStudents).toHaveLength(2)


    })
})

describe('getStudentsById()', () => {
    it('should a specific student by id', async () => {
        let stu = await Students.insert({ name: 'stu1' })
        let stu1 = await Students.insert({ name: 'stu2' })
        const allStudents = await Students.getStudentsById(stu.id)
        console.log('all students ',allStudents)
        expect(allStudents.name).toBe(stu.name)
        expect(allStudents.name).not.toBeNull()

    })
})

describe('update()', () => {
    it('update student by id', async () => {
        let stu = await Students.insert({ name: 'stu1' })
        let stu1 = await Students.insert({ name: 'stu2' })
        stu['name'] = "student1"
        console.log('stu ',stu)
        const id = await Students.update(stu.id,stu)

        // console.log('all students ',allStudents)
        const changedName = await Students.getStudentsById(stu.id)
        expect(changedName).toEqual(stu)

        // expect(allStudents.name).not.toBeNull()

    })
})

})