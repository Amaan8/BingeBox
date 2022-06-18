import React from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';


const MovieOptions = (props) => {
    const [added, setAdded] = useState(false);

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>

                {props.srch ? //if the details requested are for a searched item instead of the home page
                    //only searches in omdb using the imdb id
                    <div>

                        <span onClick={() => { props.setSelected(props.movie.imdbID) }} className="details-nav">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
                                <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                            </svg>
                            See Details
                        </span>

                    </div>
                    : //detailed info for home page from both omdb and tmdb
                    <div>

                        <span onClick={() => { props.setSelected(props.movie) }} className="details-nav" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
                                <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                            </svg>
                            See Details
                        </span>

                    </div>
                }
                {props.showfav ?
                    //for explore page
                    <div onClick={() => { setAdded(true); props.addfavorite(props.movie) }} style={{ marginLeft: '65px' }}>
                        <span className="fav-icon">
                            {!added ?
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                                </svg>
                                :
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="red" class="bi bi-heart-fill" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                                </svg>

                            }
                        </span>
                    </div>

                    :
                    //for watchlist items
                    <div>
                        <span className="rem-icon" onClick={() => { props.remove(props.movie) }}>X</span>

                    </div>}
            </div>

               
                <div className="row">
                    
                    <NavLink exact={true} to="/share" style={{margin:0, padding:0}}>
                    <button onClick={()=>{props.setReview(props.movie)}} style ={{width:'180px'}}className="standard-btn"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                    </svg> Share Review</button>
                    </NavLink>

                    
      
                </div>
           
        </>
    );
};

export default MovieOptions;