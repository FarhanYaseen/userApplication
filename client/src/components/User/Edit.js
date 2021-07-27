import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import useToken from './../../useToken';
import { updateUser, getUserByID } from './../../APIHandler';
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

export default function Edit() {
  const { id } = useParams();

  const classes = useStyles();
  const { token } = useToken();
  const history = useHistory();

  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [error, setError] = useState(null);

  const getUserData = async () => {
    const { data, error: errorResponse } = await getUserByID(id, token);
    setLoading(false);
    if (errorResponse) {
      const message = errorResponse.response.data.message;
      return setError(message);
    }
    const { email, lastName, firstName, password } = data;
    setFirstName(firstName);
    setLastName(lastName);
    setPassword(password);
    setEmail(email);
    setError(null);
  }
  useEffect(() => {
    if (loading) {
      getUserData();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => history.push("/dashboard");

  const handleSubmit = async e => {
    e.preventDefault();
    const { error: errorResponse } = await updateUser({ email, password, lastName, firstName, }, id, token);
    if (errorResponse) {
      const message = errorResponse.response.data.message;
      return setError(message);
    }
    setError(null);
    return handleClose();
  }
  const renderEdit = () => (
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
        <Button variant="contained" onClick={handleClose}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Update
        </Button>
      </div>
    </form>
  );
  return (
    <div className="signup-wrapper">
      {loading ? "loading" : renderEdit()}
      {error && <ErrorBox error={error}/>}

    </div>
  )
}