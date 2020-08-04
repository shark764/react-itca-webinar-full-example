import React from 'react';
import { Card, CardMedia, CardContent, Typography, CardActions, Button } from '@material-ui/core';

const CourseItem = ({ course }) => (
  <div>
    {course ? (
      <Card>
        <CardMedia
          style={{ height: 0, paddingTop: '56.25%' }}
          image={course.fields.image.fields.file.url}
          title={course.fields.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {course.fields.title}
          </Typography>
          <Typography component="p">{course.fields.description}</Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="secondary" href={course.fields.url} target="_blank">
            Open course
          </Button>
        </CardActions>
      </Card>
    ) : null}
  </div>
);

export default CourseItem;
