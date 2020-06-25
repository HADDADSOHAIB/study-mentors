import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import PinterestIcon from '@material-ui/icons/Pinterest';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
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
import useStyles from './DrawerAppStyles';
import { closeDrawer } from '../actions/layoutCreators';

function DrawerApp({ closeDrawer, open }) {
  const classes = useStyles();
  const theme = useTheme();
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
        <ListItem button classes={{ root: classes.item }}>
          <ListItemIcon><FunctionsIcon /></ListItemIcon>
          <ListItemText primary="MATHS" classes={{ primary: classes.itemText }} />
        </ListItem>
        <Divider />
        <ListItem button classes={{ root: classes.item }}>
          <ListItemIcon><ExploreIcon /></ListItemIcon>
          <ListItemText primary="PHYSICS" classes={{ primary: classes.itemText }} />
        </ListItem>
        <Divider />
        <ListItem button classes={{ root: classes.item }}>
          <ListItemIcon><LocalBarIcon /></ListItemIcon>
          <ListItemText primary="ARTS" classes={{ primary: classes.itemText }} />
        </ListItem>
        <Divider />
        <ListItem button classes={{ root: classes.item }}>
          <ListItemIcon><TranslateIcon /></ListItemIcon>
          <ListItemText primary="ENGLISH" classes={{ primary: classes.itemText }} />
        </ListItem>
        <Divider />
      </List>

      <List>
        <Divider />
        <ListItem button classes={{ root: classes.item }}>
          <ListItemIcon><PersonIcon /></ListItemIcon>
          <ListItemText primary="PROFIL" classes={{ primary: classes.itemText }} />
        </ListItem>
        <Divider />
        <ListItem button classes={{ root: classes.item }}>
          <ListItemIcon><CalendarTodayIcon /></ListItemIcon>
          <ListItemText primary="SECHDULE" classes={{ primary: classes.itemText }} />
        </ListItem>
        <Divider />
      </List>
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
};

const mapDispatchToProps = dispatch => ({
  closeDrawer: () => dispatch(closeDrawer()),
});

const mapStateToProps = state => ({
  open: state.layout.drawer.open,
});

export default connect(mapStateToProps, mapDispatchToProps)(DrawerApp);