import React from 'react'
import { useState, useEffect } from 'react';
import { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { auth, db } from './fire';
import { onSnapshot, doc, setDoc, collection, deleteDoc, orderBy, query, getDocs, limit } from '@firebase/firestore';
import './review.css'
import { useHistory } from 'react-router';

const Reviews = (props) => {
    const rating_input = useRef();
    const review_input = useRef();
    const [rated, setRated] = useState();
    const [reviewed, setReviewed] = useState();
    const [review, setReview] = useState();
    const [items, setItems] = useState([]);
    const [srchItem, setsrchItem] = useState([]);
    const [srch, setsrch] = useState(false);
    const history = useHistory();
    const [reqStatus, setReqStatus] = useState(false);

    const search = useRef()
    useEffect(() => {
        getReviews()
    }, [])

    async function getReviews() {
        const colref = collection(db, "Reviews")
        const q = query(colref, orderBy("created", "desc"), limit(20));
        let snap = await getDocs(q);
        let values = [];
        if (snap) {

            snap.forEach((doc, i) => {

                let item = {
                    id: doc.data().id,
                    for: doc.data().for,
                    rated: doc.data().rated,
                    review: doc.data().review,
                    created: doc.data().created
                }
                values.push(item)

            })
            setItems(values)

        }
    }

    function post() {
        const n = /[+-]?([0-9]*[.])?[0-9]+/;
        if (props.movie && auth.currentUser) {
            if (rating_input.current.value != '' && review_input.current.value != '' &&
                n.test(rating_input.current.value) && rating_input.current.value <= 10) {
                const reviewItem = {
                    id: auth.currentUser.email,
                    for: props.movie,
                    rated: rated,
                    review: reviewed,
                    created: Date.now()
                }
                const docref = doc(db, "Reviews", `${auth.currentUser.email}${props.movie.name || props.movie.title || props.movie.original_title || props.movie.Title}`)


                setDoc(docref, reviewItem);
                setReview(reviewItem);
                alert("Review successfully posted!!")
            }
            else alert("Re-enter the rating & review");
        }
        history.push("/share");
        getReviews();
    }

    function deleteRev(id) {
        const docref = doc(db, "Reviews", `${auth.currentUser.email}${id}`)
        deleteDoc(docref);
        history.push("/share")
        getReviews();
    }
    // search for review

    function handleSearch() {
        setsrch(true)
        const colref = collection(db, "Reviews")
        let values = []

        onSnapshot(colref, (snap) => {

            snap.forEach(doc => {

                if (doc.id.substring(doc.id.indexOf('.'), doc.id.length).toLowerCase() == ".com" + search.current.value.toLowerCase()) {
                    let item = {
                        id: doc.data().id,
                        for: doc.data().for,
                        rated: doc.data().rated,
                        review: doc.data().review
                    }
                    values.push(item)
                }
            })
            setsrchItem(values);
        });
        history.push("/share")
    }


    //function to create a friend request collection entry
    function AddFrnd(frnd_id) {

        //check if already a friend
        const colref = collection(db, `${auth.currentUser.email}friends`);
        onSnapshot(colref, (snap) => {
            snap.forEach(doc => {
                if (doc.id == frnd_id.substring(0, frnd_id.indexOf('@'))) {
                    alert(frnd_id.substring(0, frnd_id.indexOf('@')) + "is already a friend!");
                    return
                }
            })
        })

        //check if already requested
        const req_colref = collection(db, `${frnd_id}requests`);
        onSnapshot(req_colref, (snap) => {
            snap.forEach(doc => {
                if (doc.id == auth.currentUser.email.substring(0, auth.currentUser.email.indexOf('@'))) {
                    alert("Already requested!");
                    return
                }
            })
        })
    

    const docref = doc(db, `${frnd_id}requests`, `${auth.currentUser.email}`)

    let requestItem = {
        sent: Date.now(),
        status: 'Pending'
    }
    setDoc(docref, requestItem);
    alert("Sent friend request to " + `${frnd_id.substring(0, frnd_id.indexOf('@'))}`);

}


return (
    <>
        {auth.currentUser ?
            <>

                <h2 className="review-heading">Your Review</h2>
                {props.movie ?
                    <h3 style={{ color: 'aqua', marginTop: '50px' }}>{props.movie?.title || props.movie?.name || props.movie?.original_title || props.movie.Title}</h3>
                    : <></>}

                <div className="container-fluid review-panel">
                    {/*review panel start*/}
                    {props.movie ?

                        <div className="review-content">

                            <div className="home-movie-poster">
                                <img style={{ margin: '10px auto 10px auto' }} src={props.movie.poster_path ? `https://image.tmdb.org/t/p/original${props.movie.poster_path}` : props.movie.Poster} />
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
                                    <button style={{ width: '100px', height: '30px' }} className="review-btn" onClick={() => { post() }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                                        </svg> Post
                                    </button>

                                </div>

                            </div>
                            <div className="row"
                                style={{ float: 'right', color: 'aqua', cursor: 'pointer', margin: '5px', fontSize: '24px' }}
                                onClick={() => { props.setMovie(null) }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="aqua" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                                </svg>
                            </div>


                        </div>

                        :
                        <div className="review-panel-display text-center">
                            <p style={{ margin: '20px auto 20px auto', color: 'aqua' }}><NavLink className="no-decor" exact={true} to="/">Add </NavLink>
                                a movie or show to give your reviews :)</p>
                        </div>
                    }
                </div>
                {/*review panel end*/}

                <h2 style={{ color: 'aqua', margin: '20px' }}>Latest Reviews</h2>
                <div className="d-flex search-bar ms-md-auto mx-4">
                    <div className="form-item w-100">
                        <input type="search" ref={search} className="form-control search-box" placeholder="Type to search" />

                        {/*search in reviews*/}
                        <span onClick={() => { handleSearch() }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="aqua" class="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                            </svg>
                        </span>

                    </div>
                </div>

                {/*review display start*/}

                <div className="container-fluid review-panel-display">
                    {!srch ?
                        <>{
                            items.map((rev, i) => {

                                return (
                                    <>
                                        <div className="row">
                                            <div className="col-xs-12 col-lg-6">


                                                <div style={{ display: 'flex' }}>
                                                    <svg style={{ margin: '2px' }} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="aqua" class="bi bi-person-circle" viewBox="0 0 16 16">
                                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                                        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                                                    </svg>
                                                    <h5 className="review-item-heading">
                                                        {rev.id.substring(0, rev.id.indexOf('@')) /*for user name */}
                                                    </h5>

                                                    {/*option to add a friend if the id is not same as current user*/}
                                                    {(rev.id.substring(0, rev.id.indexOf('@')) != auth.currentUser.email.substring(0, auth.currentUser.email.indexOf('@'))) ?

                                                        <button style={{ width: '120px', margin: '6px' }} className='review-btn' onClick={() => { AddFrnd(rev.id) }}>+ Add Friend</button>

                                                        : <></>}

                                                </div>


                                                <div className="review-display-item">
                                                    <img src={rev.for.poster_path ? `https://image.tmdb.org/t/p/original${rev.for.poster_path}` : rev.for.Poster} className="review-poster" />
                                                    <div className="review-info">

                                                        <h6 className="review-info-item">For: {rev.for.name || rev.for.title || rev.for.Title}</h6>

                                                        <h6 className="review-info-item">Rated:
                                                            &nbsp;
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                                                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                                            </svg> {rev.rated}</h6>

                                                        <h6 className="review-info-item">Review : {rev.review}</h6>

                                                        {auth.currentUser.email == rev.id ?
                                                            <button style={{ width: '140px', margin: '8px 2px 8px 2px' }} onClick={() => { deleteRev(rev.for.name || rev.for.title) }} className="review-btn"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                                            </svg> Delete Review</button>
                                                            : console.log("")
                                                        }
                                                    </div>
                                                </div>


                                            </div>

                                        </div>
                                    </>)

                            })
                        }</>
                        :
                        <>
                            <div className="row"
                                style={{ float: 'right', color: 'aqua', cursor: 'pointer', margin: '5px', fontSize: '24px' }}
                                onClick={() => { setsrch(false) }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="aqua" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                                </svg>
                            </div>

                            {srchItem.map((rev, i) => {


                                return (
                                    <>
                                        <div className="review-flex-panel">

                                            <div style={{ display: 'flex' }}>
                                                <svg style={{ margin: '2px' }} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="aqua" class="bi bi-person-circle" viewBox="0 0 16 16">
                                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                                    <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                                                </svg>
                                                <h5 className="review-item-heading">
                                                    {rev.id.substring(0, rev.id.indexOf('@')) /*for user name */}
                                                </h5>

                                                {/*option to add a friend if the id is not same as current user*/}
                                                {(rev.id.substring(0, rev.id.indexOf('@')) != auth.currentUser.email.substring(0, auth.currentUser.email.indexOf('@'))) ?

                                                    <button style={{ width: '120px', margin: '6px' }} className='review-btn' onClick={() => { AddFrnd(rev.id) }}>+ Add Friend</button>

                                                    : <></>}

                                            </div>


                                            <div className="review-display-item">
                                                <img src={rev.for.poster_path ? `https://image.tmdb.org/t/p/original${rev.for.poster_path}` : rev.for.Poster} className="review-poster" />
                                                <div className="review-info">

                                                    <h6 className="review-info-item">For: {rev.for.name || rev.for.title || rev.for.Title}</h6>

                                                    <h6 className="review-info-item">Rated:
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                                                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                                        </svg> {rev.rated}</h6>

                                                    <h6 className="review-info-item">Review : {rev.review}</h6>

                                                    {auth.currentUser.email == rev.id ?
                                                        <button style={{ width: '140px', margin: '8px 2px 8px 2px' }} onClick={() => { deleteRev(rev.for.name || rev.for.title) }} className="review-btn"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                                        </svg> Delete Review</button>
                                                        : console.log("")
                                                    }
                                                </div>
                                            </div>

                                        </div>
                                    </>)
                            })
                            }
                        </>
                    }
                </div>
                {/*review display end*/}

            </>
            :
            <div className="review-panel-display text-center" style={{ marginTop: '90px', marginBottom: '29%' }} >
                <p style={{ margin: '20px auto 20px auto', color: 'aqua' }}><NavLink className="no-decor" exact={true} to="/User">Sign In </NavLink>
                    to give your reviews and share with friends :)</p>
            </div>

        }

    </>

);
};
export default Reviews;