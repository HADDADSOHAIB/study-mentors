import React from 'react';
import uid from 'uid';
import { connect } from 'react-redux';
import Chip from '@material-ui/core/Chip';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { setSchedule, updateSchedule } from '../actions/authCreators';
import useStyles from './ScheduleDetailsStyles';
import { setFlash } from '../actions/layoutCreators';

const ScheduleDetails = ({
  schedule,
  currentUser,
  options,
  updateSchedule,
}) => {
  const classes = useStyles();

  const handleDeleteSession = (day, i) => {
    const currentSchedule = schedule;
    currentSchedule[day] = currentSchedule[day].filter((el, j) => i !== j);
    updateSchedule(currentSchedule, currentUser);
  };

  const sessionChip = (session, i, day) => (options ? (
    <Chip label={session} key={uid(12)} onDelete={() => handleDeleteSession(day, i)} color="primary" variant="outlined" />
  ) : (
    <Chip label={session} key={uid(12)} color="primary" variant="outlined" />
  ));

  return (
    <div>
      {
        ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map(day => (
          <div className={classes.session} key={uid(12)}>
            <div className={classes.sessionTitles}>
              <Typography color="textPrimary" variant="body1" display="inline">
                {day}
                :
              </Typography>
            </div>
            <div className={classes.chips}>
              {
                schedule[day] && schedule[day].length ? schedule[day].map((session, i) => (
                  sessionChip(session, i, day)
                )) : (
                  <p className={classes.chip}>no schedule is set for this day</p>
                )
              }
            </div>
          </div>
        ))
      }
    </div>
  );
};

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
});

const mapDispatchToProps = dispatch => ({
  setSchedule: schedule => dispatch(setSchedule(schedule)),
  setFlash: flash => dispatch(setFlash(flash)),
  updateSchedule: (schedule, user) => dispatch(updateSchedule(schedule, user)),
});

ScheduleDetails.propTypes = {
  schedule: PropTypes.shape({
    monday: PropTypes.arrayOf(Object),
    tuesday: PropTypes.arrayOf(Object),
    wednesday: PropTypes.arrayOf(Object),
    thursday: PropTypes.arrayOf(Object),
    friday: PropTypes.arrayOf(Object),
    saturday: PropTypes.arrayOf(Object),
    sunday: PropTypes.arrayOf(Object),
  }).isRequired,
  currentUser: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
  options: PropTypes.bool,
  updateSchedule: PropTypes.func.isRequired,
};

ScheduleDetails.defaultProps = {
  options: false,
};

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleDetails);
