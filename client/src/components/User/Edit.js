import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import axios from 'axios';

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

export default function Edit() {
  const classes = useStyles();

  let { id } = useParams();
  const [loading, setLoading] = useState(true);
  const { token } = useToken();
  const history = useHistory();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();

  const updateUser = async (requestBody) => {
    const config = {
      method: 'put',
      url: `http://localhost:8080/app/users/${id}`,
      headers: {
        'Content-Type': 'application/json',
        "x-access-token": token,
      },
      data: requestBody,

    };
    await axios(config);
  }
  const getUserData = async () => {
    const config = {
      method: 'get',
      url: `http://localhost:8080/app/users/${id}`,
      headers: {
        'Content-Type': 'application/json',
        "x-access-token": token,
      }
    };
    const { data } = await axios(config);
    const { email, lastName, firstName, password } = data;
    setFirstName(firstName);
    setLastName(lastName);
    setPassword(password);
    setEmail(email);
    setLoading(false);
  }
  useEffect(() => {
    if (loading) {
      getUserData();
    }
  }, []);

  const handleClose = () => history.push("/dashboard");

  const handleSubmit = async e => {
    e.preventDefault();
    await updateUser({
      email,
      password,
      lastName,
      firstName,
    });
    return handleClose();
  }
  const renderEdit = () => (
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
    </div>
  )
}