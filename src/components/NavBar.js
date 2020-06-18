import React, { Component } from 'react';
import NavBarItem from './NavBarItem';

class NavBar extends Component {

    constructor(props){
        super(props);

        this.state = {
            items:[
                {name:"Item A" , href:"/"},
                {name:"Item B" , href:"/"},
                {name:"Item C" , href:"/"},
                {name:"Item 4" , href:"/"}
            ]
        }
    }
    render() {
        return (
            <div>
                {this.state.items.map((i)=> <NavBarItem name = {i.name}/> )}
            </div>
        );
    }
}

export default NavBar;