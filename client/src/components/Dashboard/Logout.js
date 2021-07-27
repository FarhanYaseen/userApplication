import React from 'react';
import { Button } from '@material-ui/core';
import useToken from '../../useToken';
import { useHistory } from 'react-router-dom';
import './dashboard.css'

const Header = () => {
  const history = useHistory();
  const { token, logout } = useToken();
  const handleClick = () => {
    logout();
    return history.push("/login")
  }
  if (token) {
    return (<div className="container">
      <Button onClick={handleClick} >Log Out</Button>
    </div>)
  } else {
    return <></>
  }
}
export default Header;