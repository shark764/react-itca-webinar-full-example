import React, { useState } from 'react';
import { Grid, Typography, TextField, makeStyles, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: 15,
      width: '40ch',
    },
  },
  actions: {
    '& > *': {
      margin: 15,
    },
  },
}));

const WhateverForm = () => {
  const classes = useStyles();
  const [title, setTitle] = useState('');
  const [other, setOther] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    console.log('%cvalues:', 'background: #eee; color: #444;', title, other);
  };
  const handleClear = e => {
    setTitle('');
    setOther('');
  };

  return (
    <div style={{ padding: 40 }}>
      <Typography variant="h4" color="primary" gutterBottom>
        New Entry
      </Typography>

      <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={10} style={{ paddingTop: 24, paddingBottom: 24, paddingLeft: 0, paddingRight: 0 }}>
          <Grid item>
            <TextField
              required
              label="Title"
              placeholder="enter a title"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />

            <TextField label="Other" placeholder="others..." value={other} onChange={e => setOther(e.target.value)} />
          </Grid>
        </Grid>

        <div className={classes.actions}>
          <Button type="submit" variant="contained" color="primary" endIcon={<SendIcon />}>
            Submit
          </Button>
          <Button variant="contained" color="secondary" endIcon={<DeleteIcon />} onClick={handleClear}>
            Clear
          </Button>
        </div>
      </form>
    </div>
  );
};

export default WhateverForm;
