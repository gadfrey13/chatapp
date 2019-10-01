import React from "react";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { classes } from "istanbul-lib-coverage";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  errUser: {
    color: 'red',
    textAlign: 'center'
  },
}));

const User = props => {
  //props
  const { getUser, socket } = props;

  const [open, setOpen] = React.useState(true);
  const [user, setUser] = React.useState("");
  const [isUnique, setIsUnique] = React.useState(true);

  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };


  const checkUserNameUnique = (callback) => {
      socket.emit('check-unique-user', user);
      socket.on('unique-user', bool => {
          if(bool){
            callback();
          }else{
            setIsUnique(false);
          }
      })
  }

  const handleClose = () => {
    if (user.length > 0) {
      getUser(user);
      setOpen(false);
      socket.emit('new-user', user);
    }
  };

  const onChange = event => {
    setUser(event.target.value);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Welcome fellow chatter!!!!</DialogTitle>
      {!isUnique ? <div className={classes.errUser}>USERNAME NOT AVAILABLE</div> : <div></div>}
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="User Name"
          type="text"
          variant="outlined"
          onChange={onChange}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => checkUserNameUnique(handleClose)} color="primary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default User;
