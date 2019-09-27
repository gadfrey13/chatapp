import React, { useState, useEffect, useRef } from "react";
import {
  Paper,
  Grid,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  dimension: {
    height: "800px",
    width: "900px"
  },
  chatBox: {
    height: "700px",
    width: "900px",
    backgroundColor: "gray",
    overflow: "scroll",
    overflowX: 'hidden'
  },
  input: {
    height: "100px",
    width: "900px",
    backgroundColor: "pink"
  }
}));

const Chat = props => {
  //props values
  const { user, socket } = props;

  //states
  const [textField, setTextField] = useState("");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  //variable
  const classes = useStyles();
  const prevValue = usePrevious(message);
  const messagesEndRef = useRef(null);

  //sockets receivers
  socket.on("chat-message", data => {
    const str = `${data.name}: ${data.message}`;
    setMessage(str);
  });

  socket.on("user-connected", name => {
    setMessage(`${name} connected`);
  });

  //functions
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "auto" });
  };

  function usePrevious(value) {
    // The ref object is a generic container whose current property is mutable ...
    // ... and can hold any value, similar to an instance property on a class
    const ref = useRef();

    // Store current value in ref
    useEffect(() => {
      ref.current = value;
    }, [value]); // Only re-run if value changes

    // Return previous value (happens before update in useEffect above)
    return ref.current;
  }

  const input = event => {
    setTextField(event.target.value);
  };

  const sendMessage = event => {
    if (event.keyCode === 13 || event.which === 13) {
      socket.emit("send-chat-message", textField);
      const str = `${user}: ${textField}`;
      setMessage(str);
      event.target.value = "";
    }
  };

  const allMessages = messages.map((message, i) => {
    return (
      <ListItem key={i}>
        <ListItemText primary={message} />
      </ListItem>
    );
  });

  //hooks
  useEffect(scrollToBottom, [message]);
  useEffect(() => {
    if (message !== prevValue) {
      setMessages([...messages, message]);
    }
  });

  return (
    <div>
      <Grid container justify="center">
        <Paper className={classes.dimension} elevation={10}>
          <Grid justify="flex-start" container>
            <Grid item>
              <Paper className={classes.chatBox}>
                <List>{allMessages}</List>
                <div ref={messagesEndRef} />
              </Paper>
            </Grid>
            <Grid item>
              <Paper className={classes.input}>
                <TextField
                  id="outlined-full-width"
                  placeholder="Chat"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  onChange={input}
                  onKeyDown={sendMessage}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </div>
  );
};

export default Chat;
