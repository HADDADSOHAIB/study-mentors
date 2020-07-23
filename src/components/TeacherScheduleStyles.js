import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  card: {
    width: '400px',
    margin: '20px',
  },
  textField: {
    margin: '20px 0',
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '10px',
  },
  newSession: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'centre',
    margin: '20px 0',
  },
  sessionTypes: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'centre',
    margin: '20px 0',
  },
  sessionTitles: {
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  chipsTypes: {
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
    flexWrap: 'wrap',
  },
}));

export default useStyles;
