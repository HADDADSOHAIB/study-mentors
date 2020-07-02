import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import { withRouter } from 'react-router';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345,
    cursor: 'pointer',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const TeacherCard = ({
  id,
  fullname,
  photo,
  whatICanDo,
  bio,
  history,
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.root} onClick={() => history.push(`/teachers/${id}`)}>
      <CardHeader
        avatar={
          (
            <Avatar aria-label="recipe" className={classes.avatar}>
              {fullname[0]}
            </Avatar>
          )
        }
        title={fullname}
      />
      <CardMedia
        className={classes.media}
        image={photo || '/teacher.jpg'}
        title="teacher card"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          what I can do:
          {whatICanDo || 'no information is provided by the teacher'}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          bio:
          {bio || 'no information is provided by the teacher'}
        </Typography>
      </CardContent>
    </Card>
  );
};

TeacherCard.propTypes = {
  fullname: PropTypes.string.isRequired,
  photo: PropTypes.string,
  whatICanDo: PropTypes.string,
  bio: PropTypes.string,
  id: PropTypes.number.isRequired,
  history: PropTypes.shape([]).isRequired,
};

TeacherCard.defaultProps = {
  photo: null,
  whatICanDo: null,
  bio: null,
};

export default withRouter(TeacherCard);
