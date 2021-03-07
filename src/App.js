import React, {useEffect, Suspense} from "react";
import {useDispatch, useSelector} from "react-redux";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";

import Account from "./components/Account/Account";
import Admin from "./components/Admin/Admin";
import Layout from "./components/Layout";
import GlobalLoader from "./components/UI/GlobalLoader/GlobalLoader";
import SubmitSelections from"./components/SubmitSelections/SubmitSelections";

import {authCheckState} from "./store/actions/auth";
import firebase from "./services/firebase";

// const Admin = React.lazy(() => {
//   return import("./components/Admin/Admin");
// });

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
        <Route path="/admin" exact component={Admin} />
        <Route path="/draft" exact component={Layout} />
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
