import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import Audience from "./Components/Audience";
import Speaker from "./Components/Speaker";
import Board from "./Components/Board";
import Whoops404 from "./Components/Whoops404";

export default function Router(props) {
  return (
    <Switch>
      <Route path="/" exact render={() => <Audience {...props} />} />
      <Route component={Speaker} path="/speaker" exact />
      <Route component={Board} path="/board" exact />
      <Route component={Whoops404} />
    </Switch>
  );
}
