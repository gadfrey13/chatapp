import React, { useState, useEffect, useRef } from "react";
import Scroll from "../component/utility/Scroll";
import {
  Paper,
  Grid,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Input
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Message from "../component/Message/Message";
import zIndex from "@material-ui/core/styles/zIndex";

const useStyles = makeStyles(theme => ({
  dimension: {
    height: "800px",
    width: "900px"
  },
  chatBox: {
    height: "700px",
    width: "700px",
    backgroundColor: "#b4b7b8"
  },
  users: {
    height: "700px",
    width: "200px",
    backgroundColor: "white"
  },
  input: {
    height: "100px",
    width: "900px",
    backgroundColor: "#b4b7b8",
  },
  inputBar: {
    backgroundColor: "white",
    marginTop: "0px",
    marginBottom: "0px",
  },
  item: {
    paddingTop: '0px',
    paddingBottom: '0px'
  }
}));

const Chat = props => {
  //props values
  const { user, socket } = props;

  //states
  const [textField, setTextField] = useState("");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [data, setData] = useState({
    count: 0
  });

  //variable
  const classes = useStyles();
  const prevValue = usePrevious(message);
  const messagesEndRef = useRef(null);

  //sockets receivers
  socket.on("chat-message", data => {
    const str = `receive: ${data.name}: ${data.message}`;
    setMessage(str);
  });

  socket.on("user-connected", name => {
    setMessage(`status: ${name}: connected`);
  });

  //socket user disconnected
  socket.on("user-disconnected", name => {
    setMessage(`status: ${name}: disconnected`);
  });

  //number of people in the chat
  socket.on("users-online", count => {
    setData({ ...data, ["count"]: count });
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
      const str = `send: ${user}: ${textField}`;
      setMessage(str);
      event.target.value = "";
    }
  };

  const allMessages = messages.map((messageArr, i) => {
    const split = messageArr.split(":");
    console.log(split.length);
    return (
      <ListItem key={i} className={classes.item}>
        <ListItemAvatar>
         {split.length > 1 ? <h1>{`${split[1]} : `} </h1> : <div> </div>} 
        </ListItemAvatar>
        <ListItemText primary={<Message message={messageArr}/>} />
      </ListItem>
    );
  });

  //hooks
  useEffect(scrollToBottom, [message]);
  useEffect(() => {
    if (message !== prevValue ) {
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
                <Scroll>
                  <List>{allMessages}</List>
                  <div ref={messagesEndRef} />
                </Scroll>
              </Paper>
            </Grid>

            <Grid item>
              <Paper className={classes.users}>
                <Typography>Users {data.count}</Typography>
                <Scroll></Scroll>
              </Paper>
            </Grid>
            <Grid item>
              <Paper className={classes.input}>
                <TextField
                  className={classes.inputBar}
                  id="outlined-full-width"
                  placeholder="Type message here........"
                  fullWidth
                  variant="filled"
                  margin="normal"
                  onChange={input}
                  onKeyDown={sendMessage}
                  InputLabelProps={{
                    disableUnderline: true
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
