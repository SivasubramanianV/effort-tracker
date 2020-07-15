import React,{Component} from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

export default class EditTask extends Component{

    constructor(props) {
        super(props)

        this.onChangeEmployeeName = this.onChangeEmployeeName.bind(this);
        this.onChangeTaskName = this.onChangeTaskName.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    
        this.state = {
            employeename:'',
            taskname:'',
            duration:'',
            date:'',
            employees: [],
            tasks:['Node js training','Salesforce training','React js training']
             
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/tasks/'+this.props.match.params.id)
          .then(response => {
            this.setState({
              employeename: response.data.username,
              taskname: response.data.description,
              duration: response.data.duration,
              date: new Date(response.data.date)
            })   
          })
          .catch(function (error) {
            console.log(error);
          })
    
        axios.get('http://localhost:5000/employees/')
          .then(response => {
            if (response.data.length > 0) {
              this.setState({
                employees: response.data.map(emp => emp.employeename),
              })
            }
          })
          .catch((error) => {
            console.log(error);
          })
    
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

        axios.put('http://localhost:5000/tasks/update/'+ this.props.match.params.id,tsk)
        .then(res=>{console.log(res.data)});
        
        window.location = '/';        
    }

    render()
    {
        return(
            
            <div>
            <h3>Edit Task</h3>
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
