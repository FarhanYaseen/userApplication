import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';

import './Login.css';
import useToken from './../../useToken';


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

export default function Login() {
  const classes = useStyles();

  const history = useHistory();
  const { setToken } = useToken();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(null);

  const showError = () => <Alert severity="error">{error}</Alert>


  async function loginUser(credentials) {
    var config = {
      method: 'post',
      url: 'http://localhost:8080/app/signin',
      headers: {
        'Content-Type': 'application/json'
      },
      data: credentials
    };

    try {
      const { data } = await axios(config);
      const { accessToken } = data;
      setError(null);

      return accessToken;
    } catch (err) {
      const { message } = err.response.data;
      console.log(err.response);
      setError(message);
    }
  }
  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      email,
      password
    });
    if (token) {
      setToken(token);
      history.push("/dashboard")
    }
  }

  return (
    <div className="login-wrapper">
      <h1>Log In</h1>
      <form className={classes.root} onSubmit={handleSubmit}>
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
            LogIn
          </Button>
        </div>
      </form>
      <div>
        <button onClick={() => history.push("/register")}>Register</button>
      </div>
      {error ? showError() : ""}

    </div>
  )
}