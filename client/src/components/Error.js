import React from 'react';
import Alert from '@material-ui/lab/Alert';

const ErrorBox = ({ error }) => <Alert severity="error">{error}</Alert>

export default ErrorBox;