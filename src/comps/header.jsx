import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { auth } from './fire';
import { useHistory } from 'react-router';



const Header = (props) => {
    const [srch, setsrch] = useState(false);
    const history = useHistory();

    function handleSignout() {
        auth.signOut();
        window.location.reload(false);
    }

    const search = React.createRef();

    const handleSearch = (e) => {
        props.setSearchval(search.current.value)
        history.push("/Search")
    }

    return (
        <div className="container-fluid">

            <div className="row">

                <nav className="navbar navbar-expand-md navbar-dark bg-dark header">
                    <div className="container-fluid">

                        <NavLink className="navbar-brand brand" to="/">BingeBox</NavLink>

                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse links" id="navbarSupportedContent">

                            <ul className="navbar-nav ml-auto mb-2 mb-lg-0 not-active">

                                <li className="nav-item ms-3" style={{ marginTop: '8px' }}>

                                    <NavLink className="nav-links" to="/" activeClassName="active-link" exact={true}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lightbulb" viewBox="0 0 16 16">
                                        <path d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13a.5.5 0 0 1 0 1 .5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1 0-1 .5.5 0 0 1 0-1 .5.5 0 0 1-.46-.302l-.761-1.77a1.964 1.964 0 0 0-.453-.618A5.984 5.984 0 0 1 2 6zm6-5a5 5 0 0 0-3.479 8.592c.263.254.514.564.676.941L5.83 12h4.342l.632-1.467c.162-.377.413-.687.676-.941A5 5 0 0 0 8 1z" />
                                    </svg> Explore</NavLink>

                                </li>
                                <li className="nav-item ms-3" style={{ marginTop: '8px' }}>

                                    <NavLink className="nav-links" to="/create" activeClassName="active-link" exact={true}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
                                        <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
                                    </svg> Create</NavLink>
                                </li>

                                <li className="nav-item ms-3" style={{ marginTop: '8px' }}>

                                    <NavLink className="nav-links" to="/share" activeClassName="active-link" exact={true}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-share" viewBox="0 0 16 16">
                                        <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
                                    </svg> Share</NavLink>
                                </li>

                                {auth.currentUser ?
                                    <li className="nav-item ms-3">

                                        <div className="dropdown nav-links" style={{ cursor: 'pointer', marginLeft: '7px' }}>
                                            <span className="dropdown-toggle" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="aqua" class="bi bi-person-circle" viewBox="0 0 16 16">
                                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                                    <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                                                </svg> {auth.currentUser?.email.substring(0, props.user.email.indexOf('@'))}
                                            </span>


                                            {props.notif ? <sup className="counter-noti"> <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-circle-fill" viewBox="0 0 16 16">
                                                <circle cx="8" cy="8" r="8" />
                                            </svg></sup> : <></> /*display request notification above profile*/}


                                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink" style={{ backgroundColor: 'black' }}>
                                                <li><NavLink className="dropdown-item" to="/profile" exact={true} style={{ color: 'aqua' }}>
                                                    <span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                                                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                                        </svg>
                                                    </span> Profile</NavLink></li>

                                                <li onClick={() => { handleSignout(); }}><NavLink to="/" className="dropdown-item" style={{ color: 'aqua' }} exact={true} isActive={false}>
                                                    <span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
                                                            <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
                                                            <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                                                        </svg>
                                                    </span> Logout</NavLink></li>
                                            </ul>
                                        </div>
                                    </li>
                                    :
                                    <li className="nav-item ms-3" style={{ marginTop: '8px' }}>
                                        <NavLink className="nav-links" to="/User" activeClassName="active-link" exact={true}>SignIn</NavLink>
                                    </li>
                                }

                            </ul>


                            <div className="d-flex search-bar ms-md-auto">
                                <div className="form-item w-100" style={{minWidth:'35%'}}>
                                    <input type="search" ref={search} name="moviesearch" className="form-control search-box" placeholder="Type to search" />

                                    <span onClick={() => { handleSearch() }}>
                                        <svg style={{marginRight:'2%'}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="aqua" class="bi bi-search" viewBox="0 0 16 16">
                                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                        </svg>
                                    </span>

                                </div>
                            </div>

                        </div>
                    </div>
                </nav>


            </div>
        </div>
    );
};

export default Header;