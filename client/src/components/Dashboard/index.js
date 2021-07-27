import React from 'react';
import Table from '../User/Table';
import Logout from './Logout'
export default function Dashboard() {
  return (
    <div>
      <Logout />
      <Table />
    </div>
  );
}