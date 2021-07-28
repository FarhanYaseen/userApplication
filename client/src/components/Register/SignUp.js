
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

import './SignUp.css';

import { registerUser } from '../../APIHandler';
import useToken from './../../useToken';

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

export default function SignUp() {
  const classes = useStyles();
  const { setToken } = useToken();
  const history = useHistory();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [error, setError] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();
    const { data, error } = await registerUser({ email, password, lastName, firstName, });
    if (error) {
      const message = error.response.data.message;
      return setError(message);
    }
    const { accessToken } = data;
    setToken(accessToken);
    setError(null);
    history.push("/dashboard")
  }

  return (
    <div className="signup-wrapper">
      <h1>Register</h1>
      <form className={classes.root} onSubmit={handleSubmit}>
        <TextField
          label="First Name"
          variant="filled"
          required
          value={firstName || ''}
          onChange={e => setFirstName(e.target.value)}
        />
        <TextField
          label="Last Name"
          variant="filled"
          required
          value={lastName || ''}
          onChange={e => setLastName(e.target.value)}
        />
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
            Register
          </Button>
        </div>
      </form>
      <div>
        <Link
          component="button"
          variant="body2"
          onClick={() => history.push("/login")}
        >
          {`login?`}
        </Link>
      </div>
      {error && <ErrorBox error={error} />}
    </div>
  )
}
