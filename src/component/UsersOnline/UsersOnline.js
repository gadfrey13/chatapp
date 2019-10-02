import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {TextField} from "@material-ui/core";
const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
    backgroundColor: "green",
    color: "white",
    "&:hover": {
      backgroundColor: "green"
    }
  },
  input: {
    display: "none"
  },
  messendger: {
    
  },
  dialogPaper: {
    minHeight: '70vh',
    maxHeight: '70vh',
},
}));

const UsersOnline = props => {
  const { usersOnline, user } = props;
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const onChange = (event) => {
      setMessage(event.target.value)
  }

  const sendMessage = (event) => {
    console.log(event.currentTarget.name);
    const send = event.currentTarget.name === "sendMessageDirect";
    if(send || event.which === 13 || event.keyCode === 13){
    
        setMessage("");
    }

  }



  const results = Object.keys(usersOnline).map(key => {
    return [key, usersOnline[key]];
  });
  const directMessage = key => {
    console.log(key);
    handleClickOpen();
  };

  const filteredResult = results.filter((pair,i) => {
      return pair[1] !== user;
  })

  const userList = filteredResult.map((pair, i) => {
    return (
      <Button
        className={classes.button}
        fullWidth
        key={i}
        variant="contained"
        onClick={() => directMessage(pair[0])}
      >
        {pair[1]}
      </Button>
    );
  });
  return (
    <div>
      {userList}
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        className={classes.messendger}
        maxWidth="sm"
        fullWidth
        classes={{ paper: classes.dialogPaper }}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Messenger
        </DialogTitle>
        <DialogContent dividers></DialogContent>
        <DialogActions>
        <TextField
                  className={classes.inputBar}
                  id="outlined-full-width"
                  placeholder="Type message here........"
                  fullWidth
                  variant="filled"
                  margin="normal"
                  onChange={onChange}
                  onKeyDown={sendMessage}
                  value={message}
                  InputLabelProps={{
                    disableUnderline: true
                  }}
                />
          <Button onClick={sendMessage} color="primary" variant="contained" name="sendMessageDirect">
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UsersOnline;
