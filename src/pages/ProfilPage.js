import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import useStyles from './ProfilPageStyles';
import StudentProfil from '../components/StudentProfil';
import TeacherProfil from '../components/TeacherProfil';

const ProfilePage = ({ currentUser, accountType }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      { currentUser && accountType === 'Student' ? (
        <StudentProfil />
      ) : ''}
      { currentUser && accountType === 'Teacher' ? (
        <TeacherProfil />
      ) : ''}
    </div>
  );
};

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  accountType: state.auth.accountType,
});

ProfilePage.propTypes = {
  currentUser: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }),
  accountType: PropTypes.string,
};

ProfilePage.defaultProps = {
  currentUser: null,
  accountType: null,
};

export default connect(mapStateToProps)(ProfilePage);
