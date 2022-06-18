import React, { useState, useEffect } from 'react'
import Friends from '../soc_module/Friends';
import './home.css'
import Reviews from './Reviews';

const Share = (props) => {
    const [toggle, settoggle] = useState(false);
    const [recom, setRecom] = useState(null);
    useEffect(()=>{
        setRecom(props.movie);
    },[]);
    
    return (
        <div>
            {/*toggle screens between friends and live feed
             using state toggle*/}
            <div className="toggle-content">
                {/*handle toggle options*/}
                <button style={!toggle ? { transform: 'scale(1.1)', margin: '10px' } : { font: 'bold' }} onClick={() => { settoggle(false) }} className='toggle-btn'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-collection-play-fill" viewBox="0 0 16 16">
                    <path d="M2.5 3.5a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-11zm2-2a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6v7zm6.258-6.437a.5.5 0 0 1 .507.013l4 2.5a.5.5 0 0 1 0 .848l-4 2.5A.5.5 0 0 1 6 12V7a.5.5 0 0 1 .258-.437z" />
                </svg> Live</button>
                <button style={toggle ? { transform: 'scale(1.1)', margin: '10px' } : { font: 'bold' }} onClick={() => { settoggle(true) }} className='toggle-btn'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-people-fill" viewBox="0 0 16 16">
                    <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                    <path fill-rule="evenodd" d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z" />
                    <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
                </svg> Friends</button>
            </div>

            {!toggle ? /*check if toggle is set and display friends or live feed */
                <>
                    <Reviews movie={props.movie} setMovie={props.setMovie}/>
                </>
                :
                <>
                    <Friends recom={props.movie} setRecom={props.setMovie}/>
                </>
            }
        </div>
    )
}

export default Share;