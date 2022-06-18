import React from 'react';
import { NavLink } from 'react-router-dom';

function footer() {
    return (
        <div className="footer bg-dark text-center p-3" style={{marginTop:'40px'}}>
            <div>
                <ul className="navbar-nav mb-2 not-active">

                    <li className="nav-item p-2">

                        <NavLink className="nav-links" to="/about" activeClassName="active-link" exact={true}>About Us</NavLink>
                    </li>

                    <li className="nav-item p-2">

                        <NavLink className="nav-links" to="/contact" activeClassName="active-link" exact={true}>Contact Us</NavLink>
                    </li>

                </ul>
            </div>
            <p>2021 © BingeBase</p>
        </div>
    )
}

export default footer