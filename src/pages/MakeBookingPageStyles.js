import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    minHeight: '90vh',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  media: {
    height: 0,
    paddingTop: '50%', // 16:9
  },
  card: {
    minWidth: '500px',
  },
  info: {
    maxWidth: '70%',
    display: 'flex',
    justifyContent: 'center',
  },
  avatar: {
    backgroundColor: red[500],
  },
  categories: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  appbar: {
    backgroundColor: '#0dd42b',
  },
  book: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '30px',
  },
  times: {
    display: 'flex',
    justifyContent: 'center',
  },
  margin: {
    marginTop: '10px',
  },
  makebooking: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },
}));

export default useStyles;
