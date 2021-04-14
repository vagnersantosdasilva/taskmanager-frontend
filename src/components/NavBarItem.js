import React from 'react';
import { Link } from 'react-router-dom';

const NavBarItem  = ({item})=> {

        return (
            <div>
                <Link to={item.href}
                className = {`nav-item nav-link  ${item.active? "active" :""}`}
                onClick={e => item.onClick(item) }>
                {item.name} </Link>
            </div>
        );

}

export default NavBarItem;