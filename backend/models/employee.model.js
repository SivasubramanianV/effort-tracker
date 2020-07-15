const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    employeename: {
        type:String,
        required: true,
        unique:false,
        trim:true,
        minlength:3
    },
},{timestamps:true,
});

const Employee = mongoose.model('Employee',employeeSchema);

module.exports = Employee;