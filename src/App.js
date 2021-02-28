import React, {useEffect, Suspense} from "react";
import {useDispatch, useSelector} from "react-redux";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";

<<<<<<< HEAD
=======
import Account from "./components/Account/Account";
>>>>>>> 051b96770fe30234d46f3206669c545318649b39
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
<<<<<<< HEAD
      <Route path="/login" component={Login} />
      <Route path="/submit" component={SubmitSelections} />
      <Redirect to="/login" />
=======
      <Route path="/" exact component={SubmitSelections} />
      <Route path="/account" exact component={Account} />
      <Redirect to="/" />
>>>>>>> 051b96770fe30234d46f3206669c545318649b39
    </Switch>
  );
  
  if (userId === process.env.REACT_APP_FIREBASE_UID1 || userId === process.env.REACT_APP_FIREBASE_UID2) {
    routes = (
      <Switch>
<<<<<<< HEAD
        <Route path="/" exact component={Layout} />
        <Route path="/admin" component={Admin} />
        <Route path="/login" component={Login} />
        <Route path="/submit" component={SubmitSelections} />
=======
        <Route path="/" exact component={SubmitSelections} />
        <Route path="/account" exact component={Account} />
        <Route path="/admin" exact component={Admin} />
        <Route path="/draft" exact component={Layout} />
>>>>>>> 051b96770fe30234d46f3206669c545318649b39
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
