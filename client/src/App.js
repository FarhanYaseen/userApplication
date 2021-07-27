import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard/UserDashboard';
import Login from './components/Login/Login';
import SignUp from './components/Register/SignUp';
import Edit from './components/User/Edit';
import useToken from './useToken';
// import  RequireAuth  from './components/auth/RequireAuth';
import PrivateRoute from './components/auth/PrivateRoute';

function App1() {
  const { token, setToken } = useToken();

  // if(!token) {
  //   return <Login setToken={setToken} />
  // }

  return (
    <div className="wrapper">
      <h1>Application</h1>
      <BrowserRouter>
        <Switch>
          <Route path="/">
            <Login setToken={setToken}/>
          </Route>
          <Route path="/register">
            <SignUp />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
         // {/* <Route path={"/Dashboard"} component={RequireAuth(Dashboard)}/> */}
        </Switch>
      </BrowserRouter>
    </div>
  );
}


function App() {
  // const { token, setToken } = useToken();

  // if(!token) {
  //   return <Login setToken={setToken} />
  // }

  return (
    <div className="wrapper">
         <BrowserRouter>
          {/* <AuthenticationProvider> */}
            <Switch>
                  {/* <PrivateRoute exact path="/update-profile" component={UpdateProfile}/> */}
                  <PrivateRoute exact path="/" component={Dashboard}/>
                  <Route path="/register" component={SignUp}/>
                  <Route path="/login" component={Login}/>
                  <PrivateRoute path="/dashboard" component={Dashboard}/>
                  <PrivateRoute path="/edit/:id" component={Edit}/>

                  {/* <PrivateRoute path="/EditUserInfo/:id" component={EditUserInfo}/> */}
            </Switch>
          {/* </AuthenticationProvider> */}
        </BrowserRouter>
    </div>
  );
}

export default App;