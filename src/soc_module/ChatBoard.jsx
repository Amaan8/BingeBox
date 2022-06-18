import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { auth, db } from '../comps/fire';
import '../comps/review.css'
import { setDoc, doc, Timestamp, deleteDoc, collection, onSnapshot } from 'firebase/firestore';

const ChatBoard = (props) => {
  const [msg, setMsg] = useState(null);
  const [msgItem, setMsgItem] = useState(null);
  const [r_msgItem, setr_MsgItem] = useState(null);
  const msgInput = useRef();

  //create a msg body and send it(create a document entry in firestore for user messages)
  async function sendMsg() {
    let Item;
    let r_Item;
    //check if a normal chat
    if (msg) {

      Item = {


        atTime: Timestamp.now(),
        id: auth.currentUser.email.substring(0,auth.currentUser.email.indexOf('@')),
        createdAt: new Intl.DateTimeFormat('en-US', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(Date.now()).toString(),
        msg: msg,
        status: 'sent',
        recom: false,

      };

      r_Item = {

        atTime: Timestamp.now(),
        id: auth.currentUser.email.substring(0,auth.currentUser.email.indexOf('@')),
        createdAt: new Intl.DateTimeFormat('en-US', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(Date.now()).toString(),
        msg: msg,
        status: 'received',
        recom: false,
      };
      setMsg(null);
    }

    //check if recommendation
    else if (props.sendRecom) {

      msgInput.current.value = "Send Recommendation -->";
      Item = {
        atTime: Timestamp.now(),
        id: auth.currentUser.email.substring(0,auth.currentUser.email.indexOf('@')),
        createdAt: new Intl.DateTimeFormat('en-US', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(Date.now()).toString(),
        msg: props.sendRecom,
        status: 'sent',
        recom: true,
      };

      r_Item = {

        atTime: Timestamp.now(),
        id: auth.currentUser.email.substring(0,auth.currentUser.email.indexOf('@')),
        createdAt: new Intl.DateTimeFormat('en-US', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(Date.now()).toString(),
        msg: props.sendRecom,
        status: 'received',
        recom: true,
      };

    }

    setMsgItem(Item);
    setr_MsgItem(r_Item);

    const docref = doc(db, `${auth.currentUser.email.substring(0, auth.currentUser.email.indexOf('@'))}messages`, `${props.sendId + Date.now()}`);
    const r_docref = doc(db, `${props.sendId}messages`, `${auth.currentUser.email.substring(0, auth.currentUser.email.indexOf('@')) + Date.now()}`);
   
    if (msgItem && r_msgItem) {
      await setDoc(r_docref, r_msgItem);
      await setDoc(docref, msgItem);
      setMsgItem(null);
      setr_MsgItem(null);

    }
    msgInput.current.value = "";
    props.setRecom(null);
    props.remRecom(null);

    props.getMsg();
  }

  //delete a message entry'

  function delMsg(id, time) {
    const docref = doc(db, `${props.sendId}messages`, `${id}`);
    const colref = collection(db, `${auth.currentUser.email.substring(0,auth.currentUser.email.indexOf('@'))}messages`)
    deleteDoc(docref);
    onSnapshot(colref,(snap)=>{
      snap.forEach(doc=>{
        if(doc.data().createdAt == time){
          let ref = doc(db, `${auth.currentUser.email.substring(0,auth.currentUser.email.indexOf('@'))}messages`, doc.id);
          deleteDoc(ref);
        }
      })
    })
    props.getMsg();
  }


  return (
    <div className='container-fluid frnd-chat-panel' >
      {props.sendId ?
        <>
          <div>
            <h5
              style={
                {
                  borderBottom: '2px aqua solid',
                  borderLeft: '2px aqua solid',
                  margin: '3px',
                  padding: '3px',
                  borderRadius: '4px',
                  backgroundColor: 'black',
                  opacity: '0.6'
                }
              }>
              {props.sendId}</h5>
          </div>

          {/*messaages */}
          <div id='msgElement' className="container-fluid frnd-chat-container">


            {props.msgList?.map(msgItem => {
              return (
                <>
                  <div className={msgItem?.status == 'sent' ? "frnd-chat-item" : "frnd-chat-item-alt"}>
                    {msgItem?.recom && msgItem?.msg ? //send a movie recommendation as a msg
                      <>
                        <div className='chat-bubble'>


                          <div className="recom-display-item">
                            <img src={msgItem?.msg?.for?.poster_path ? `https://image.tmdb.org/t/p/original${msgItem?.msg?.for.poster_path}` : msgItem?.msg?.for.Poster} className="review-poster" />
                            <div className="review-info">

                              <h6 className="review-info-item">For: {msgItem?.msg?.for?.name || msgItem?.msg?.for.title || msgItem?.msg?.for.Title}</h6>

                              <h6 className="review-info-item">Rated:
                                &nbsp;
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                </svg> {msgItem?.msg?.rated}</h6>

                              <h6 className="review-info-item">Review : {msgItem.msg?.review}</h6>
                              <a href={`https://google.com/search?q=watch+${msgItem?.msg.for.title || msgItem?.msg.for.Title || msgItem?.msg.for.original_title}`} target="#">
                                <button className="standard-btn ml-auto">Watch Now</button>
                              </a>
                              {msgItem.status == 'received' ? //display delete msg button if it is a sent message
                              <button onClick={() => { delMsg(msgItem.id, msgItem.createdAt) }} className='frnd-btn'><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                              </svg></button>
                              : <></>}

                            </div>
                            <div className='msg-misc-details'><span>{msgItem?.createdAt}</span></div>
                          </div>
                        </div>

                      </>
                      :
                      <>
                         
                        <div className='chat-bubble'>
                        {msgItem.status == 'received' ? //display delete msg button if it is a sent message
                              <button onClick={() => { delMsg(msgItem.id) }} style={{ margin: '2px 2px 2px 96%' }} className='frnd-btn'><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                              </svg></button>
                              : <></>}

                          {msgItem.msg}
                        </div>
                       
                          <div className='msg-misc-details'>
                            <span>{msgItem.createdAt}</span>
                          </div>
                      </>
                    }
                  </div>
                </>
              )
            })}
          </div>
          {/*chat box */}
          <div className="conatainer-fluid frnd-chat-input">
            <textarea placeholder='Double click to send -->' cols="100" rows="3" className="form-input chat-input" ref={msgInput} onBlur={(e) => { e.persist(); e.preventDefault(); setMsg(e.target.value) }}></textarea>
            <button onClick={() => {
              sendMsg();
            }} className='frnd-btn' style={{ width: '50px', height: '30px', margin: '4px' }}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-send-plus-fill" viewBox="0 0 16 16">
                <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 1.59 2.498C8 14 8 13 8 12.5a4.5 4.5 0 0 1 5.026-4.47L15.964.686Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
                <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-3.5-2a.5.5 0 0 0-.5.5v1h-1a.5.5 0 0 0 0 1h1v1a.5.5 0 0 0 1 0v-1h1a.5.5 0 0 0 0-1h-1v-1a.5.5 0 0 0-.5-.5Z" />
              </svg></button>
          </div>

        </>
        :
        <></>
      }

    </div>

  )
};

export default ChatBoard;
