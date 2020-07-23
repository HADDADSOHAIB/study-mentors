import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import Chip from '@material-ui/core/Chip';
import uid from 'uid';
import Tabs from '@material-ui/core/Tabs';
import Button from '@material-ui/core/Button';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import makeStyle from './TeacherPageStyles';
import ScheduleDetails from '../components/ScheduleDetails';
import { fetchSelectedTeacher } from '../actions/teacherCreators';

const TeacherPage = ({
  match,
  history,
  accountType,
  fetchSelectedTeacher,
  selectedTeacher,
}) => {
  const classes = makeStyle();

  useEffect(() => {
    fetchSelectedTeacher(match.params.id);
    return () => '';
  }, []);

  return (
    <div>
      {
        selectedTeacher.teacher ? (
          <div className={classes.root}>
            <div className={classes.image}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.media}
                  image={(selectedTeacher.teacher && selectedTeacher.teacher.photo) || '/teacher.jpg'}
                  title="teacher card"
                />
                <CardHeader
                  avatar={
                    (
                      <Avatar aria-label="recipe" className={classes.avatar}>
                        {selectedTeacher.teacher && selectedTeacher.teacher.fullname[0]}
                      </Avatar>
                    )
                  }
                  title={selectedTeacher.teacher && selectedTeacher.teacher.fullname}
                  subheader={selectedTeacher.teacher && selectedTeacher.teacher.email}
                />
                <CardContent>
                  <Typography variant="h6" color="textPrimary" align="center" component="p">
                    what I can do
                  </Typography>
                  <Typography variant="body1" align="center" component="p">
                    { (selectedTeacher.teacher && selectedTeacher.teacher.what_I_can_do) || 'no information is provided by the teacher'}
                  </Typography>
                  <Typography variant="h6" color="textPrimary" align="center" component="p">
                    Bio
                  </Typography>
                  <Typography variant="body1" align="center" component="p">
                    { (selectedTeacher.teacher && selectedTeacher.teacher.bio) || 'no information is provided by the teacher'}
                  </Typography>
                  <Typography variant="h6" color="textPrimary" align="center" component="p">
                    Catgories
                  </Typography>
                  <div className={classes.categories}>
                    {
                      selectedTeacher.categories && selectedTeacher.categories.length ? (
                        selectedTeacher.categories.map(category => (
                          <Chip label={category.name} key={uid(12)} color="primary" variant="outlined" />
                        ))
                      ) : (
                        <p>The teacher did not provide categories</p>
                      )
                    }
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className={classes.info}>
              <Card className={classes.card}>
                <AppBar position="static" classes={{ root: classes.appbar }}>
                  <Tabs value={0} centered>
                    <Tab label="Teacher Schedule" id="simple-tab-0" aria-controls="simple-tabpanel-0" />
                  </Tabs>
                </AppBar>
                <CardContent>
                  { selectedTeacher.teacher
                    && (<ScheduleDetails schedule={selectedTeacher.teacher.schedule} />)}
                  { accountType === 'Student' ? (
                    <div className={classes.book}>
                      <Button variant="outlined" color="primary" onClick={() => history.push(`/teachers/${selectedTeacher.teacher.id}/book`)}>
                        Book an appoitements
                      </Button>
                    </div>
                  ) : ''}
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <p align="center">There is no teacher with this id</p>
        )
      }
    </div>
  );
};

TeacherPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.shape([]).isRequired,
  accountType: PropTypes.string.isRequired,
  selectedTeacher: PropTypes.shape({
    teacher: PropTypes.shape({
      id: PropTypes.number,
      session_type: PropTypes.string,
      fullname: PropTypes.string,
      email: PropTypes.string,
      schedule: PropTypes.shape({}),
      bio: PropTypes.string,
      what_I_can_do: PropTypes.string,
      photo: PropTypes.string,
    }),
    categories: PropTypes.arrayOf(Object),
  }).isRequired,
  fetchSelectedTeacher: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  accountType: state.auth.accountType,
  selectedTeacher: state.teacher.selectedTeacher,
});

const mapDispatchToProps = dispatch => ({
  fetchSelectedTeacher: id => dispatch(fetchSelectedTeacher(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TeacherPage);
