import React, { Component } from 'react';
import NavBarItem from './NavBarItem';
import {APP_NAME} from '../constants'
import AuthService from '../api/AuthService';

class NavBar extends Component {

    constructor(props){
        super(props);

        this.state = {
            items:[
                {name:"Listar Tarefas" , href:"/" , active:true},
                {name:"Nova Tarefa" , href:"/form" ,active:false}
            ]
        }
        this.onClickHandler=this.onClickHandler.bind(this);
    }
    onClickHandler(itemClicked){
        const items =[...this.state.items];
        items.forEach(item=>{
            if (item.name===itemClicked.name){
                item.active=true;

            }else{
                item.active=false;
            }
        })
        this.setState({items});
    }
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <span className="navbar-brand" href="#">{APP_NAME}</span>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav mr-auto">
                            {this.state.items.map(
                                i=> <NavBarItem 
                                    key = {i.name}
                                    item ={i}
                                    onClick = {this.onClickHandler} /> )}
                        
                            {AuthService.isAuthenticated() ? 
                                <NavBarItem item = {{name:"Logout" , href :"#" , active:"false"}} />
                                :""
                            }
                        </div>
                    </div>
                </nav>
            </div>      
            
        );
    }
}

export default NavBar;