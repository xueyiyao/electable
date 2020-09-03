import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";

import Header from "./layout/Header";
import Dashboard from "./elections/Dashboard";

import { Provider } from "react-redux";
import store from "../store";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import About from "./About";
import OfficeDetails from "./details/OfficeDetails";
import CandidatesDetails from "./details/CandidateDetails";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Fragment>
          <Header />
          <Switch>
            <Route path="/about">
              <div className="container">
                <About />
              </div>
            </Route>
            <Route path="/off/:slug/:id">
              <div className="container">
                <OfficeDetails />
              </div>
            </Route>
            <Route path="/cand/:slug/:id">
              <div className="container">
                <CandidatesDetails />
              </div>
            </Route>
            <Route path="/">
              <div className="container">
                <Dashboard />
              </div>
            </Route>
          </Switch>
        </Fragment>
      </Provider>
    );
  }
}

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("app")
);
