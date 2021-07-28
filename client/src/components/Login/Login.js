import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import './Login.css';
import useToken from './../../useToken';

import { loginUser } from '../../APIHandler';

import ErrorBox from '../Error';
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

  const handleSubmit = async e => {
    e.preventDefault();
    const { data, error } = await loginUser({ email, password });
    if (error) {
      const message = error.response.data.message;
      return setError(message);
    }
    const { accessToken } = data;
    setToken(accessToken);
    setError(null);
    return history.push("/dashboard")
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
          value={email || ''}
          onChange={e => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          variant="filled"
          type="password"
          required
          value={password || ''}
          onChange={e => setPassword(e.target.value)}
        />
        <div>
          <Button type="submit" variant="contained" color="primary">
            LogIn
          </Button>
        </div>
      </form>
      <div>
        <Link
          component="button"
          variant="body2"
          onClick={() => history.push("/register")}
        >
          {`Register?`}
        </Link>
      </div>
      {error && <ErrorBox error={error} />}
    </div>
  )
}