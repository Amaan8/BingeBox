import React from 'react';
import MovieOptions from './MovieOptions';
import SearchDetails from './SearchDetails';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {auth, db} from './fire'
import { collection, setDoc, doc} from '@firebase/firestore';

const List = (props) => {
    
    function addFavorites(movie){
        if(auth.currentUser){
        const col = collection(db,`${auth.currentUser.email}`)
        const id = movie.title||movie.Title||movie.name||movie.original_title
        const docref = doc(db, `${auth.currentUser.email}`, `${id}`);
        setDoc(docref,movie);
        }    
    }

    return (
        <div>
            {props.selected != [] ? <div id="movie_info">
                {props.selected && <SearchDetails selected={props.selected} setSelected={props.setSelected} />}
            </div> : console.log("nothing selected")}
            {props.movies ?
                <div>
                    <div className="mx-2 my-2">
                        <h3>Search Results</h3>
                    </div>
                    <div className="justify-content-end d-flex mx-4">
                        <NavLink exact={true} to="/"><button className="btn btn-sm btn-danger" onClick={(e) => { props.setMovies(null) }}>Close X</button></NavLink>
                    </div>

                    {props.movies.map((movie, index) =>

                        <div className="movie-item" >
                            <img className="movie-poster" src={movie.Poster} alt="" />
                            <div className="options">
                                <a href="#movie_info" className="no-decor">
                                    <MovieOptions addfavorite={addFavorites} movie={movie} showfav={true} setSelected={props.setSelected} srch={true} setReview={props.setReview} />
                                </a>
                            </div>
                        </div>

                    )}
                </div> : console.log("No movies!")}

        </div>
    );
};

export default List;