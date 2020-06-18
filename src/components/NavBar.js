import React, { Component } from 'react';
import NavBarItem from './NavBarItem';
import {APP_NAME} from '../constants'

class NavBar extends Component {

    constructor(props){
        super(props);

        this.state = {
            items:[
                {name:"Listar Tarefas" , href:"/"},
                {name:"Nova Tarefa" , href:"/form"}
            ]
        }
    }
    onClickHandler(item){
        alert(item.name)
    }
    render() {
        return (

            <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <span className="navbar-brand" href="#">{APP_NAME}</span>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav mr-auto">
              
                {this.state.items.map(
                    i=> <NavBarItem 
                        item ={i}
                        onClick = {this.onClickHandler} /> )}
              </div>
            </div>
          </nav>



            
        );
    }
}

export default NavBar;