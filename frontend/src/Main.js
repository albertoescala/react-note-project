import React from "react";
import { Switch, Route } from "react-router-dom";
import NoteHandler from "./containers/NotesHandler";
import SelectNote from "./containers/SelectNote";

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={NoteHandler} />
      <Route path="/editNote/:id" component={SelectNote} />
    </Switch>
  </main>
);

export default Main;
