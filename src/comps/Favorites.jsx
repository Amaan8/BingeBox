import React from 'react'
import './fav.css'
import './home.css'
import MovieOptions from './MovieOptions';
import MovieDetails from './MovieDetails';
import { useState, useEffect } from 'react';
import { collection, onSnapshot, deleteDoc, doc, updateDoc, setDoc } from '@firebase/firestore';
import { auth, db } from './fire';
import { NavLink } from 'react-router-dom';
import { useRef } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { text } from 'body-parser';

const Favorites = (props) => {
    const [selected, setSelected] = useState();
    const [favorites, setFavorites] = useState([]);
    const list_name = useRef()
    const [list, setList] = useState()
    const [listName, setListName] = useState("My WatchList");


    useEffect(() => {
        function getfavorites() {
            if (auth.currentUser) {
                const colref = collection(db, `${auth.currentUser.email}`)

                onSnapshot(colref, (snap) => {
                    const items = [];
                    snap.forEach(doc => {
                        if (doc.data().media_type || doc.data().Type || doc.data().overview) { //check if doc in firebase is a movie or show and not other data
                            items.push(doc.data());
                        }
                        if (doc.id == "ListName") {
                            setListName(doc.data().name)
                        }
                    });
                    setFavorites(items);
                })
            }
            else console.log("Not signed in")
        }

        getfavorites()
    }, [])

    useEffect(() => {

        //creates a list to copy to clipboard 

        function createList() {

            let listitems = " (Powered by BingeBox)\n"

            favorites.map((fav, i) => { 
                listitems = `${listitems}\n|_${(i + 1)}. ${(fav.name || fav.title || fav.Title)}${'_|'}`;
            })

            setList(listName + listitems);

        }
        createList()
    }, [favorites])

    // creates a listname doc with the given name in firestore
    function saveList() {
        const listName = list_name.current.value;
        const docref = doc(db, `${auth.currentUser.email}`, "ListName");
        setDoc(docref, { name: "" });
        updateDoc(docref, { name: `${listName}` });

    }


    function remove(movie) {
        deleteDoc(doc(db, `${auth.currentUser.email}`, `${movie.name || movie.title || movie.Title}`))
    }

    function deleteAll() {
        if (favorites) {
            const colref = collection(db, `${auth.currentUser.email}`);
            onSnapshot(colref, (snap) => {
                snap.forEach(document => {
                    let docref = doc(db, `${auth.currentUser.email}`, `${document.id}`)
                    deleteDoc(docref);
                })
            })
        }
    }
    return (
        <>
            {auth.currentUser ?
                <div className="container-fluid">
                    <div id="movie_info">
                        {selected && <MovieDetails selected={selected} setSelected={setSelected} />}
                    </div>
                    <h2 className="fav-heading">Your Favorites</h2>

                    <div className="fav-panel">
                        <div className="fav-list-header">
                            <input type="text" ref={list_name} className="fav-list-input" placeholder={listName}></input>
                            <button className="fav-btn-list" onClick={() => { saveList() }}>Save</button>
                        </div>
                        <div className="fav-content">
                            {favorites ?

                                favorites.map((movie, key) => {
                                    return (
                                        <div className="movie-item" style={{ height: "290px" }}>
                                            <img src={movie.poster_path ? `https://image.tmdb.org/t/p/original${movie.poster_path}` : `${movie.Poster}`} className="movie-poster" style={{ height: "290px" }} />
                                            <div className="options">
                                                <a href="#movie_info" className="no-decor">
                                                    <MovieOptions movie={movie} setSelected={setSelected} showfav={false} remove={remove} />
                                                </a>
                                            </div>
                                        </div>
                                    )
                                })
                                :
                                <></>
                            }
                        </div>
                        <div className="container-fluid">
                            <CopyToClipboard text={list} onCopy={() => { alert("Your List has been copied to clipboard :)") }}>

                                <div className="row">
                                    <div className="col-md-2">
                                        <button className="fav-btn"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-clipboard" viewBox="0 0 16 16">
                                            <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                                            <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
                                        </svg> Copy Watchlist</button>
                                    </div>
                                </div>
                            </CopyToClipboard>

                            <div className="row">
                                <div className="col-md-2">
                                    <button className="fav-btn" onClick={() => { deleteAll() }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                        </svg> Delete All
                                    </button>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
                :
                <div className="container-fluid fav-panel-alt text-center">
                    <p style={{ color: "aqua" }}><NavLink to="/user" style={{ textDecoration: "none" }} exact={true}>Sign In</NavLink> to start adding to the watchlist :)</p>

                </div>
            }
        </>
    );
};

export default Favorites;