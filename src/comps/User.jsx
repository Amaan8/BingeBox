import React from 'react'
import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup } from '@firebase/auth';
import { auth, db } from './fire';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import './user.css'
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router';

const User = () => {
    const [user, setUser] = useState('');
    const [email, setMail] = useState('');
    const [pass, setPass] = useState('');
    const [showpass, setShowpass] = useState(false);
    const history = useHistory();

    const [hasAccount, sethasAccount] = useState(true);
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
        prompt: 'select_account'
    });

    onAuthStateChanged(auth, (currentuser) => { setUser(currentuser) });

    const handleGoogleLogin = async () => {
        await signInWithPopup(auth, provider)
            .then((result) => {
                console.log(GoogleAuthProvider.credentialFromResult(result));
                console.log(result.user.email)
                history.push("/")
                
            })
            .catch((error) => {

            })

    }
    const handlesignup = async () => {

        await createUserWithEmailAndPassword(auth, email, pass)
            .then((authuser) => { console.log(authuser) })
            .catch((err) => {

                alert(err.message);
            })
        const docref = doc(db, 'UserNames', `${email}`);
        const created = {
            createdAt: Timestamp.now().toDate()
        }
        setDoc(docref, created);
    }

    const handlelogin = async () => {
        await signInWithEmailAndPassword(auth, email, pass)
            .then((authuser) => { console.log(authuser) })
            .catch((err) => {
                alert(err.message);
            })
    }


    function togglePass() {
        if (showpass) {
            setShowpass(false);
        }
        else setShowpass(true);
    }

    return (
        <div className="container-fluid user-screen">
            <div className="row">
                <div className="col-lg-4 col-md-3 col-sm-2">
                </div>
                <div className="col-lg-4 col-md-6 col-sm-8">
                    <div className="container-fluid user-panel text-center">
                        {hasAccount ?
                            <>
                                <h3 className="text-center my-2">Sign In</h3>
                                <form>
                                    <div className="form-item my-4">
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="aqua" class="bi bi-envelope" viewBox="0 0 16 16">
                                                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z" />
                                            </svg>
                                        </span>
                                        <input className="form-control user-form-input" type="text" name="email" placeholder="Email" onChange={(e) => { setMail(e.target.value) }} />
                                    </div>

                                    <div className="form-item">
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="aqua" class="bi bi-key" viewBox="0 0 16 16">
                                                <path d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8zm4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5z" />
                                                <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                                            </svg>
                                        </span>
                                        <input className="form-control user-form-input" type={showpass ? "text" : "password"} name="pass" placeholder="Password" onChange={(e) => { setPass(e.target.value) }} />
                                    </div>
                                    <div style={{ margin: "4px", color: "aqua" }}>
                                        <input type="checkbox" onClick={() => { togglePass() }} /> Show Password
                                    </div>
                                </form>
                                <NavLink exact={true} to='/'><button className="submit-btn" onClick={handlelogin}>Sign in</button></NavLink>
                                <p className="text-center my-4">Don't have an account? <button className="btn btn-sm btn-success" onClick={() => { sethasAccount(false) }}>Sign Up</button></p>
                                <p className='text-center my-4'><button className='sign-in-btn' onClick={()=>{handleGoogleLogin()}}>SignIn with google: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-google" viewBox="0 0 16 16">
                                    <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                                </svg></button></p>
                            </>
                            :
                            <>
                                <h3 className="text-center my-2">Sign Up</h3>
                                <form>
                                    <div className="form-item my-4">
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="aqua" class="bi bi-envelope" viewBox="0 0 16 16">
                                                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z" />
                                            </svg>
                                        </span>
                                        <input className="form-control user-form-input" type="text" name="email" placeholder="Email" onChange={(e) => { setMail(e.target.value) }} />
                                    </div>

                                    <div className="form-item">
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="aqua" class="bi bi-key" viewBox="0 0 16 16">
                                                <path d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8zm4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5z" />
                                                <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                                            </svg>
                                        </span>
                                        <input className="form-control user-form-input" type={showpass ? "text" : "password"} name="pass" placeholder="Password" onChange={(e) => { setPass(e.target.value) }} />
                                    </div>
                                    <div style={{ margin: "4px", color: "aqua" }}>
                                        <input type="checkbox" onClick={() => { togglePass() }} /> Show Password
                                    </div>
                                </form>
                                <NavLink exact={true} to='/'> <button className="submit-btn" onClick={handlesignup}>Sign Up</button></NavLink>
                                <p className="text-center my-4">Already have an account? <button className="btn btn-sm btn-success" onClick={() => { sethasAccount(true) }}>Login</button></p>
                                <p className='text-center my-4'><button className='sign-in-btn' onClick={()=>{handleGoogleLogin()}}>SignIn with google: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-google" viewBox="0 0 16 16">
                                    <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                                </svg></button></p>
                            </>

                        }

                    </div>
                </div>
            </div>
        </div>
    )
}
export default User;