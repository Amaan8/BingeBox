import React from 'react'
import { useState, useEffect } from 'react';
import req from './request';
import axios from '../axios';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import { collection, setDoc, doc } from '@firebase/firestore';
import { auth, db } from './fire';
const Banner = (props) => {
    const image_url = "https://image.tmdb.org/t/p/original/";
    const [movie, setMovie] = useState([]);
    const [trailer, setTrailer] = useState();
    const [added, setAdded] = useState(false)

    useEffect(() => {
        async function getMovie() {
            const request = await axios.get(props.url);
            const res = request.data['results'];
            setMovie(res[Math.floor(Math.random() * res.length - 1)]);
            setAdded(false);
            return request;
        }
        getMovie();
    }, []);

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


    function addFavorites(movie) {
        const col = collection(db, `${auth.currentUser.email}`)
        const id = movie.title || movie.Title || movie.name || movie.original_title
        const docref = doc(db, `${auth.currentUser.email}`, `${id}`);
        setDoc(docref, movie);
        setAdded(true);
    }

    return (
        <div>
            <div className="home-banner container-fluid"
                style={{
                    backgroundImage: `url(${image_url}${movie?.backdrop_path})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center center",
                }}>
                <h1>Discover.</h1>
                <div className="row">
                    <div className="col-md-2">
                    </div>
                    <div className="col-md-8">
                        <div className="home-banner-content container-fluid mx-auto text-center p-3">
                            
                            {movie.vote_average>=6.5?
                           <>
                           <h2>{movie?.name || movie?.title}</h2>
                            <button className="home-banner-btn" onClick={() => { showTrailer(movie) }}>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="aqua" class="bi bi-play-fill" viewBox="0 0 16 16">
                                        <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
                                    </svg>
                                </span>Play Trailer
                            </button>

                            {!added ?
                                <button className="home-banner-btn" onClick={() => { addFavorites(movie) }}>
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="aqua" class="bi bi-heart-fill" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                                        </svg>
                                    </span> Add To Watchlist
                                </button>
                                :
                                <button className="home-banner-btn">
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-heart-fill" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                                        </svg>
                                    </span> Added To Watchlist
                                </button>
                            }
                            <h6 className="pt-3">{movie?.overview}</h6></>:
                            <></>}
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                    </div>
                    <div className="col-md-6">
                        {trailer && <div className="banner-trailer my-3">
                            <span onClick={() => { setTrailer(null) }}><div>X</div></span>
                            <YouTube videoId={trailer} opts={opts} />
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Banner;