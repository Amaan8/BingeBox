import React, { useRef } from 'react'
import './music.css'
import { useState, useEffect} from 'react';
import { tracks } from './Tracks';

const Music = () => {

  const [srch, setSrch] = useState(false);
  const search = useRef();
  const [trackList, setTrackList] = useState(null);

  function handleSearch() {
    setSrch(true);
    tracks.map(item=>{
      let values = [];
      let title = item.title.toLowerCase();
      if(title.includes(search.current.value.toLowerCase()))
      {
        let elem = item;
        values.push(item);
        setTrackList(values);
      }
     
     
    })
  }

  return (
    <>
      <div className="search-bar" style={{margin:'80px auto 20px auto'}}>
          <div className="form-item w-100">
            <input type="search" ref={search} className="form-control search-box" placeholder="Enter a track name" />

            {/*search in reviews*/}
            <span onClick={() => {handleSearch(); }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="aqua" class="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </span>

          </div>
        </div>
        
      <div class="container-music">
        {srch ? <>
            {trackList?
            <div className='songList'>
            <button className='btn btn-sm btn-danger' onClick={()=>{setSrch(false);}} style={{margin:'2px 2px 2px 90%', height:'30px', width:'80px'}}>Close X</button>
            
            {trackList.map((item, key)=>{
              return(
                <div className='songItemContainer'>
                  <iframe title='x' width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${item.id}&color=%235eb7b7&auto_play=false&hide_related=false&show_comments=false&show_user=false&show_reposts=false&show_teaser=true&buying=false&download=false`}></iframe>
                </div>
              )
            })}
            </div>
        
            :
            <></>}
            
        
        </> :

          <div class="songList">
            <h3>Best of All Time</h3>
            <div class="songItemContainer">

              <iframe title='x' width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/795556546&color=%235eb7b7&auto_play=false&hide_related=false&show_comments=false&show_user=false&show_reposts=false&show_teaser=true&buying=false&download=false"></iframe>

              <iframe title='x' width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/307070754&color=%235eb7b7&auto_play=false&hide_related=false&show_comments=false&show_user=false&show_reposts=false&show_teaser=true&buying=false&download=false" ></iframe>

              <iframe title='x' width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/334331910&color=%235eb7b7&auto_play=false&hide_related=false&show_comments=false&show_user=false&show_reposts=false&show_teaser=true&buying=false&download=false" ></iframe>

              <iframe title='x' width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/593708394&color=%235eb7b7&auto_play=false&hide_related=false&show_comments=false&show_user=false&show_reposts=false&show_teaser=true&buying=false&download=false" ></iframe>

              <iframe title='x' width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/439555917&color=%235eb7b7&auto_play=false&hide_related=false&show_comments=false&show_user=false&show_reposts=false&show_teaser=true&buying=false&download=false" ></iframe>

              <iframe title='x' width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/298052134&color=%235eb7b7&auto_play=false&hide_related=false&show_comments=false&show_user=false&show_reposts=false&show_teaser=true&buying=false&download=false" ></iframe>

              <iframe title='x' width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/237292781&color=%235eb7b7&auto_play=false&hide_related=false&show_comments=false&show_user=false&show_reposts=false&show_teaser=true&buying=false&download=false" ></iframe>

              <iframe title='x' width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/512660685&color=%235eb7b7&auto_play=false&hide_related=false&show_comments=false&show_user=false&show_reposts=false&show_teaser=true&buying=false&download=false" ></iframe>

              <iframe title='x' width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/191477804&color=%235eb7b7&auto_play=false&hide_related=false&show_comments=false&show_user=false&show_reposts=false&show_teaser=true&buying=false&download=false" ></iframe>

              <iframe title='x' width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/525840876&color=%235eb7b7&auto_play=false&hide_related=false&show_comments=false&show_user=false&show_reposts=false&show_teaser=true&buying=false&download=false" ></iframe>

            </div>
          </div>
        }
      </div>
    </>
  )
}

export default Music;