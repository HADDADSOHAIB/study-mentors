import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 220;

export default makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    minHeight: 20,
    justifyContent: 'space-between',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  socialMedia: {
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  footer: {
    textAlign: 'center',
  },
  p: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  item: {
    '&:hover': {
      color: '#eee',
      backgroundColor: '#0dd42b',
    },
  },
  itemText: {
    fontWeight: '900',
    fontSize: '1.2rem',
  },
  title: {
    margin: 5,
    fontFamily: 'Pacifico',
  },
}));
