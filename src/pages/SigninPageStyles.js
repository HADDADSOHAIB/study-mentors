import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '90vh',
    flexDirection: 'column',
    '& *': {
      fontFamily: 'Architects Daughter',
    },
  },
  card: {
    margin: '20px',
    width: '400px',
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 10,
  },
  half: {
    width: '50%',
  },
  textField: {
    margin: '20px 0',
  },
  submit: {
    display: 'flex',
    justifyContent: 'center',
  },
  appbar: {
    backgroundColor: '#0dd42b',
  },
}));

export default useStyles;
