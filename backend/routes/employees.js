const router = require('express').Router();
let Employee = require('../models/employee.model');

router.route('/').get((req,res)=>{
    Employee.find()
    .then(users=>res.json(users))
    .catch(err=>res.statusCode(400).json('Error'+err));
});

router.route('/add').post((req,res)=>{
    const employeename = req.body.employeename;
    const newEmployee = new Employee({employeename});
    newEmployee.save()
    .then(()=>res.json('Employee added'))
    .catch(err=>res.status(400).json('Error'+err));
})

module.exports = router;