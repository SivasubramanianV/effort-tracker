const router = require('express').Router();
let Task = require('../models/task.model');

router.route('/').get((req,res)=>{
    Task.find()
    .then(tasks=>res.json(tasks))
    .catch(err=>res.statusCode(400).json('Error'+err));
})

router.route('/add').post((req,res)=>{
    const employeename = req.body.employeename;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newTask = new Task({
        employeename,
        description,
        duration,
        date,
    });
    newTask.save()
    .then(()=>res.json('Task added'))
    .catch(err=>res.statusCode(400).json('Error'+err));
})

router.route('/:id').get((req,res)=>{
    Task.findById(req.params.id)
    .then(task => res.json(task))
    .catch(err=>res.statusCode(400).json('Error'+err));
})

router.route('/:id').delete((req,res)=>{
    Task.findByIdAndDelete(req.params.id)
    .then(()=>res.json('Task deleted'))
    .catch(err=>res.statusCode(400).json('Error'+err));
});

router.route('/update/:id').put((req,res)=>{
    Task.findById(req.params.id)
    .then(task=>{
        task.employeename = req.body.employeename;
        task.description = req.body.description;
        task.duration = Number(req.body.duration);
        task.date = Date.parse(req.body.date);

        task.save()
        .then(()=> res.json('Task updated'))
        .catch(err=>res.statusCode(400).json('Error:'+err));
    })
    .catch(err=>res.statusCode(400).json('Error:'+err));
})
    module.exports = router;
