import React, { useState, useEffect } from "react";
import "./App.css";
import { Button, FormControl, Input, InputLabel } from "@material-ui/core";
import Todo from "./Todo";
import db from "./firebase";
import firebase from "firebase";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        console.log(snapshot.docs.map((doc) => doc.data()));
        setTodos(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            todo: doc.data().todo,
            time: doc.data().time,
          }))
        );
      });
  }, []);

  const updateList = (event) => {
    event.preventDefault();
    if (todos.lastIndexOf(input) === -1) {
      db.collection("todos").add({
        todo: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        time: time,
      });
    }
    setInput("");
    setTime("");
  };

  return (
    <div className="App">
      <h1 className="title">
        <span>Todo</span> List
      </h1>
      <form className="input-form" justify="space-around">
        <span className="form">
          <FormControl>
            <InputLabel>Write A Todo</InputLabel>
            <Input
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
          </FormControl>
        </span>
        <span className="form">
          <FormControl>
            <InputLabel>Set A Time</InputLabel>
            <Input
              value={time}
              onChange={(event) => setTime(event.target.value)}
            />
          </FormControl>
        </span>
        <span className="button-span">
          <Button
            disabled={!input}
            type="submit"
            onClick={updateList}
            variant="contained"
            color="primary"
          >
            Add Todo
          </Button>
        </span>
      </form>
      <ul>
        {todos.map((todo) => (
          <Todo todo={todo} />
        ))}
      </ul>
    </div>
  );
}

export default App;
