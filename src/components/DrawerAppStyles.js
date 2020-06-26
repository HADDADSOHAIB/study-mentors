import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 220;

export default makeStyles(theme => ({
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
  selected: {
    color: '#eee',
    backgroundColor: '#0dd42b',
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
