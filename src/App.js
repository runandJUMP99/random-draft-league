import React, {useEffect, Suspense} from "react";
import {useDispatch, useSelector} from "react-redux";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import firebase from "firebase";

import Layout from "./components/Layout";
import Login from "./components/Login/Login";
import Spinner from "./components/UI/Spinner/Spinner";
import SubmitSelections from"./components/SubmitSelections/SubmitSelections";

import {authCheckState} from "./store/actions/auth";
import firebaseConfig from "./services/firebase";

firebase.initializeApp(firebaseConfig);

function App() {
  const isAuthenticated = useSelector(state => state.auth.token !== null);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(authCheckState());
  }, [dispatch]);

  let routes = (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/submit" component={SubmitSelections} />
      <Redirect to="/login" />
    </Switch>
  );
  
  if (isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/" exact component={Layout} />
        <Route path="/login" component={Login} />
        <Route path="/submit" component={SubmitSelections} />
      </Switch>
    );
  }

  return (
    <BrowserRouter>
      <Suspense fallback={Spinner}>
        {routes}
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
