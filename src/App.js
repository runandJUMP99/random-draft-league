import React, {useEffect, Suspense} from "react";
import {useDispatch, useSelector} from "react-redux";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import firebase from "firebase";

import Account from "./components/Account/Account";
import Layout from "./components/Layout";
import Login from "./components/Login/Login";
import GlobalLoader from "./components/UI/GlobalLoader/GlobalLoader";
import SubmitSelections from"./components/SubmitSelections/SubmitSelections";

import {authCheckState} from "./store/actions/auth";
import firebaseConfig from "./services/firebase";

firebase.initializeApp(firebaseConfig);

function App() {
  const userId = useSelector(state => state.auth.userId);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authCheckState());
  }, [dispatch]);

  let routes = (
    <Switch>
      <Route path="/" exact component={SubmitSelections} />
      <Route path="/account" exact component={Account} />
      <Redirect to="/" />
    </Switch>
  );
  
  if (userId === process.env.REACT_APP_FIREBASE_UID1 || userId === process.env.REACT_APP_FIREBASE_UID2) {
    routes = (
      <Switch>
        <Route path="/" exact component={SubmitSelections} />
        <Route path="/account" exact component={Account} />
        <Route path="/draft" exact component={Layout} />
        <Route path="/login" exact component={Login} />
      </Switch>
    );
  }

  return (
    <BrowserRouter>
      <Suspense fallback={GlobalLoader}>
        {routes}
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
