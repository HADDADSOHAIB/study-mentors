import React from 'react';
import uid from 'uid';
import { connect } from 'react-redux';
import Chip from '@material-ui/core/Chip';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { setSchedule } from '../actions/authCreators';
import useStyles from './ScheduleDetailsStyles';

const ScheduleDetails = ({ schedule, setSchedule }) => {
  const classes = useStyles();

  const handleDeleteSession = (day, i) => {
    const currentSchedule = schedule;
    currentSchedule[day] = currentSchedule[day].filter((el, j) => i !== j);
    setSchedule(currentSchedule);
  };

  return (
    <div>
      <div className={classes.session}>
        <div className={classes.sessionTitles}>
          <Typography color="textPrimary" variant="p" display="inline">
            Monday:
          </Typography>
        </div>
        <div className={classes.chips}>
          {
            schedule.monday && schedule.monday.length ? schedule.monday.map((session, i) => (
              <Chip label={session} key={uid(12)} onDelete={() => handleDeleteSession('monday', i)} color="primary" variant="outlined" />
            )) : (
              <p className={classes.chip}>no schedule is set for this day</p>
            )
          }
        </div>
      </div>
      <div className={classes.session}>
        <div className={classes.sessionTitles}>
          <Typography color="textPrimary" variant="p" display="inline">
            Tuesday:
          </Typography>
        </div>
        <div className={classes.chips}>
          {
            schedule.tuesday && schedule.tuesday.length ? schedule.tuesday.map((session, i) => (
              <Chip label={session} key={uid(12)} onDelete={() => handleDeleteSession('tuesday', i)} color="primary" variant="outlined" />
            )) : (
              <p className={classes.chip}>no schedule is set for this day</p>
            )
          }
        </div>
      </div>
      <div className={classes.session}>
        <div className={classes.sessionTitles}>
          <Typography color="textPrimary" variant="p" display="inline">
            Wednesday:
          </Typography>
        </div>
        <div className={classes.chips}>
          {
            schedule.wednesday && schedule.wednesday.length ? schedule.wednesday.map((session, i) => (
              <Chip label={session} key={uid(12)} onDelete={() => handleDeleteSession('wednesday', i)} color="primary" variant="outlined" classes={{ root: classes.chip }} />
            )) : (
              <p className={classes.chip}>no schedule is set for this day</p>
            )
          }
        </div>
      </div>
      <div className={classes.session}>
        <div className={classes.sessionTitles}>
          <Typography color="textPrimary" variant="p" display="inline">
            Thursday:
          </Typography>
        </div>
        <div className={classes.chips}>
          {
            schedule.thursday && schedule.thursday.length ? schedule.thursday.map((session, i) => (
              <Chip label={session} key={uid(12)} onDelete={() => handleDeleteSession('thursday', i)} color="primary" variant="outlined" />
            )) : (
              <p className={classes.chip}>no schedule is set for this day</p>
            )
          }
        </div>
      </div>
      <div className={classes.session}>
        <div className={classes.sessionTitles}>
          <Typography color="textPrimary" variant="p" display="inline">
            Friday:
          </Typography>
        </div>
        <div className={classes.chips}>
          {
            schedule.friday && schedule.friday.length ? schedule.friday.map((session, i) => (
              <Chip label={session} key={uid(12)} onDelete={() => handleDeleteSession('friday', i)} color="primary" variant="outlined" />
            )) : (
              <p className={classes.chip}>no schedule is set for this day</p>
            )
          }
        </div>
      </div>
      <div className={classes.session}>
        <div className={classes.sessionTitles}>
          <Typography color="textPrimary" variant="p" display="inline">
            Saturday:
          </Typography>
        </div>
        <div className={classes.chips}>
          {
            schedule.saturday && schedule.saturday.length ? schedule.saturday.map((session, i) => (
              <Chip label={session} key={uid(12)} onDelete={() => handleDeleteSession('saturday', i)} color="primary" variant="outlined" />
            )) : (
              <p className={classes.chip}>no schedule is set for this day</p>
            )
          }
        </div>
      </div>
      <div className={classes.session}>
        <div className={classes.sessionTitles}>
          <Typography color="textPrimary" variant="p" display="inline">
            Sunday:
          </Typography>
        </div>
        <div className={classes.chips}>
          {
            schedule.sunday && schedule.sunday.length ? schedule.sunday.map((session, i) => (
              <Chip label={session} key={uid(12)} onDelete={() => handleDeleteSession('sunday', i)} color="primary" variant="outlined" />
            )) : (
              <p className={classes.chip}>no schedule is set for this day</p>
            )
          }
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
});

const mapDispatchToProps = dispatch => ({
  setSchedule: schedule => dispatch(setSchedule(schedule)),
});

ScheduleDetails.propTypes = {
  schedule: PropTypes.shape({
    monday: PropTypes.string,
    tuesday: PropTypes.string,
    wednesday: PropTypes.string,
    thursday: PropTypes.string,
    friday: PropTypes.string,
    saturday: PropTypes.string,
    sunday: PropTypes.string,
  }).isRequired,
  setSchedule: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleDetails);
