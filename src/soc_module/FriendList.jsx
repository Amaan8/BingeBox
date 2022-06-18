import React, { useRef } from 'react'
import { useState, useEffect } from 'react';
import { auth, db } from '../comps/fire';
import { onSnapshot, collection, doc, setDoc } from 'firebase/firestore';
import './friends.css'
import { useHistory } from 'react-router';
import { reload } from 'firebase/auth';

const FriendList = (props) => {
    const [frndlist, setFrndlist] = useState([]);
    const history = new useHistory();
    const [srch, setsrch] = useState(false);
    const search = useRef();
    const [srchList, setsrchList] = useState(null);

    useEffect(() => {
        function getfrnds() {
            if (frndlist) {
                const colref = collection(db, `${auth.currentUser.email}friends`);
                let values = [];
                onSnapshot(colref, (snap) => {
                    snap.forEach(doc => {
                        let item = doc.id;
                        values.push(item);
                    })
                    setFrndlist(values);
                })
            }
            else setFrndlist([]);
        }
        getfrnds();
    }, []);


    function frndSrch() {
        if (search.current.value) {
            const srch_item = search.current.value;
            if (auth.currentUser.email.substring(0, auth.currentUser.email.indexOf('@')) !== srch_item) {
                const colref = collection(db, 'UserNames');
                let values = [];
                onSnapshot(colref, (snap) => {
                    snap.forEach(doc => {
                        if (doc.id.includes(srch_item)&&doc.id!==auth.currentUser.email) {
                            let item = doc.id;
                            values.push(item);
                        }
                    })
                    setsrchList(values);
                    if (srchList) setsrch(true);
                })
            }
            else alert("You can't search yourself ;)");
        }
        
    }
    function addFrnd(frnd_id) {

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
        <div className='container-fluid frnd-list-panel'>
            <div className="d-flex search-bar" style={{ width: '90%' }}>
                <div className="form-item w-100" style={{ minWidth: '35%' }}>
                    <input type="search" ref={search} name="frndsearch" className="form-control search-box" placeholder="Type a User name " onBlur={(e) => { e.persist(); e.preventDefault(); }} />
                    <span onClick={() => { frndSrch() }}>
                        <svg style={{ marginRight: '2%' }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="aqua" class="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                        </svg>
                    </span>

                </div>
            </div>

            <h4>{props.sendRec ? "Recommend to " : srch ? "Search Results " : "Your Friends"}</h4>
            {srch? 
                <><button className='btn btn-sm btn-danger' onClick={()=>{setsrch(false);}} style={{marginLeft:'70%'}}>X Close</button>
                {srchList.map(user=> {
                    return(
                        <div className="container-fluid frnd-list-item">
                        <h5 style={{ cursor: 'pointer', margin: '4px' }}><svg style={{ margin: '2px' }} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="aqua" class="bi bi-person-circle" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                        </svg>{user.substring(0,user.indexOf('@'))}</h5>

                        {/*check if user is sending recommendations and change the friend list options*/}
                            <button onClick={() => { addFrnd(user);}}
                                style={{ width: '40px', height: '30px' }} className='frnd-btn'>+ Add</button>
                        
                    </div>
                    )
                })}
                </>
            :
            frndlist?.map(frnd => {
                return (
                    <div className="container-fluid frnd-list-item">
                        <h5 style={{ cursor: 'pointer', margin: '4px' }}><svg style={{ margin: '2px' }} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="aqua" class="bi bi-person-circle" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                        </svg>{frnd}</h5>

                        {/*check if user is sending recommendations and change the friend list options*/}
                        {props.sendRec ?
                            <button onClick={() => { props.setSendId(frnd); props.setShowMsg(true); }}
                                style={{ width: '40px', height: '30px' }} className='frnd-btn'><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-send-plus-fill" viewBox="0 0 16 16">
                                    <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 1.59 2.498C8 14 8 13 8 12.5a4.5 4.5 0 0 1 5.026-4.47L15.964.686Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
                                    <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-3.5-2a.5.5 0 0 0-.5.5v1h-1a.5.5 0 0 0 0 1h1v1a.5.5 0 0 0 1 0v-1h1a.5.5 0 0 0 0-1h-1v-1a.5.5 0 0 0-.5-.5Z" />
                                </svg></button>
                            :
                            <button onClick={() => { props.setSendId(frnd); props.setShowMsg(true); }} style={{ width: '40px', height: '30px' }} className='frnd-btn'><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-chat-dots-fill" viewBox="0 0 16 16">
                                <path d="M16 8c0 3.866-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM5 8a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                            </svg></button>
                        }
                    </div>
                )
            })
            }
        </div>
    )
};

export default FriendList;