import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import useToken from './../../useToken';

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
    return accessToken;

  } catch (err) {
    console.error(err);
  }
}

export default function Login() {
  const history = useHistory();
  const { setToken } = useToken();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      email,
      password
    });
    setToken(token);
    history.push("/dashboard")
  }

  return (
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Email</p>
          <input type="enail" onChange={e => setEmail(e.target.value)} />
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
        {/* <Link to="/register" className="btn btn-primary">Register</Link>
         */}
         <button onClick={()=> history.push("/register")}>Register</button>
      </div>

    </div>
  )
}

// Login.propTypes = {
//   setToken: PropTypes.func.isRequired
// };