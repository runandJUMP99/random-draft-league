import React, {useEffect, Suspense} from "react";
import {useDispatch, useSelector} from "react-redux";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";

import Layout from "./components/Layout";
import Login from "./components/Login/Login";
import SubmitSelections from"./components/SubmitSelections/SubmitSelections";

import {authCheckState} from "./store/actions/auth";

function App() {
  const isAuthenticated = useSelector(state => state.auth.token !== null);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(authCheckState());
  }, [dispatch]);

  let routes = (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/submitselections" component={SubmitSelections} />
      <Redirect to="/login" />
    </Switch>
  );

  if (isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/" exact component={Layout} />
        <Route path="/login" component={Login} />
        <Route path="/submitselections" component={SubmitSelections} />
      </Switch>
    );
  }

  return (
    <BrowserRouter>
      <Suspense fallback="Loading...">
        {routes}
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
