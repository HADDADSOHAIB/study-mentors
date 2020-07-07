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
import { updateSchedule, updateSessionType } from '../actions/authCreators';
import { setFlash } from '../actions/layoutCreators';
import { lessThen, biggerThen } from '../utils/dateCompare';

const TeacherSchedule = ({
  currentUser,
  setFlash,
  updateSchedule,
  updateSessionType,
}) => {
  const classes = useStyles();

  const [state, setState] = useState({
    newSessionType: '',
    day: '',
    from: '',
    to: '',
    newSchedule: currentUser.schedule,
  });

  const handleChange = ({ target: { name, value } }) => setState({ ...state, [name]: value });

  const handleDeleteSessionType = i => {
    const newSessionTypes = [...currentUser.session_type.split(',').filter((type, j) => i !== j)].join(',');
    updateSessionType(newSessionTypes, currentUser);
  };

  const handleAddSessionType = () => {
    const newSessionTypes = [...currentUser.session_type.split(','), state.newSessionType].join(',');
    updateSessionType(newSessionTypes, currentUser);
    setState({ ...state, newSessionType: '' });
  };

  const handleAddSchedule = () => {
    let currentSchedule = state.newSchedule;
    if (!state.day) {
      setFlash({
        severity: 'warning',
        message: 'select a day first',
        open: true,
      });
    } else if (!state.to.match(/^\d\d:\d\d$/) || !state.from.match(/^\d\d:\d\d$/)) {
      setFlash({
        severity: 'warning',
        message: 'The to and from fields should be hours, ex: 14:00, 17:00',
        open: true,
      });
    } else {
      if (currentSchedule && !currentSchedule[state.day]) {
        currentSchedule[state.day] = [`${state.from}-${state.to}`];
      } else if (!currentSchedule) {
        currentSchedule = {
          [state.day]: [`${state.from}-${state.to}`],
        };
      } else if (currentSchedule && currentSchedule[state.day]) {
        const overlappedSessions = currentSchedule[state.day].filter(session => {
          const [sessionFrom, sessionTo] = session.split('-');
          return (lessThen(sessionFrom, state.from) && biggerThen(sessionTo, state.from))
            || (lessThen(sessionFrom, state.to) && biggerThen(sessionTo, state.to));
        });
        if (overlappedSessions.length) {
          setFlash({
            severity: 'warning',
            message: 'There is an existing session that overlaps the chosen times',
            open: true,
          });
        } else {
          currentSchedule[state.day].push(`${state.from}-${state.to}`);
        }
      }
      updateSchedule(currentSchedule, currentUser);
      setState({
        ...state,
        day: '',
        from: '',
        to: '',
        newSchedule: currentSchedule,
      });
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
            name="newSessionType"
            value={state.newSessionType}
            onChange={handleChange}
          />
          <Button variant="outlined" color="primary" onClick={handleAddSessionType}>
            add
          </Button>
        </div>
        <div className={classes.sessionTypes}>
          <div className={classes.sessionTitles}>
            <Typography color="textPrimary" variant="body1" display="inline">
              Session Types:
            </Typography>
          </div>
          <div className={classes.chipsTypes}>
            {
              currentUser.session_type.split(',').map((session, i) => (
                <Chip label={session} key={uid(12)} onDelete={() => handleDeleteSessionType(i)} color="primary" variant="outlined" />
              ))
            }
          </div>
        </div>
        <FormControl variant="outlined" size="small" fullWidth className={classes.formControl}>
          <InputLabel id="days">Choose a day</InputLabel>
          <Select
            labelId="days"
            name="day"
            value={state.day}
            onChange={handleChange}
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
            name="from"
            value={state.from}
            onChange={handleChange}
          />
          <TextField
            label="available to"
            type="text"
            variant="outlined"
            size="small"
            placeholder="ex: 16:00"
            name="to"
            value={state.to}
            onChange={handleChange}
          />
          <Button variant="outlined" color="primary" onClick={handleAddSchedule}>
            add
          </Button>
        </div>
        {
          currentUser.schedule ? (
            <ScheduleDetails options schedule={currentUser.schedule} />
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
  setFlash: flash => dispatch(setFlash(flash)),
  updateSchedule: (schedule, user) => dispatch(updateSchedule(schedule, user)),
  updateSessionType: (sessionType, user) => dispatch(updateSessionType(sessionType, user)),
});

TeacherSchedule.propTypes = {
  currentUser: PropTypes.shape({
    schedule: PropTypes.shape({}),
    session_type: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
  setFlash: PropTypes.func.isRequired,
  updateSchedule: PropTypes.func.isRequired,
  updateSessionType: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TeacherSchedule);
