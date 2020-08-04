import React from 'react';
import { Grid, Typography, Container } from '@material-ui/core';

const NotFound = () => (
  <div style={{ padding: 40 }}>
    <Container>
      <Grid container spacing={10} style={{ paddingTop: 24, paddingBottom: 24, paddingLeft: 0, paddingRight: 0 }}>
        <Grid item xs={12} sm={6} lg={4} xl={12}>
          <Typography variant="h1" color="error" align="center" gutterBottom>
            404
          </Typography>
          <Typography variant="h3" color="textPrimary" align="center" gutterBottom>
            Content Not Found
          </Typography>
        </Grid>
      </Grid>
    </Container>
  </div>
);

export default NotFound;
