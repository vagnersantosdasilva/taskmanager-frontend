import React , { Component } from 'react';
import NavBar from './components/NavBar';
import NavBarItem from './components/NavBarItem';



class App extends Component {
  constructor(props){
    super(props)
  }
  render(){
    return (
     
        <div className="App">
          <NavBar/>
          
        </div>
     
    );

  }

}


export default App;
