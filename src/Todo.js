import React, { useState } from "react";
import "./Todo.css";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Button,
  Modal,
} from "@material-ui/core";
import db from "./firebase";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { makeStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  rounded: {
    color: "#fff",
    backgroundColor: green[500],
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    // border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Todo(props) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState(props.todo.todo);
  const [time, setTime] = useState(props.todo.time);

  console.log(props.todo);

  const classes = useStyles();

  const updateTodo = () => {
    db.collection("todos")
      .doc(props.todo.id)
      .set({ todo: input, time: time }, { merge: true });

    setOpen(false);
  };

  return (
    <div className="wrapper">
      <Box className="container">
        <Modal
          open={open}
          onclose={(e) => setOpen(false)}
          className={classes.paper}
          id="modal"
        >
          <div>
            <h1>Edit Todo</h1>
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
            <h1>Edit Time</h1>
            <input
              value={time}
              onChange={(event) => setTime(event.target.value)}
            />
            <div className="button-div">
              <Button onClick={updateTodo}>Update Todo</Button>
            </div>
          </div>
        </Modal>
        <List className="todo-list">
          <ListItem className="details">
            <div className="text">
              <ListItemAvatar>
                <Avatar
                  variant="rounded"
                  className={classes.rounded}
                  id="image"
                >
                  <AssignmentIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={props.todo.todo}
                secondary={props.todo.time}
              />
            </div>
          </ListItem>
          <div className="inline">
            <Button onClick={(e) => setOpen(true)}>Edit</Button>
            <DeleteForeverIcon
              onClick={(event) =>
                db.collection("todos").doc(props.todo.id).delete()
              }
            />
          </div>
        </List>
      </Box>
    </div>
  );
}

export default Todo;
