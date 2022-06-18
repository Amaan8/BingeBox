import FriendList from './FriendList';
import Recommend from './Recommend';
import ChatBoard from './ChatBoard';
import { useState, useEffect } from 'react';
import { getDocs, orderBy, limit, query, collection, onSnapshot} from 'firebase/firestore';
import { auth, db } from '../comps/fire';

const Friends = (props) => {

  const [sendItem, setSendItem] = useState({});
  const [sendRec, setSendRec] = useState(false); //to check if user is sending a recommendation
  const [sendId, setSendId] = useState('');
  const [showMsg, setShowMsg] = useState(false);
  const [msgList, setmsgList] = useState([]);
  const [msgSync, setmsgSync] = useState(false);

  async function syncMsg() {
    const colref = collection(db, `${sendId}messages`);
    onSnapshot(colref, (snap)=>{
      if(snap){
        setmsgSync(true);
      }
      else setmsgSync(false);
    })
  }
  async function getMsg() {
    if (msgList) {
      const colref = collection(db, `${sendId}messages`);
      let values = [];
      onSnapshot(colref, snap=>{
        snap.forEach(doc=>{
          if(doc.data().id==`${auth.currentUser.email.substring(0,auth.currentUser.email.indexOf('@'))}`){
          let item = {
            id: doc.id,
            createdAt: doc.data().createdAt, 
            msg: doc.data().msg,
            status: doc.data().status,
            recom: doc.data().recom,
          }
          values.push(item)
        }
        
        })
        setmsgList(values);
      
      })
    }
    else setmsgList([]);

    //for scrolling to the newest msg
    let scroll_elem = document.getElementById('msgElement');
    scroll_elem?.scrollBy(0,100,{ behavior: 'smooth', });
   
  }
  useEffect(()=>{
    getMsg();
  }, [sendId],[msgSync]);

  useEffect(()=>{
    syncMsg();
  }, [])

 
  return (
    <div className='container-fluid frnd-main-panel'>
      <FriendList sendRec={sendRec} setSendRec={setSendRec} setSendId={setSendId} setShowMsg = {setShowMsg}/>
      <div style={{float:'left', margin:'5px', width:'70%'}}>
        <Recommend recom={props.recom} setRecom={props.setRecom} setSendItem={setSendItem} setSendRec={setSendRec} />
        <h4>Chat Board</h4>
        <ChatBoard msgList = {msgList} getMsg={getMsg} sendId={sendId} sendRecom = {sendItem} setRecom={setSendItem} remRecom = {props.setRecom} showMsg={showMsg} setShowMsg={setShowMsg}/>
      </div>
    </div>
  )
};

export default Friends;