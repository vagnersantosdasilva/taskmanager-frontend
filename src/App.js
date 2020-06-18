import React , { Component } from 'react';
import NavBar from './components/NavBar';
import { BrowserRouter } from 'react-router-dom';

class App extends Component {
  //constructor(props){
    //super(props)
  //}
  render(){
    return (
     
        <BrowserRouter>
        <div className="App">
          <NavBar/>
          
        </div>
        </BrowserRouter>
    );
  }
}


export default App;
