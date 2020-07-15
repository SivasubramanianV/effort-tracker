import React from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"

import NavBar from './components/navbar.component';
import TaskList from './components/task-list.component';
import CreateEmployee from './components/create-employee.component';
import CreateTask from './components/create-task.component';
import EditTask from './components/edit-task.component';


function App() {
  return (
    <Router>
    <div className="container">      
      <NavBar/>
      <br/>  
      <Route path="/" exact component={TaskList} /> 
      <Route path="/employee" component={CreateEmployee}/>
      <Route path="/create" component={CreateTask}/> 
      <Route path="/edit" component={EditTask}/>     
    </div>
    </Router>
  );
}

export default App;
