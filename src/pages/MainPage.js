import React, { useState } from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Slide from '@material-ui/core/Slide';
import Paper from '@material-ui/core/Paper';
import useStyles from './MainPageStyles';
import TeacherCard from '../components/TeacherCard';

function MainPage() {
  const classes = useStyles();
  const [checked, setChecked] = useState(true);
  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <div className={classes.body}>
      <div className={classes.bodyHeader}>
        <h1 className={clsx(classes.marginBottomNone, classes.marginTopNone)}>
          FIND A TEACHER
        </h1>
        <p className={classes.marginTopNone}>They are here for you</p>
        <button onClick={handleChange} type="button">ok</button>
      </div>
      <div>
        <Slide direction="left" in={checked} mountOnEnter unmountOnExit>
          <Paper elevation={4} className={classes.paper}>
            <TeacherCard />
          </Paper>
        </Slide>
      </div>
    </div>
  );
}

export default MainPage;
