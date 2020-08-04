import React from 'react';
import { Grid, Typography } from '@material-ui/core';

const About = () => (
  <div style={{ padding: 40 }}>
    <Grid container spacing={10} style={{ paddingTop: 24, paddingBottom: 24, paddingLeft: 0, paddingRight: 0 }}>
      <Grid item xs={12} sm={6} lg={4} xl={3}>
        <Typography variant="h3" color="secondary" gutterBottom>
          Tusa Inc.
        </Typography>
        <Typography variant="h6" gutterBottom>
          All rights reserved
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          We are a company that makes ReactJs APPs for living
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          But when the night arrives... We get out the forbidden dance moves.
        </Typography>
      </Grid>
    </Grid>
  </div>
);

export default About;
