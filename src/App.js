import React , { Component } from 'react';
import NavBar from './components/NavBar';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import TaskListTable from './components/TaskListTable';
import TaskForm from './components/TaskForm';

class App extends Component {
  //constructor(props){
    //super(props)
  //}
  render(){
    return (
     
        <BrowserRouter>
        <div className="App">
          <NavBar/>
          <Switch>
            <Route exact path ="/form" component = {TaskForm}/>
            <Route exact path ="/form/:id" component = {TaskForm}/>
            <Route path ="/" component = {TaskListTable} />
          </Switch>
        </div>
        </BrowserRouter>
    );
  }
}


export default App;
