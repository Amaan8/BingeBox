import React from 'react'
import { useState, useEffect } from 'react';
import Content from './Content';
import req from './request';
import Music from '../aud_module/Music';
import "./home.css"
import Banner from './Banner';
import { useHistory } from 'react-router-dom';

const Home = (props) => {
    const [showMovie, setShowMovie] = useState(false);
    const [showTV, setShowTV] = useState(false);
    const [toggle, settoggle] = useState(false);
    const history = new useHistory()

    const handleChoice = (ch) => {
        if (ch == 'movie') {
            setShowTV(false);
            setShowMovie(true);
        }
        else if (ch == 'tv') {
            setShowTV(true);
            setShowMovie(false);
        }
    }
 
    return (
        <div>
            {/*toggle screens between movies and music 
             using state toggle*/}
             <div className="toggle-content">
                        {/*handle toggle options*/}
                        <button style={!toggle?{transform:'scale(1.1)', margin:'10px'}:{font:'bold'}} onClick={()=>{settoggle(false)}} className='toggle-btn'><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-film" viewBox="0 0 16 16">
                            <path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1zm4 0v6h8V1H4zm8 8H4v6h8V9zM1 1v2h2V1H1zm2 3H1v2h2V4zM1 7v2h2V7H1zm2 3H1v2h2v-2zm-2 3v2h2v-2H1zM15 1h-2v2h2V1zm-2 3v2h2V4h-2zm2 3h-2v2h2V7zm-2 3v2h2v-2h-2zm2 3h-2v2h2v-2z" />
                        </svg> Movies</button>
                        <button style={toggle?{transform:'scale(1.1)', margin:'10px'}:{font:'bold'}}  onClick={()=>{settoggle(true); history.push('/muse')}} className='toggle-btn'><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-music-note-beamed" viewBox="0 0 16 16">
                            <path d="M6 13c0 1.105-1.12 2-2.5 2S1 14.105 1 13c0-1.104 1.12-2 2.5-2s2.5.896 2.5 2zm9-2c0 1.105-1.12 2-2.5 2s-2.5-.895-2.5-2 1.12-2 2.5-2 2.5.895 2.5 2z" />
                            <path fill-rule="evenodd" d="M14 11V2h1v9h-1zM6 3v10H5V3h1z" />
                            <path d="M5 2.905a1 1 0 0 1 .9-.995l8-.8a1 1 0 0 1 1.1.995V3L5 4V2.905z" />
                        </svg> Music</button>
                    </div>
                   
            {!toggle ? /*check if toggle is set and display movie or music panels accordingly */
                <>
                    <Banner url={req.discover} />
                    <Content title="Trending" url={req.trending} setReview={props.setSelectRev} />
                    <div className="home-choice-tab">
                        <a href="#movie_div"><button onClick={() => { handleChoice('movie') }}><h2>Movies</h2></button></a>
                        <a href="#tv_div"><button onClick={() => { handleChoice('tv') }}><h2>TV</h2></button></a>
                    </div>

                    {showMovie &&
                        <div id="movie_div">
                            <Content title="Action Movies" url={req.action} setReview={props.setSelectRev}/>
                            <Content title="Adventure Movies" url={req.adventure} setReview={props.setSelectRev}/>
                            <Content title="Comedy Movies" url={req.comedy} setReview={props.setSelectRev}/>
                            <Content title="Drama Movies" url={req.drama} setReview={props.setSelectRev}/>
                            <Content title="SciFi Movies" url={req.scifi} setReview={props.setSelectRev}/>
                            <Content title="Horror Movies" url={req.horror} setReview={props.setSelectRev}/>
                            <Content title="Fantasy Movies" url={req.fantasy} setReview={props.setSelectRev}/>
                            <Content title="Mystery Movies" url={req.mystery} setReview={props.setSelectRev}/>
                            <Content title="Animated Movies" url={req.animation} setReview={props.setSelectRev}/>
                        </div>
                    }
                    {showTV &&
                        <div id="tv_div">
                            <Content title="Action" url={req.actiontv} setReview={props.setSelectRev}/>
                            <Content title="Comedy" url={req.comedytv} setReview={props.setSelectRev}/>
                            <Content title="Drama" url={req.dramatv} setReview={props.setSelectRev}/>
                            <Content title="Mystery" url={req.mysterytv} setReview={props.setSelectRev}/>
                            <Content title="SciFi Fantasy" url={req.scifi_fantv} setReview={props.setSelectRev}/>
                            <Content title="Kids" url={req.kidstv} setReview={props.setSelectRev}/>
                        </div>}


                </> :
                <>
                <Music/>
                </>
                }
        </div>
    );
};

export default Home;