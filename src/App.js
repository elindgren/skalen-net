import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { grey, red } from '@material-ui/core/colors';

  import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: theme.spacing(0, 3),
    background: theme.color.background,
  },
  paper: {
    maxWidth: 400,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
    textAlign: 'left',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  toolbar: {
    flexGrow: 0,
  },
  avatar: {
    background: theme.color.avatar,
  },
  nameIcon: {
    color: theme.color.nameIcon,
  }
}));

const customTheme = createMuiTheme({
  color: {
    background: grey[900],
    avatar: grey[900],
    nameIcon: red[500],
  },
  palette: {
    primary: {
      main: red[900],
    },
    secondary: {
      main: grey[900],
    },
  },
});

const AppToolbar = () => {
  const classes = useStyles();
  return (
    <AppBar position="static" className={classes.toolbar}>
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Skålen namn generator
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

const newName = (setName, latestNames, setLatestNames) => {
  // TODO add logic for fetching name here
  const testName ="Testnamn" 
  setName(testName)
  toast.success("🎉 New name generated!", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })
  setLatestNames(latestNames.concat(testName))

}

const MainContent = () => {
  const [name, setName] = useState('')
  const [latestNames, setLatestNames] = useState([]) // Names generated this session TODO save in local storage?
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container alignItems={'center'} spacing={2}>
          <Grid item>
            <Avatar className={classes.avatar}>😈</Avatar>
          </Grid>
          <Grid item xs zeroMinWidth>
            <Typography>{"Tryck på knappen för ett nytt Skålen namn"}</Typography>
          </Grid>
          <Grid item xs={12} justify={'center'}>
            <Button variant="contained" color='secondary' onClick={() => newName(setName, latestNames, setLatestNames)}>
              Skålen namn
            </Button>
          </Grid>
        </Grid>
      </Paper>
      {name ? 
        (<Paper className={classes.paper}>
          <Grid item> 
            <Typography align={'center'} color='primary' variant='h2' style={{overflow: 'auto'}}>{name}</Typography>
          </Grid>
        </Paper>) : (<></>)
      }
      <Paper className={classes.paper}>
        <Typography variant='h5'>{"Senaste namn"}</Typography>
        <Divider />
        <List component="names">
          {latestNames.map((prevName, i) => {
            return (
            <ListItem>
              <ListItemAvatar>
                <Avatar className={classes.avatar}>
                  <PersonIcon className={classes.nameIcon} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={`${latestNames.length - i}. ${prevName}`} />
            </ListItem>)
          })}
        </List>
      </Paper>
    </div>
  )
}

const App = () => {
  return (
    <div style={{height: '100vh', display: 'flex', flexFlow: 'column'}}>
      <ToastContainer />
      <ThemeProvider theme={customTheme}>
        <AppToolbar/>
        <MainContent/>
      </ThemeProvider>
    </div>
  );
}

export default App;
