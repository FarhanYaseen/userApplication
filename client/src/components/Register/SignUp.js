import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
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

export default function SignUp() {
  const history = useHistory();
  const { setToken } = useToken();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();


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
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Email</p>
          <input type="enail" onChange={e => setEmail(e.target.value)} />
        </label>
        <label>
          <p>First Name</p>
          <input type="text" onChange={e => setFirstName(e.target.value)} />
        </label>
        <label>
          <p>Last Name</p>
          <input type="text" onChange={e => setLastName(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      <div>
         <button onClick={()=> history.push("/login")}>Login</button>
      </div>

    </div>
  )
}
