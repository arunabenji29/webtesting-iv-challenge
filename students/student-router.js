const router = require('express').Router();

const Students = require('./students-model.js')

router.get('/', (req,res) => {
    console.log(req.body)
    Students.getStudents()
    .then(student => {
        console.log(student)
        res.status(200).json({student:student});
    })
    .catch(error => {
        res.status(500).json(error);
    }

    )
})

router.post('/', (req,res) => {
    Students
    .insert(req.body)
    .then(ids => {
        res.status(201).json(ids);
    })
    .catch(error => {
        res.status(500).json(error);
    }

    )
})

router.delete('/:id', (req,res) => {
    
    Students
    .remove(req.params.id)
    .then(count => {
        console.log('count ',count)
        if(count>0)
        {
            res.status(201).json(count);
        }
        else{
            res.status(404).json({message:'zoo id not found'});
        }
    })
    .catch(error => {
        console.log('update error ',error)
        res.status(500).json(error);
    }

    )
})

module.exports = router