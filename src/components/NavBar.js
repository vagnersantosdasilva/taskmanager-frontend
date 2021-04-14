import React, {Component, useContext} from 'react';
import NavBarItem from './NavBarItem';
import {APP_NAME} from '../constants'
import AuthService from '../api/AuthService';
import {useNavBarItems} from "../hooks/useNavBarItems";
import {AuthContext} from "../hooks/useAuth";

const NavBar  = () =>{

    const navBarItems  = useNavBarItems();

    return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <span className="navbar-brand" href="#">{APP_NAME}</span>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav mr-auto">
                            {navBarItems.items.map(
                                i=> <NavBarItem 
                                    key = {i.name}
                                    item ={i}
                                   /> )}

                        </div>
                        <span className = "navbar-text">
                            {navBarItems.helloMessage}
                        </span>
                        
                    </div>
                </nav>
            </div>      
    );

}

export default NavBar;