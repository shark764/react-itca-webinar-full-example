import React, { useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  CardHeader,
  IconButton,
  Avatar,
  Collapse,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import moment from 'moment';

const CourseItem = ({ course }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      {course ? (
        <Card>
          <CardHeader
            avatar={<Avatar aria-label="recipe">IT</Avatar>}
            action={(
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            )}
            title={course.fields.title}
            subheader={moment(course.sys.createdAt).format('LLL')}
          />

          <CardMedia
            style={{ height: 0, paddingTop: '56.25%' }}
            image={course.fields.image.fields.file.url}
            title={course.fields.title}
          />

          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {course.fields.title}
            </Typography>
            <Typography component="p" align="justify">
              {course.fields.shortDescription}
            </Typography>
          </CardContent>

          <CardActions>
            <Button size="small" color="secondary" href={course.fields.url} target="_blank">
              Open course
            </Button>
            <IconButton
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
              style={{
                transform: 'rotate(0deg)',
                marginLeft: 'auto',
                ...(expanded && { transform: 'rotate(180deg)' }),
              }}
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>

          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography gutterBottom variant="h6">
                Details
              </Typography>

              <Typography variant="subtitle2" gutterBottom>
                {`Duration: ${course.fields.duration} min`}
              </Typography>
              <Typography variant="subtitle2" gutterBottom paragraph>
                {`Skill Level: ${course.fields.skillLevel}`}
              </Typography>

              <Typography component="p" align="justify">
                {course.fields.description}
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      ) : null}
    </div>
  );
};

CourseItem.propTypes = {
  course: PropTypes.shape({
    fields: PropTypes.shape({
      title: PropTypes.string,
      url: PropTypes.string,
      description: PropTypes.string,
    }),
  }),
};

export default CourseItem;
