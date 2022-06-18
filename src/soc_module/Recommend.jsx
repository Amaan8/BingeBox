import React from 'react';
import '../comps/review.css';
import { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { auth, db } from '../comps/fire';

const Recommend = (props) => {
    const rating_input = useRef();
    const review_input = useRef();
    const [rated, setRated] = useState();
    const [reviewed, setReviewed] = useState();
    const [sendto, setSendto] = useState(false); 
    

    console.log(props.recom);
    function sendRec() {
        const n = /[+-]?([0-9]*[.])?[0-9]+/;
        if (props.recom && auth.currentUser) {
            if (rating_input.current.value !== '' && review_input.current.value !== '' &&
                n.test(rating_input.current.value) && rating_input.current.value <= 10) {
                const sendItem = {
                    id: auth.currentUser.email,
                    for: props.recom,
                    rated: rated,
                    review: reviewed,
                    created: Date.now()
                }
                
                props.setSendItem(sendItem); //sets the actual recommendation body
                props.setSendRec(true); //sets the recommendation condition to true which changes the frnd list panel options
            }
            else alert("Re-enter the rating & review");
        }
    }
    return (
        <div className="container-fluid review-panel">
            {/*recom panel start*/}
            {props.recom ?

                <div className="review-content">

                    <div className="home-movie-poster">
                        <img style={{ margin: '10px auto 10px auto' }} src={props.recom.poster_path ? `https://image.tmdb.org/t/p/original${props.recom.poster_path}` : props.recom.Poster} />
                    </div>
                   
                    <div className="review-options">
                        <h4 style={{ color: 'aqua' }}>Your Rating</h4>

                        <p><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                        </svg>
                            <input type="number" step="0.1" min="0" max="10" className="review-rate" ref={rating_input} onBlur={() => { setRated(rating_input.current.value) }} /> / 10</p>

                        <h4 style={{ color: 'aqua' }}>Write a review</h4>

                        <textarea cols="60" rows="6" className="review-input" ref={review_input} onBlur={(e) => { setReviewed(e.target.value) }}></textarea>

                        <div className="row">
                            <button className="review-btn" onClick={()=>{sendRec();}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                                </svg> Send
                            </button>
                        </div>

                    </div>

                    <div className="row"
                        style={{ float: 'right', color: 'aqua', cursor: 'pointer', margin: '5px', fontSize: '24px' }}
                        onClick={() => { props.setRecom(null); props.setSendRec(false); }/*close recommend panel and change friend list panel back */}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="aqua" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                        </svg>
                    </div>


                </div>
                :
                <div className="review-panel-display text-center">
                    <p style={{ margin: '20px auto 20px auto', color: 'aqua' }}><NavLink className="no-decor" exact={true} to="/">Add </NavLink>
                        a movie or show to give your recommendations :)</p>
                </div>
            }
        </div>
    )
};

export default Recommend;
