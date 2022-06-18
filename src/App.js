import React, { useState, useEffect } from 'react';
import Create from './comps/Create';
import Header from './comps/header';
import Footer from './comps/footer';
import Home from './comps/Home';
import User from './comps/User';
import SearchResults from './comps/SearchResults';
import Share from './comps/Share';
import About from './comps/about';
import Contact from './comps/contact';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { auth, db } from './comps/fire';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/Slice';
import store from './features/Store'
import { Profile } from './comps/Profile';
import Music from './aud_module/Music';
import { onSnapshot, collection } from 'firebase/firestore';
import Friends from './soc_module/Friends';

export const AppWrapper = () => {


  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

const App = () => {

  const [searchval, setSearchval] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [notif, setNotif] = useState(false);
  const [review, setReview] = useState(null);
  
  const dispatch = useDispatch()
  const user = useSelector(selectUser);
  useEffect(() => {
    const logstate = auth.onAuthStateChanged(UserAuth => {
      if (UserAuth) {
        dispatch(login({
          uid: UserAuth.uid,
          email: UserAuth.email
        }))
      } else {
        dispatch(logout);
      }
    })

    return logstate;

  }, [])


  

  return (
    <>
      <BrowserRouter>
        <Header setSearchval={setSearchval} user={user} notif={notif} />
        <Switch>

          <Route exact path="/create">{favorites && <Create favorites={favorites} user={user} />}</Route>
          <Route exact path="/User"><User /></Route>
          <Route exact path="/Search">{searchval && <SearchResults searchval={searchval} favorites={favorites}
            setFavorites={setFavorites} setSearchval={setSearchval} setReview={setReview} />}</Route>
          <Route exact path="/"><Home favorites={favorites} setFavorites={setFavorites} setSelectRev={setReview}/></Route>
          <Route exact path="/profile"><Profile user={user} setNotif={setNotif} /></Route>
          <Route exact path="/about"><About /></Route>
          <Route exact path="/contact"><Contact /></Route>
          <Route exact path="/share"><Share movie={review} setMovie={setReview} /></Route>
          <Route exact path="/muse"><Music /></Route>
        </Switch>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;