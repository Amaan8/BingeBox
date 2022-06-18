import React from 'react'
import { useState, useEffect } from 'react'
import { auth, db } from './fire';
import { onSnapshot, doc, setDoc, collection, deleteDoc, orderBy, query, getDocs, limit } from '@firebase/firestore';
import './review.css'
import { produceWithPatches } from '@reduxjs/toolkit/node_modules/immer';


const ProfileReviews = (props) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        getReviews();
    }, [props.setShowrev]);

    async function getReviews() {
        const colref = collection(db, "Reviews")
        let values = []

        onSnapshot(colref, (snap) => {

            snap.forEach(doc => {
            
                if (doc.data().id === auth.currentUser.email) {
                    let item = {
                        id: doc.data().id,
                        for: doc.data().for,
                        rated: doc.data().rated,
                        review: doc.data().review
                    }
                    values.push(item)
                    
                }
             
            })
            setItems(values);

        });

    }

    function deleteRev(id) {
        const docref = doc(db, "Reviews", `${auth.currentUser.email}${id}`)
        deleteDoc(docref);
        getReviews();
    }


    return (
        <div className="container-fluid">
            <button className="btn btn-sm btn-danger" style={{float:'right', margin:'8px 30px 8px 30px'}} onClick={()=>{props.setShowrev(false)}}>Close X</button>
            <h2 className="review-heading" style={{marginTop:'10px'}}>Your Reviews</h2>
            <div className="container-fluid review-panel-display">

                {items.map((rev, i) => {

                    return (
                        <>
                            <div className="row">
                                <div className="col-xs-12 col-lg-6">


                                    <h5 className="review-item-heading">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="aqua" class="bi bi-person-circle" viewBox="0 0 16 16">
                                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                                        </svg> {rev.id.substring(0, rev.id.indexOf('@')) /*for user name */}

                                    </h5>

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
                }

            </div>
        </div>
    )
}

export default ProfileReviews;