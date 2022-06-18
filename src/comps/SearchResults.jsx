import React from 'react'
import { useState, useEffect } from 'react';
import List from './List';

const Searchresults = (props) => {
    
    const [movies, setMovies] = useState([]);
    const [selected, setSelected] = useState('');
    const srch = props.searchval
    
    //fetch movies from api
    const getMovie = async (srch) => {
        if(srch==null||srch=="")
        {console.log("Nothing searched")}
        else
        {
            const url = `http://www.omdbapi.com/?s=${srch}&apikey=8e8404b0`;
            const res = await fetch(url);
            const resJson = await res.json();
            if (resJson.Search) {
                setMovies(resJson.Search);
            }
            console.log(movies);
        }
    }


    //update movies when searched
    useEffect(() => {
        getMovie(srch);
    }, [srch]);
    return (
        <div style={{marginTop:'20px'}}>
                {srch==null||srch==""?console.log("Nothing to search"):<div className="content">
                    <List movies={movies} selected = {selected} setSelected={setSelected} setMovies={setMovies} setReview= {props.setReview}/>
                </div>}
        </div>
    )
}

export default Searchresults;