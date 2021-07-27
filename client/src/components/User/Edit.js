import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
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

export default function Edit() {
  let { id } = useParams();
  const [loading, setLoading] = useState(true);
  const { token } = useToken();
  const history = useHistory();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();

  const updateUser = async (requestBody) =>{
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


  const handleSubmit = async e => {
    e.preventDefault();
     await updateUser({
      email,
      password,
      lastName,
      firstName,
    });
    history.push("/dashboard")
  }
  const renderEdit = () => (
    <div>
       <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Email</p>
          <input type="enail" value={email} onChange={e => setEmail(e.target.value)} />
        </label>
        <label>
          <p>First Name</p>
          <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} />
        </label>
        <label>
          <p>Last Name</p>
          <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>

    </div>
  );
  return (
    <div className="signup-wrapper">
      {loading ? "loading" : renderEdit()}
    </div>
  )
}
