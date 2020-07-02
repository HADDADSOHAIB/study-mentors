import React, { useEffect } from 'react';
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import PinterestIcon from '@material-ui/icons/Pinterest';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { withRouter } from 'react-router';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FunctionsIcon from '@material-ui/icons/Functions';
import TouchAppIcon from '@material-ui/icons/TouchApp';
import ExploreIcon from '@material-ui/icons/Explore';
import TranslateIcon from '@material-ui/icons/Translate';
import LocalBarIcon from '@material-ui/icons/LocalBar';
import PersonIcon from '@material-ui/icons/Person';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import BACKEND from '../backend';
import authHeader from '../authHeader';
import useStyles from './DrawerAppStyles';
import { closeDrawer } from '../actions/layoutCreators';
import { selectCategory } from '../actions/teacherCreators';
import { setUser, clearUser } from '../actions/authCreators';

function DrawerApp({
  closeDrawer,
  open,
  category,
  location,
  history,
  selectCategory,
  setUser,
  clearUser,
  currentUser,
}) {
  const classes = useStyles();
  const theme = useTheme();

  const handleCategorySelection = category => {
    selectCategory(category);
    if (location.pathname !== '/') {
      history.push('/');
    }
  };

  useEffect(() => {
    axios.get(`${BACKEND}/api/v1/login/get_user_by_token`, { headers: authHeader })
      .then(res => {
        setUser(
          res.data.current_user,
          res.data.account_type,
          res.data.categories,
        );
      })
      .catch(() => clearUser);
    return () => '';
  }, []);

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <TouchAppIcon />
        <h3 className={classes.title}>Study mentor</h3>
        <IconButton onClick={closeDrawer}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </div>
      <List>
        <Divider />
        <ListItem
          button
          classes={{ root: clsx(classes.item, category === 'Maths' && location.pathname === '/' && classes.selected) }}
          onClick={() => handleCategorySelection('Maths')}
        >
          <ListItemIcon><FunctionsIcon /></ListItemIcon>
          <ListItemText primary="MATHS" classes={{ primary: classes.itemText }} />
        </ListItem>
        <Divider />
        <ListItem
          button
          classes={{ root: clsx(classes.item, category === 'Physics' && location.pathname === '/' && classes.selected) }}
          onClick={() => handleCategorySelection('Physics')}
        >
          <ListItemIcon><ExploreIcon /></ListItemIcon>
          <ListItemText primary="PHYSICS" classes={{ primary: classes.itemText }} />
        </ListItem>
        <Divider />
        <ListItem
          button
          classes={{ root: clsx(classes.item, category === 'Arts' && location.pathname === '/' && classes.selected) }}
          onClick={() => handleCategorySelection('Arts')}
        >
          <ListItemIcon><LocalBarIcon /></ListItemIcon>
          <ListItemText primary="ARTS" classes={{ primary: classes.itemText }} />
        </ListItem>
        <Divider />
        <ListItem
          button
          classes={{ root: clsx(classes.item, category === 'English' && location.pathname === '/' && classes.selected) }}
          onClick={() => handleCategorySelection('English')}
        >
          <ListItemIcon><TranslateIcon /></ListItemIcon>
          <ListItemText primary="ENGLISH" classes={{ primary: classes.itemText }} />
        </ListItem>
        <Divider />
      </List>
      { currentUser ? (
        <List>
          <Divider />
          <ListItem
            button
            classes={{ root: clsx(classes.item, location.pathname === '/profil' && classes.selected) }}
            onClick={() => history.push('profil')}
          >
            <ListItemIcon><PersonIcon /></ListItemIcon>
            <ListItemText primary="PROFIL" classes={{ primary: classes.itemText }} />
          </ListItem>
          <Divider />
          <ListItem button classes={{ root: classes.item }}>
            <ListItemIcon><CalendarTodayIcon /></ListItemIcon>
            <ListItemText primary="BOOKINGS" classes={{ primary: classes.itemText }} />
          </ListItem>
          <Divider />
        </List>
      ) : (
        <List>
          <Divider />
          <ListItem
            button
            classes={{ root: clsx(classes.item, location.pathname === '/signin' && classes.selected) }}
            onClick={() => history.push('signin')}
          >
            <ListItemIcon><PersonIcon /></ListItemIcon>
            <ListItemText primary="Sign In" classes={{ primary: classes.itemText }} />
          </ListItem>
          <Divider />
          <ListItem
            button
            classes={{ root: clsx(classes.item, location.pathname === '/signup' && classes.selected) }}
            onClick={() => history.push('signup')}
          >
            <ListItemIcon><CalendarTodayIcon /></ListItemIcon>
            <ListItemText primary="Sign Up" classes={{ primary: classes.itemText }} />
          </ListItem>
          <Divider />
        </List>
      )}
      <div>
        <div className={classes.socialMedia}>
          <TwitterIcon />
          <FacebookIcon />
          <PinterestIcon />
        </div>
        <div className={classes.footer}>
          <p className={classes.p}>
            Study mentors, 2020
          </p>
        </div>
      </div>
    </Drawer>
  );
}

DrawerApp.propTypes = {
  closeDrawer: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  category: PropTypes.string.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  selectCategory: PropTypes.func.isRequired,
  clearUser: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({}).isRequired,
  history: PropTypes.shape([]).isRequired,
};

const mapDispatchToProps = dispatch => ({
  closeDrawer: () => dispatch(closeDrawer()),
  selectCategory: category => dispatch(selectCategory(category)),
  clearUser: () => dispatch(clearUser()),
  setUser: (currentUser, accountType, categories) => dispatch(
    setUser(currentUser, accountType, categories),
  ),
});

const mapStateToProps = state => ({
  open: state.layout.drawer.open,
  category: state.teacher.selectedCategory,
  currentUser: state.auth.currentUser,
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DrawerApp));
