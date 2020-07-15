import React,{ Component } from 'react';
import axios from 'axios';

class CreateEmployee extends Component{
    constructor(props) {
        super(props);
        
        this.onChangeEmployeename = this.onChangeEmployeename.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
             employeename:''
        }
    }
    
    onChangeEmployeename(e)
    {
        this.setState({
            employeename : e.target.value
        })
    }

    onSubmit(e)
    {
        e.preventDefault();

        const employee = {
            employeename: this.state.employeename
        }

        console.log(employee);

        axios.post("http://localhost:5000/employees/add",employee)
        .then(res=>console.log(res.data));

        this.setState({
            employeename: ''
        })
    }
    render(){
        return(
            <div>
            <h3>Create Employee</h3>
            <form onSubmit={this.onSubmit}>
            <div className="form-group">            
            <label>Employee name:</label>
            <input type="text"
                    required
                    className="form-control"
                    value={this.state.employeename}
                    onChange={this.onChangeEmployeename}/>                        
            </div>
            <div className="form-group">
            <input type="submit" value="Create" className="btn btn-primary"/>
            </div>
            </form>
            </div>
        );
    }

}
export default CreateEmployee;