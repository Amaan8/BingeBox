import React, { useEffect, useState } from 'react'
import './Profile.css'
import { auth, db } from './fire'
import { collection, deleteDoc, doc, onSnapshot, setDoc, updateDoc } from '@firebase/firestore';
import { NavLink } from 'react-router-dom';
import { deleteUser } from '@firebase/auth';
import User from './User';
import { useHistory } from 'react-router';
import ProfileReviews from './ProfileReviews';

export const Profile = (props) => {
    const [listcount, setListcount] = useState(0);
    const [revcount, setrevcount] = useState(0);
    const [reqcount, setReqcount] = useState(0);
    const [showrev, setShowrev] = useState(false);
    const [showfrnds, setShowfrnds] = useState(false);
    const [accepted, setAccepted] = useState(false);
    const [declined, setDeclined] = useState(false);
    const [frnd_count, setFrndcount] = useState(0);

    const [reqlist, setReqlist] = useState([]);

    const history = useHistory();

    useEffect(() => {


        function countList() {
            const colref = collection(db, `${auth.currentUser.email}`);
            onSnapshot(colref, (snap) => {
                let count = 0
                snap.forEach(doc => {
                    if (doc.id != "ListName") {
                        count = count + 1;
                    }
                })
                setListcount(count);
            })
        }


        function countRev() {
            const colref = collection(db, "Reviews");
            onSnapshot(colref, (snap) => {
                let count = 0
                snap.forEach(doc => {
                    if (doc.id.substring(0, doc.id.indexOf('@')) == auth.currentUser.email.substring(0, auth.currentUser.email.indexOf('@'))) {
                        count = count + 1;
                    }
                })
                setrevcount(count);
            })
        }


        //set frnd request list

        function frndRequests() {
            if (reqlist) {
                const colref = collection(db, `${auth.currentUser.email}requests`);
                let values = [];
                onSnapshot(colref, (snap) => {
                    snap.forEach(doc => {
                        if (doc.data().status == "Pending") {
                            let item = doc.id;

                            values.push(item);
                        }
                    })
                    setReqlist(values);
                })
            }
            else setReqlist([]);
        }

        //count the number of friend requests for the user whenever the page loads

        function countRequests() {

            if (auth.currentUser) {
                const colref = collection(db, `${auth.currentUser?.email}requests`)
                let count = 0;
                onSnapshot(colref, (snap) => {
                    snap.forEach(doc => {
                       
                        if (doc.data().status == "Pending") {
                            count = count + 1;
                        }
                        setReqcount(count);
                    })
                    if (reqcount > 0) props.setNotif(true);
                    else props.setNotif(false);
                    
                })
            }
        }

        countList();
        countRev();
        countRequests();
        frndRequests();
        setAccepted(false);
        setDeclined(false);
    }, [])

    function delAcc() {
        const user = auth.currentUser;
        if (prompt("Enter your email to confirm deletion!") == user?.email) {
            deleteUser(user).then(() => { alert("Your account has been deleted!!"); handleSignout(); })


        }
        else alert("Deletion not confirmed!");
    }

    function handleSignout() {
        auth.signOut();
        history.push('/');
    }




    //accept and add friend to friends collection

    function acceptFrnd(frnd) {

    

        const docref = doc(db, `${auth.currentUser.email}friends`, `${frnd.substring(0,frnd.indexOf('@'))}`);
        const frnd_docref = doc(db, `${frnd}friends`, `${auth.currentUser.email.substring(0,auth.currentUser.email.indexOf('@'))}`);
        
        let frnd_item = {
            accepted: Date.now(),
        }
        
        setDoc(docref, frnd_item); //added friend to collection
        setDoc(frnd_docref, frnd_item); //add friend to senders collection

        const updateDocref = doc(db, `${auth.currentUser.email}requests`, `${frnd}`);
        let updateData = {
            accepted: Date.now(),
            status: 'Accepted'
        }
        
        updateDoc(updateDocref, updateData); //update the record in the requests collection

        alert("Added " + `${frnd.substring(0, frnd.indexOf('@'))}`)
        setFrndcount(frnd_count + 1);
        setReqlist(reqlist.filter(item => item != frnd));
        history.push('/profile');
    }

    //reject frnd request and update requests collection

    function rejectFrnd(frnd) {

        const updateDocref = doc(db, `${auth.currentUser.email}requests`, `${frnd}`);
        deleteDoc(updateDocref);
        alert("Rejected " + `${frnd.substring(0, frnd.indexOf('@'))}`)
        setReqlist(reqlist.filter(item => item != frnd));

    }

    return (
        <>
            {auth.currentUser ?

                <div className="container-fluid profile-panel">
                    <div className="profile-img" />
                    <p className="profile-info">{auth.currentUser?.email}</p>
                    <p className="profile-info">Watchlist Items : {listcount}</p>
                    <p className="profile-info">Review Posts : {revcount} <button onClick={() => { setShowrev(true) }} className="profile-btn" style={{ width: '70px', height: '30px' }}>
                        View</button></p>
                    <p className="profile-info">Friend Requests : {reqcount} <button onClick={() => { setShowfrnds(true) }} className="profile-btn" style={{ width: '70px', height: '30px' }}>
                        View</button></p>

                    <button className="profile-btn" onClick={() => { delAcc() }}> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                    </svg> Delete Account</button>

                </div>


                :
                <User></User>
            }
            {showrev ?
                <ProfileReviews setShowrev={setShowrev} />
                : <></>}


            {//check if there are friend requests in user collection and show the requests panel

            showfrnds ?
                reqlist?.map(frnd => {
                    return (
                        <>
                        <div className=" container-fluid profile-frnd-panel">
                        <button className="btn btn-sm btn-danger" style={{float:'right', margin:'8px 30px 8px 30px'}} onClick={()=>{setShowfrnds(false)}}>Close X</button>
                        
                            <h4>Requests</h4>
                            <div className="profile-frnd-item">
                                <h5><svg style={{ margin: '2px' }} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="aqua" class="bi bi-person-circle" viewBox="0 0 16 16">
                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                    <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                                </svg>{frnd.substring(0,frnd.indexOf('@'))}</h5>
                                <div>
                                    {!accepted && !declined ?
                                        <>
                                            <button className='profile-btn' style={{ width: '90px', height: '30px' }} onClick={() => { setAccepted(true); acceptFrnd(frnd); }}>Accept</button>
                                            <button className='profile-btn' style={{ width: '90px', height: '30px' }} onClick={() => { setDeclined(true); rejectFrnd(frnd); }}>Decline</button>
                                        </>
                                        :
                                        <button className='profile-btn' style={{ width: '90px', height: '30px', backgroundColor: 'crimson', color: 'white' }} disabled>{!declined ? 'Accepted' : 'Declined'}</button>}
                                </div>

                            </div>
                        </div>
                        </>
                    )
                })
                :
                <></>
            }

        </>
    );
};
