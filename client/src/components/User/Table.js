/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';

import useToken from '../../useToken';
import { getUsers, deleteUser } from './../../APIHandler';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function UserTable() {
  const classes = useStyles();
  const history = useHistory();
  const [data, setData] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const { token } = useToken();
  const getData = async () => {
    const { data = [], error: errResponse } = await getUsers(token);
    setLoadingData(false);

    if (!errResponse)
      setData(data);
  }
  const removeUser = async (id) => {
    await deleteUser(id, token);
    await getData();
  }

  useEffect(() => {
    if (loadingData) {
      getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const editUser = (id) => history.push(`/edit/${id}`);
  const renderTable = () => (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">First Name</TableCell>
            <TableCell align="right">Last Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(
            ({ firstName, lastName, email, id }, index) => (
              <TableRow key={id}>
                <TableCell align="left">{firstName}</TableCell>
                <TableCell align="right">{lastName}</TableCell>
                <TableCell align="right">{email}</TableCell>
                <TableCell >
                  <Button variant="contained" color="primary" onClick={() => editUser(id)} > Edit</Button>
                </TableCell>
                <TableCell >
                  <Button variant="contained" color="secondary" onClick={async () => await removeUser(id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
  return (
    <div>
      {loadingData ? "Loading ...." : renderTable()}
    </div>
  );
}