import React from 'react';
import { Redirect } from 'react-router';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

//importing bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

import Blank from "./components/blank.component";
import Landing from "./components/landing-page.component";
import Login from "./components/login.component";
import SignUp from "./components/sign-up.component";
import Order from "./components/order.component";
import View from "./components/view.component";
import Edit from "./components/edit.component";

function App() {
  return (
    <Router>
      <div className="container">
        <br/>
        <Route exact path="/">
          <Redirect to="/landing" /> : <Landing />}
        </Route>
        <Route path="/" component={Blank} />
        <Route path="/landing" component={Landing} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/order" component={Order} />
        <Route path="/view" component={View} />
        <Route path="/edit/:id" component={Edit} />
      </div>
    </Router>
  );
}

export default App;