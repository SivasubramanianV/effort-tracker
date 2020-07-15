import React,{Component} from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateTask extends Component{
    constructor(props) {
        super(props)

        this.onChangeEmployeeName = this.onChangeEmployeeName.bind(this);
        this.onChangeTaskName = this.onChangeTaskName.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    
        this.state = {
             employeename:'',
             taskName:'',
             duration:0,
             date: new Date(),
             employees:[],
             tasks:["React js training","React js hands on","Node js development","Mongo DB training","Automation Test Script Design","Script Execution"]
        }
    }
    
    componentDidMount(){
        axios.get('http://localhost:5000/employees')
        .then(res=>{
            if(res.data.length>0){
                this.setState({
                    employees: res.data.map(emp=>emp.employeename),
                    employeename: res.data[0].employeename
                })
            }
        })
        .catch(err=>console.log(err));
    }

    onChangeEmployeeName(e){
        this.setState({
            employeename:e.target.value
        })
    }

    onChangeTaskName(e){
        this.setState({
            taskname:e.target.value
        })
    }

    onChangeDuration(e){
        this.setState({
            duration:e.target.value
        })
    }
    onChangeDate(date){
        this.setState({
            date:date
        })
    }

    onSubmit(e)
    {
        e.preventDefault();
        const tsk = {
            employeename: this.state.employeename,
            description: this.state.taskname,
            duration: this.state.duration,
            date: this.state.date
        }

        console.log(tsk);

        axios.post("http://localhost:5000/tasks/add",tsk)
        .then(res=>{console.log(res.data)});
        
        window.location = '/';        
    }

    render(){
        return(
            <div>
            <h3>Create a New Task</h3>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
              <label>Employee name:</label>
              <select ref="userInput" 
              required
              className="form-control"
              value={this.state.employeename}
              onChange={this.onChangeEmployeeName}>
              {
                this.state.employees.map(function(employee){
                    return <option 
                    key={employee}
                    value={employee}>{employee}</option>;
                })
              }  
              </select>
              </div>  
              <div className="form-group">
              <label>Task name:</label>
              <select ref="userInput"
              required
              className="form-control"
              value={this.state.taskname}
              onChange={this.onChangeTaskName}>
              {this.state.tasks.map(function(task){
                return <option
                key={task}
                value={task}>{task}</option>;                
              })}            
              </select>
              </div>
              <div className="form-group">
              <label>Duration:</label>
              <input type="text"              
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}/>              
              </div>
              <div className="form-group">
              <label>Date: </label>
              <div>
              <DatePicker 
              selected={this.state.date}
              onChange={this.onChangeDate}
              />
              </div>
              </div>
              <div className="form-group">
                <input type="submit" value="Create Task Log" className="btn btn-primary" />
              </div>
            </form>
            </div>
        )
    }
}
