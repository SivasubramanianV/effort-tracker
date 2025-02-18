import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const Task = props =>(
    <tr>
    <td>{props.task.employeename}</td>
    <td>{props.task.description}</td>
    <td>{props.task.duration}</td>
    <td>{props.task.date.substring(0,10)}</td>
    <td>
      <Link to={"/edit/"+props.task._id}>edit</Link> | <a href="#" onClick={() => { props.deleteTask(props.task._id) }}>delete</a>
    </td>
  </tr>
)

export default class TaskList extends Component{

    constructor(props) {
        super(props);
    
        this.deleteTask = this.deleteTask.bind(this);

        this.state = {tasks: []};
    }
    
    componentDidMount(){
        axios.get("http://localhost:5000/tasks/")
        .then(res=>{
            this.setState({tasks: res.data})
        })
        .catch((err)=>{console.log(err);
        })

    }

    deleteTask(id){

        axios.delete('http://localhost:5000/tasks/'+id)
        .then(res=>{console.log(res.data)});

        this.setState({
            tasks: this.state.tasks.filter(ele=> ele._id !== id)
        })
        
    }

    taskList()
    {
        return this.state.tasks.map(currenttask=>{
            return<Task task={currenttask} deleteTask={this.deleteTask} key={currenttask._id}/>;              
            
        })
    }

    render()
    {
        return(
            <div>
            <h3>Logged Tasks</h3>
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th>Employee Name</th>
                        <th>Task Name</th>
                        <th>Duration</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>{this.taskList()}</tbody>
            </table>
            </div>
        )
    }
}