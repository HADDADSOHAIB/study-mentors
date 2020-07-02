import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  card: {
    width: '400px',
    margin: '20px',
  },
  textField: {
    margin: '20px 0',
  },
  submit: {
    display: 'flex',
    justifyContent: 'center',
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 10,
  },
  Checkbox: {
    display: 'flex',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
  },
}));

export default useStyles;
