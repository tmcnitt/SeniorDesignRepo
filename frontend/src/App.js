import logo from "./logo.svg";
import "./App.css";
import Inbox from "./Inbox";
import Settings from "./Settings";
import CreateLesson from "./CreateLesson";
import CreateAssignment from "./CreateAssignment";
import StudentLesson from "./StudentLesson";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/inbox">
          <Inbox />
        </Route>
        <Route path="/settings">
          <Settings />
        </Route>
        <Route path="/createlesson">
          <CreateLesson />
        </Route>
        <Route path="/createassignment">
          <CreateAssignment />
        </Route>
        <Route path="/studentlesson">
          <StudentLesson />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
