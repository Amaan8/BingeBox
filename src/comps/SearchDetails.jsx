import React, { useState, useEffect } from 'react'

const SearchDetails = (props) => {
    const [movieinfo, setMovieinfo] = useState([]);
    
    useEffect(() => {
        const getMovieInfo = async () => {
            if (props.selected) {
                const movie_url = `http://www.omdbapi.com/?i=${props.selected}&apikey=8e8404b0`;
                const m_res = await fetch(movie_url);
                const m_resJson = await m_res.json();
                if (m_resJson) {
                    console.log(m_resJson);
                    setMovieinfo(m_resJson);
                    console.log("movie info = ", movieinfo)
                }
            }
            else {
                console.log("No movie set")
            }
        }
        getMovieInfo();
    }, [props.selected]);


    const search_query = `https://google.com/search?q=watch+${movieinfo?.Title}`;
    console.table(movieinfo)
    return (
        <>

            <div className="container-fluid movie-info" style={{marginTop : '80px'}}>
                <span onClick={() => { props.setSelected(null) }}>X</span>
                {props.selected ?
                    <div className="row">

                        <div className="info-poster">
                            <img src= {movieinfo.Poster} className=" img-fluid" />
                        </div>
                        
                        
                        
                        <div className="info-content col-sm-6">
                            
                               
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
                    
                    </div> : console.log("No info")}
            </div>
        </>
    );
};

export default SearchDetails;