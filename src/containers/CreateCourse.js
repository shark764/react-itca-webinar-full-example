import React, { useState, useEffect } from 'react';
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

import * as contentful from 'contentful';
import * as contentfulManagement from 'contentful-management';
import { convertToKebabCase, SPACE_ID, ACCESS_TOKEN, ACCESS_TOKEN_MANAGEMENT, skillLevels } from '../utils';

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

const client = contentful.createClient({
  space: SPACE_ID,
  accessToken: ACCESS_TOKEN,
});

const clientManagement = contentfulManagement.createClient({
  accessToken: ACCESS_TOKEN_MANAGEMENT,
});

const NewCourse = () => {
  const classes = useStyles();

  const [title, setTitle] = useState('Hello World');
  const [slug, setSlug] = useState('hello-world');
  const [shortDescription, setShortDescription] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(10);
  const [skillLevel, setSkillLevel] = useState('beginner');
  const [url, setUrl] = useState('https://the-example-app-nodejs.contentful.com/courses/hello-world');
  const [image, setImage] = useState({});
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    client
      .getAssets()
      .then(response => {
        const retrievedAssets = response.items.map(asset => ({
          id: asset.sys.id,
          title: asset.fields.title,
          url: `https:${asset.fields.file.url}`,
        }));

        setAssets(retrievedAssets);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    const titleKebabFormatted = convertToKebabCase(title);
    setSlug(titleKebabFormatted);
    setUrl(`https://the-example-app-nodejs.contentful.com/courses/${titleKebabFormatted}`);
  }, [title]);

  const handleSubmit = e => {
    e.preventDefault();

    clientManagement.getSpace(SPACE_ID).then(space =>
      space
        .createEntry('course', {
          fields: {
            title: { 'en-US': title },
            slug: { 'en-US': slug },
            shortDescription: { 'en-US': shortDescription },
            description: { 'en-US': description },
            duration: { 'en-US': Number.parseInt(duration, 10) },
            skillLevel: { 'en-US': skillLevel },
            url: { 'en-US': url },
            image: {
              'en-US': {
                sys: {
                  id: image.id,
                  linkType: 'Asset',
                  type: 'Link',
                },
              },
            },
          },
        })
        .then(entry => {
          /**
           * Entry will be added as a draft,
           * until we publish it
           */
          entry.publish();

          console.log(`%cEntry ${entry.sys.id} created and published.`, 'background: #d7dae0; color: #282c34;', entry);
        })
        .catch(error => {
          console.log('Error occurred while creating Entry');
          console.error(error);
        }),
    );
  };

  const handleClear = () => {
    setTitle('');
    setSlug('');
    setShortDescription('');
    setDescription('');
    setImage({});
    setDuration(0);
    setSkillLevel('');
    setUrl('');
  };

  return (
    <div style={{ padding: 40 }}>
      <Typography variant="h4" color="primary" gutterBottom>
        New Course
      </Typography>

      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={5} style={{ paddingTop: 24, paddingBottom: 24, paddingLeft: 0, paddingRight: 0 }}>
          <Grid item xs={12} sm={6} lg={4} xl={3}>
            <TextField
              required
              label="Course title"
              placeholder="add course title..."
              helperText="The title is needed for searching purpose"
              value={title}
              onChange={e => setTitle(e.target.value)}
              fullWidth
              margin="normal"
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} sm={6} lg={4} xl={3}>
            <TextField
              required
              label="Course unique slug"
              value={slug}
              onChange={e => setSlug(e.target.value)}
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
              value={shortDescription}
              onChange={e => setShortDescription(e.target.value)}
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
              value={description}
              onChange={e => setDescription(e.target.value)}
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
              value={duration}
              onChange={e => setDuration(e.target.value)}
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
              value={skillLevel}
              onChange={e => setSkillLevel(e.target.value)}
              helperText="What level is needed for this course?"
              fullWidth
              margin="normal"
              variant="outlined"
            >
              {skillLevels.map(option => (
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
              value={url}
              onChange={e => setUrl(e.target.value)}
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
                {assets.map(asset => (
                  <GridListTile
                    key={asset.id}
                    cols={1}
                    rows={1}
                    style={image.id === asset.id ? { border: '4px solid #3f51b5' } : {}}
                  >
                    <img src={asset.url} alt={asset.title} onClick={() => setImage(asset)} />
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
            <Button variant="contained" color="secondary" endIcon={<DeleteIcon />} onClick={handleClear}>
              Clear
            </Button>
          </div>
        </Grid>
      </form>
    </div>
  );
};

export default NewCourse;
