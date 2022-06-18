import React from 'react'
import './home.css'
import { useState } from 'react';
import Favorites from './Favorites';

const Create = (props) => {
const [toggle, settoggle] = useState(false);
  return (
    
  <div>
      {/*toggle screens between watchlist and playlist panels
             using state toggle*/}
             <div className="toggle-content">
                        {/*handle toggle options*/}
                        <button style={!toggle?{transform:'scale(1.1)', margin:'10px'}:{font:'bold'}} onClick={()=>{settoggle(false)}} className='toggle-btn'><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-film" viewBox="0 0 16 16">
                            <path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1zm4 0v6h8V1H4zm8 8H4v6h8V9zM1 1v2h2V1H1zm2 3H1v2h2V4zM1 7v2h2V7H1zm2 3H1v2h2v-2zm-2 3v2h2v-2H1zM15 1h-2v2h2V1zm-2 3v2h2V4h-2zm2 3h-2v2h2V7zm-2 3v2h2v-2h-2zm2 3h-2v2h2v-2z" />
                        </svg> Watchlist</button>
                        <button style={toggle?{transform:'scale(1.1)', margin:'10px'}:{font:'bold'}}  onClick={()=>{settoggle(true)}} className='toggle-btn'><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-music-note-beamed" viewBox="0 0 16 16">
                            <path d="M6 13c0 1.105-1.12 2-2.5 2S1 14.105 1 13c0-1.104 1.12-2 2.5-2s2.5.896 2.5 2zm9-2c0 1.105-1.12 2-2.5 2s-2.5-.895-2.5-2 1.12-2 2.5-2 2.5.895 2.5 2z" />
                            <path fill-rule="evenodd" d="M14 11V2h1v9h-1zM6 3v10H5V3h1z" />
                            <path d="M5 2.905a1 1 0 0 1 .9-.995l8-.8a1 1 0 0 1 1.1.995V3L5 4V2.905z" />
                        </svg> Playlist</button>
                    </div>
                   
            {!toggle ? /*check if toggle is set and display watchlist or playlist panel */
            <>
                <Favorites favorites={props.favorites} user={props.user}/>
            </>
             :
        
             <div style={{marginBottom:'29%'}}></div>
    
            }
  </div>
  )
}

export default Create;