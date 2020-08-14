import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Typography,
  TextField,
  makeStyles,
  InputLabel,
  Button,
  GridList,
  GridListTile,
  MenuItem,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles(() => ({
  actions: {
    '& > *': {
      marginRight: 24,
      marginTop: 24,
    },
  },
  gridList: {
    height: 450,
  },
}));

const Layout = props => {
  const classes = useStyles();

  return (
    <div style={{ padding: 40 }}>
      <Typography variant="h4" color="primary" gutterBottom>
        New Course
      </Typography>

      <form noValidate autoComplete="off" onSubmit={props.handleSubmit}>
        <Grid container spacing={5} style={{ paddingTop: 24, paddingBottom: 24, paddingLeft: 0, paddingRight: 0 }}>
          <Grid item xs={12} sm={6} lg={4} xl={3}>
            <TextField
              required
              label="Course title"
              placeholder="add course title..."
              helperText="The title is needed for searching purpose"
              value={props.title}
              onChange={e => props.setTitle(e.target.value)}
              fullWidth
              margin="normal"
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} sm={6} lg={4} xl={3}>
            <TextField
              required
              label="Course unique slug"
              value={props.slug}
              onChange={e => props.setSlug(e.target.value)}
              placeholder="add course unique slug..."
              helperText="This will identify the task"
              fullWidth
              margin="normal"
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} sm={6} lg={4} xl={6}>
            <TextField
              label="Short description"
              multiline
              rows={4}
              value={props.shortDescription}
              onChange={e => props.setShortDescription(e.target.value)}
              placeholder="add course short description..."
              helperText="This will be shown as the description in the course list"
              fullWidth
              margin="normal"
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} sm={6} lg={4} xl={12}>
            <TextField
              label="Description"
              multiline
              rows={8}
              value={props.description}
              onChange={e => props.setDescription(e.target.value)}
              placeholder="add course complete description..."
              helperText="This description will be shown when course is open"
              fullWidth
              margin="normal"
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} sm={6} lg={4} xl={3}>
            <TextField
              label="Duration"
              type="number"
              value={props.duration}
              onChange={e => props.setDuration(Number.parseInt(e.target.value, 10))}
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="add course duration in minutes..."
              helperText="Duration is in minutes"
              fullWidth
              margin="normal"
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} sm={6} lg={4} xl={3}>
            <TextField
              select
              label="Skill level"
              value={props.skillLevel}
              onChange={e => props.setSkillLevel(e.target.value)}
              helperText="What level is needed for this course?"
              fullWidth
              margin="normal"
              variant="outlined"
            >
              {props.skillLevels.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6} lg={4} xl={6}>
            <TextField
              label="URL"
              multiline
              rows={4}
              placeholder="add course url..."
              value={props.url}
              onChange={e => props.setUrl(e.target.value)}
              helperText="The URL must match the pattern 'https://the-example-app-nodejs.contentful.com/courses/' + slug"
              fullWidth
              margin="normal"
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} sm={6} lg={4} xl={12}>
            <InputLabel>Image</InputLabel>
            <div
              style={{
                marginTop: 12,
              }}
            >
              <GridList cellHeight={160} className={classes.gridList} cols={6} spacing={6}>
                {props.assets.map(asset => (
                  <GridListTile
                    key={asset.id}
                    cols={1}
                    rows={1}
                    style={props.image.id === asset.id ? { border: '4px solid #3f51b5' } : {}}
                  >
                    <img src={asset.url} alt={asset.title} onClick={() => props.setImage(asset)} />
                  </GridListTile>
                ))}
              </GridList>
            </div>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={6} lg={4} xl={3}>
          <div className={classes.actions}>
            <Button type="submit" variant="contained" color="primary" endIcon={<SendIcon />}>
              Submit
            </Button>
            <Button variant="contained" color="secondary" endIcon={<DeleteIcon />} onClick={props.handleClear}>
              Clear
            </Button>
          </div>
        </Grid>
      </form>
    </div>
  );
};

Layout.propTypes = {
  handleSubmit: PropTypes.func,
  handleClear: PropTypes.func,
  title: PropTypes.string,
  setTitle: PropTypes.func,
  slug: PropTypes.string,
  setSlug: PropTypes.func,
  shortDescription: PropTypes.string,
  setShortDescription: PropTypes.func,
  description: PropTypes.string,
  setDescription: PropTypes.func,
  duration: PropTypes.number,
  setDuration: PropTypes.func,
  skillLevel: PropTypes.string,
  setSkillLevel: PropTypes.func,
  skillLevels: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    }),
  ),
  url: PropTypes.string,
  setUrl: PropTypes.func,
  image: PropTypes.shape({}),
  setImage: PropTypes.func,
  assets: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      url: PropTypes.string,
      id: PropTypes.string,
    }),
  ),
};

export default Layout;
