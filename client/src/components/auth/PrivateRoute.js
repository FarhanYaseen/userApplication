import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import useToken from './../../useToken';

export default function PrivateRoute({ component: Component, ...rest }) {
  const { token  } = useToken();
  return (
    <Route
      {...rest}
      render={props => {
        return token ? <Component {...props} /> : <Redirect to="/login" />
      }}
    ></Route>
  )
}
