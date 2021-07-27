
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import './SignUp.css';
import useToken from './../../useToken';

async function registerUser(credentials) {
  var config = {
    method: 'post',
    url: 'http://localhost:8080/app/signup',
    headers: {
      'Content-Type': 'application/json'
    },
    data: credentials
  };

  try {
    const { data } = await axios(config);
    const { accessToken } = data;
    return accessToken;
  } catch (err) {
    console.error(err);
  }
}


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),

    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '300px',
    },
    '& .MuiButtonBase-root': {
      margin: theme.spacing(2),
    },
  },
}));


export default function SignUp() {
  const classes = useStyles();

  const history = useHistory();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const { setToken } = useToken();


  const handleSubmit = async e => {
    e.preventDefault();
    const token = await registerUser({
      email,
      password,
      lastName,
      firstName,
    });
    setToken(token);
    history.push("/dashboard")
  }

  return (
    <div className="signup-wrapper">
      <form className={classes.root} onSubmit={handleSubmit}>
      <TextField
        label="First Name"
        variant="filled"
        required
        value={firstName}
        onChange={e => setFirstName(e.target.value)}
      />
      <TextField
        label="Last Name"
        variant="filled"
        required
        value={lastName}
        onChange={e => setLastName(e.target.value)}
      />
      <TextField
        label="Email"
        variant="filled"
        type="email"
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        variant="filled"
        type="password"
        required
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <div>
        <Button type="submit" variant="contained" color="primary">
          Register
        </Button>
      </div>
    </form>
      <div>
         <button onClick={()=> history.push("/login")}>Login</button>
      </div>

    </div>
  )
}
