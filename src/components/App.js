import React, { useState } from 'react';
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import PinterestIcon from '@material-ui/icons/Pinterest';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
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
import useStyles from './AppStyles';

function App() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
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
          <IconButton onClick={handleDrawerClose}>
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
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        { open && <div className={classes.drawerHeader} />}
        <div>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
        </div>
        <div className={classes.body}>
          <div className={classes.bodyHeader}>
            <h1 className={classes.marginBottomNone}>FIND A TEACHER</h1>
            <p className={classes.marginTopNone}>There are here for you</p>
          </div>
          <div>
            <p>Placeholder</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
