/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useToken from '../../useToken';
import { useHistory } from 'react-router-dom';

export default function Table() {

  const history = useHistory();
  const [data, setData] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const { token } = useToken();
  const getData = async () => {
    // const { data } = await 

    const config = {
      method: 'get',
      url: 'http://localhost:8080/app/users',
      headers: {
        'Content-Type': 'application/json',
        "x-access-token": token,
      }
    };
    const { data } = await axios(config);
    setData(data);
    setLoadingData(false);
  }
  const deleteUser = async (id) => {
    const config = {
      method: 'delete',
      url: `http://localhost:8080/app/users/${id}`,
      headers: {
        'Content-Type': 'application/json',
        "x-access-token": token,
      }
    };
    await axios(config);
    await getData();
  }

  useEffect(() => {
    if (loadingData) {
      getData();
    }
  }, []);
  const editUser = (id) => history.push(`/edit/${id}`);

  const renderTableBody = () => {
    return data.map(({ firstName, lastName, email, id }, index) => {
      return (
        <tr key={index}>
          <td>{firstName}</td>
          <td>{lastName}</td>
          <td>{email}</td>
          <td><button onClick={() => editUser(id)} > Edit</button></td>
          <td><button onClick={async () => await deleteUser(id)}>Delete</button></td>
        </tr>
      )
    })
  }
  const renderTable = () => {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <td></td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {renderTableBody()}
          </tbody>
        </table>
      </div>
    );
  }
  return (
    <div>
      {loadingData ? "Loading ...." : renderTable()}
    </div>
  );
}