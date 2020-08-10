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

import { humanize } from '../../utils';

/**
 * ---------------------------
 * Course structure:
 * ---------------------------
 * course = {
 *    title: string,
 *    url: string,
 *    shortDescription: string,
 *    description: string,
 *    duration: number,
 *    skillLevel: string,
 *    image: {
 *      id: string,
 *      title: string,
 *      url: string,
 *    },
 *    id: string,
 *    createdAt: string,
 *  };
 */

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
            title={course.title}
            subheader={moment(course.createdAt).format('LLL')}
          />

          <CardMedia style={{ height: 0, paddingTop: '56.25%' }} image={course.image.url} title={course.title} />

          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {course.title}
            </Typography>
            <Typography component="p" align="justify">
              {course.shortDescription}
            </Typography>
          </CardContent>

          <CardActions>
            <Button size="small" color="secondary" href={course.url} target="_blank">
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
                {`Duration: ${course.duration} min`}
              </Typography>
              <Typography variant="subtitle2" gutterBottom paragraph>
                {`Skill Level: ${humanize(course.skillLevel)}`}
              </Typography>

              <Typography component="p" align="justify">
                {course.description}
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
    title: PropTypes.string,
    url: PropTypes.string,
    shortDescription: PropTypes.string,
    description: PropTypes.string,
    duration: PropTypes.number,
    skillLevel: PropTypes.string,
    image: PropTypes.shape({
      url: PropTypes.string,
    }),
    createdAt: PropTypes.string,
  }),
};

export default CourseItem;
