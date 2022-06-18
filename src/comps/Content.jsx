import React from 'react'
import { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import axios from '../axios';
import movieTrailer from 'movie-trailer';
import MovieOptions from './MovieOptions';
import MovieDetails from './MovieDetails';
import { auth, db } from './fire';
import { collection, setDoc, doc } from "firebase/firestore"

const Content = (props) => {
    const image_url = "https://image.tmdb.org/t/p/original";
    const [movies, setMovies] = useState([]);
    const [trailer, setTrailer] = useState();
    const [selected, setSelected] = useState();

    useEffect(() => {
        async function getMovie() {
            setMovies([]);
            const request = await axios.get(props.url);
            setMovies(request.data['results']);
            return request;
            

        }
        getMovie();
    }, [props.url]);

    console.log(props.url);
    const showTrailer = (movie) => {
        if (trailer) {
            setTrailer('')
        }
        else {
            movieTrailer(movie?.title || movie?.name || movie?.original_title || "")
                .then((url) => {
                    const urlat = new URLSearchParams(new URL(url).search);
                    setTrailer(urlat.get('v'));
                })
                .catch((err) => { console.log(err + movie.name) });
        }
    }

    const opts = {
        height: '390',
        width: '640',
        playerVars: {
            autoplay: 1,
        },
    };

    //firestore functionality

    function addFavorites(movie) {
        const col = collection(db, `${auth.currentUser.email}`)
        const id = movie.title || movie.Title || movie.name || movie.original_title
        const docref = doc(db, `${auth.currentUser.email}`, `${id}`);
        setDoc(docref, movie);

    }

    return (
        <>
            <h2 className="ms-3">{props.title}</h2>
            <div className="home-row-container">
                <div className="home-row">

                    {
                        movies.map((movie, index) => {
                            if(movie.vote_average>=6.5){
                            return (
                                <div className="home-movie-poster">
                                    <img index={movie.id} src={`${image_url}${movie.poster_path}`} alt={movie.name} onClick={() => { showTrailer(movie) }} />

                                    <div className="home-movie-options">
                                        <a href="#movie_info" className="no-decor">
                                            <MovieOptions addfavorite={addFavorites} movie={movie} setSelected={setSelected} showfav={true} setReview={props.setReview}/>
                                        </a>
                                    </div>
                                </div>)}


                        })}
                </div>
            </div>
            {trailer && <div style={{margin:'2px auto 2px auto'}} className="banner-trailer">
                <span style={{margin:'2px 30% 2px 1%'}} onClick={() => { setTrailer(null) }}><div>X</div></span>
                <YouTube videoId={trailer} opts={opts} />
            </div>}
            <div id="movie_info">
                {selected && <MovieDetails selected={selected} setSelected={setSelected} />}
            </div>
        </>
    )

}

export default Content;