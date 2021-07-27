import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard/UserDashboard';
import Login from './components/Login/Login';
import SignUp from './components/Register/SignUp';
import Edit from './components/User/Edit';
import PrivateRoute from './components/auth/PrivateRoute';


function App() {
  return (
    <div className="wrapper">
         <BrowserRouter>
            <Switch>
                  <PrivateRoute exact path="/" component={Dashboard}/>
                  <Route path="/register" component={SignUp}/>
                  <Route path="/login" component={Login}/>
                  <PrivateRoute path="/dashboard" component={Dashboard}/>
                  <PrivateRoute path="/edit/:id" component={Edit}/>
            </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;