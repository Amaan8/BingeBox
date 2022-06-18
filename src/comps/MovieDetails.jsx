import React, { useState, useEffect } from 'react'

const MovieDetails = (props) => {
    const [movieinfo, setMovieinfo] = useState([]);
    const [movie, setmovie] = useState('');
  
    useEffect(() => {
        const getmovie = async () => {

            const url = `http://www.omdbapi.com/?s=${props.selected?.name || props.selected?.title || props.selected?.original_title || props.selected?.Title}&apikey=8e8404b0`;
            const res = await fetch(url);
            const resJson = await res.json();
            if (resJson) {

                
                const item = resJson.Search;
                //map through the omdb array to find the item that matches tmbd data
                item?.map((content, key) => {
                    if (content.Title === props.selected?.name || content.Title === props.selected?.title || content.Title === props.selected?.original_title
                        && content.Type === props.selected.media_type) {
                        setmovie(content.imdbID)
                    }
                })

            }
            else console.log("no movie")
        }
        getmovie();
    }, [props.Selected])

    useEffect(() => {
        const getMovieInfo = async () => {
            if (movie) {
                const movie_url = `http://www.omdbapi.com/?i=${movie}&apikey=8e8404b0`;
                const m_res = await fetch(movie_url);
                const m_resJson = await m_res.json();
                if (m_resJson) {

                    setMovieinfo(m_resJson);
                  
                }
            }
            else {
                console.log("No movie set")
            }
        }
        getMovieInfo();
    }, [movie]);


    const search_query = `https://google.com/search?q=watch+${movieinfo?.Title||props.selected?.name||props.selected?.title||props.selected?.original_title}`;
    console.table(movieinfo)
    return (
        <>

            <div className="container-fluid movie-info">
                <span onClick={() => { props.setSelected(null) }}>X</span>
                {props.selected ?
                    <div className="row">

                        <div className="info-poster">
                            <img src={`https://image.tmdb.org/t/p/original${props.selected.poster_path}`} className=" img-fluid" />
                        </div>

                        {movieinfo.Title===props.selected?.name || movieinfo.Title === props.selected?.title || movieinfo.Title === props.selected?.original_title
                        && movieinfo.Type === props.selected.media_type ?

                            <div className="info-content col-md-6">


                                <div className="info-heading">
                                    <h2>{movieinfo.Title}</h2>
                                </div>
                                <div className="info-item">
                                    ImDB Rating : {movieinfo.imdbRating}<br />
                                </div>
                                <div className="info-item">
                                    Type        : {movieinfo.Type}<br />
                                </div>
                                <div className="info-item">
                                    Genre       : {movieinfo.Genre}<br />
                                </div>
                                <div className="info-item">
                                    Released    : {movieinfo.Released}<br />
                                </div>
                                <div className="info-item">
                                    Runtime     : {movieinfo.Runtime}<br />
                                </div>
                                <div className="info-item">
                                    Cast        : {movieinfo.Actors}<br />
                                </div>
                                <div className="info-item">
                                    Directed By : {movieinfo.Director}<br />
                                </div>
                                <div className="info-item">
                                    Plot        : {movieinfo.Plot}<br />
                                </div>
                                <a href={search_query} target="#">
                                    <button className="standard-btn ml-auto">Watch Now</button>
                                </a>
                            </div>
                            :
                            <div className="info-content col-md-6">


                                <div className="info-heading">
                                    <h2>{props.selected.title || props.selected.name}</h2>
                                </div>
                                <div className="info-item">
                                    Type        : {props.selected.media_type}<br />
                                </div>

                                <div className="info-item">
                                    Released    : {props.selected.release_date || props.selected.first_air_date}<br />
                                </div>

                                <div className="info-item">
                                    Plot        : {props.selected.overview}<br />
                                </div>
                                <a href={search_query} target="#">
                                    <button className="standard-btn ml-auto">Watch Now</button>
                                </a>
                            </div>
                        }
                    </div> : console.log("No info")}
            </div>
        </>
    );
};

export default MovieDetails;