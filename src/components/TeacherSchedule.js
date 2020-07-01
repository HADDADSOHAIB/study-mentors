import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import uid from 'uid';
import { connect } from 'react-redux';
import Chip from '@material-ui/core/Chip';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import useStyles from './TeacherScheduleStyles';
import ScheduleDetails from './ScheduleDetails';
import { setSchedule } from '../actions/authCreators';
import { setFlash } from '../actions/layoutCreators';
import { lessThen, biggerThen } from '../utils/dateCompare';

const TeacherSchedule = ({ currentUser, setSchedule, setFlash }) => {
  const classes = useStyles();

  const [newSessionType, setNewSessionType] = useState('');
  const [sessionsTypes, setSessionsTypes] = useState(currentUser.session_type ? currentUser.session_type.split(',') : '');

  const handleNewSessionTypeChange = e => setNewSessionType(e.target.value);
  const handleDeleteSessionType = i => {
    setSessionsTypes([...sessionsTypes.filter((type, j) => i !== j)]);
  };

  const handleAddSessionType = () => {
    setSessionsTypes([...sessionsTypes, newSessionType]);
    setNewSessionType('');
  };

  const [day, setDay] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [newSchedule, setNewSchedule] = useState(currentUser.schedule);

  const handleDayChange = e => setDay(e.target.value);
  const handleToChange = e => setTo(e.target.value);
  const handleFromChange = e => setFrom(e.target.value);

  const handleAddSchedule = () => {
    let currentSchedule = newSchedule;
    if (!day) {
      setFlash({
        severity: 'warning',
        message: 'select a day first',
        open: true,
      });
    } else if (!to.match(/^\d\d:\d\d$/) || !to.match(/^\d\d:\d\d$/)) {
      setFlash({
        severity: 'warning',
        message: 'The to and from fields should be hours, ex: 14:00, 17:00',
        open: true,
      });
    } else {
      if (currentSchedule && !currentSchedule[day]) {
        currentSchedule[day] = [`${from}-${to}`];
      } else if (!currentSchedule) {
        currentSchedule = {
          [day]: [`${from}-${to}`],
        };
      } else if (currentSchedule && currentSchedule[day]) {
        const overlappedSessions = currentSchedule[day].filter(session => {
          const [sessionFrom, sessionTo] = session.split('-');
          return (lessThen(sessionFrom, from) && biggerThen(sessionTo, from))
            || (lessThen(sessionFrom, to) && biggerThen(sessionTo, to));
        });
        if (overlappedSessions.length) {
          setFlash({
            severity: 'warning',
            message: 'There is an existing session that overlaps the chosen times',
            open: true,
          });
        } else {
          currentSchedule[day].push(`${from}-${to}`);
        }
      }
      setNewSchedule(currentSchedule);
      setSchedule(currentSchedule);
      setFrom('');
      setTo('');
      setDay('');
    }
  };

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography color="textPrimary" variant="h6" className={classes.title}>
          Teacher Sechdule
        </Typography>
        <div className={classes.newSession}>
          <TextField
            label="new session type"
            type="text"
            variant="outlined"
            size="small"
            placeholder="online, in place ...."
            value={newSessionType}
            onChange={handleNewSessionTypeChange}
          />
          <Button variant="outlined" color="primary" onClick={handleAddSessionType}>
            add
          </Button>
        </div>
        <div className={classes.sessionTypes}>
          <div className={classes.sessionTitles}>
            <Typography color="textPrimary" variant="p" display="inline">
              Session Types:
            </Typography>
          </div>
          <div className={classes.chipsTypes}>
            {
              sessionsTypes.length ? sessionsTypes.map((session, i) => (
                <Chip label={session} key={uid(12)} onDelete={() => handleDeleteSessionType(i)} color="primary" variant="outlined" />
              )) : (
                <p>You didn&apos;t set session types yet</p>
              )
            }
          </div>
        </div>
        <FormControl variant="outlined" size="small" fullWidth className={classes.formControl}>
          <InputLabel id="days">Choose a day</InputLabel>
          <Select
            labelId="days"
            value={day}
            onChange={handleDayChange}
          >
            <MenuItem value="monday">Monday</MenuItem>
            <MenuItem value="tuesday">Tuesday</MenuItem>
            <MenuItem value="wednesday">Wednesday</MenuItem>
            <MenuItem value="thursday">Thursday</MenuItem>
            <MenuItem value="friday">Friday</MenuItem>
            <MenuItem value="saturday">Saturday</MenuItem>
            <MenuItem value="sunday">Sunday</MenuItem>
          </Select>
        </FormControl>
        <div className={classes.newSession}>
          <TextField
            label="available from"
            type="text"
            variant="outlined"
            size="small"
            placeholder="ex: 14:00"
            value={from}
            onChange={handleFromChange}
          />
          <TextField
            label="available to"
            type="text"
            variant="outlined"
            size="small"
            placeholder="ex: 16:00"
            value={to}
            onChange={handleToChange}
          />
          <Button variant="outlined" color="primary" onClick={handleAddSchedule}>
            add
          </Button>
        </div>
        {
          currentUser.schedule ? (
            <ScheduleDetails schedule={currentUser.schedule} />
          ) : 'You did not set a schedule yet'
        }
      </CardContent>
    </Card>
  );
};

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
});

const mapDispatchToProps = dispatch => ({
  setSchedule: schedule => dispatch(setSchedule(schedule)),
  setFlash: flash => dispatch(setFlash(flash)),
});

TeacherSchedule.propTypes = {
  currentUser: PropTypes.shape({
    schedule: PropTypes.shape({}),
    session_type: PropTypes.string,
  }).isRequired,
  setSchedule: PropTypes.func.isRequired,
  setFlash: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TeacherSchedule);
