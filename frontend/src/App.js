import logo from './logo.svg';
import './App.css';
import Inbox from "./Inbox";
import Settings from "./Settings";
import CreateLesson from "./CreateLesson";
import CreateAssignment from "./CreateAssignment";
import StudentLesson from "./StudentLesson";
import Login from './Login'
import StaffDash from './StaffDashboard'
import StudentDash from './StudentDash'
import StaffLesson from './StaffLesson'
import StudentAssignment from './StudentAssignment'
import StaffAssignment from './StaffAssignment';

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Router>
        <Switch>
          <Route path="/inbox">
            <Inbox />
          </Route>
          <Route path="/settings">
            <Settings />
          </Route>
          <Route path="/createLesson">
            <CreateLesson />
          </Route>
          <Route path="/createAssignment">
            <CreateAssignment />
          </Route>
          <Route path="/lessonStudent">
            <StudentLesson />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/dashStaff">
            <StaffDash />
          </Route>
          <Route path="/dashStudent">
            <StudentDash />
          </Route>
          <Route path="/lessonStaff">
            <StaffLesson />
          </Route>
          <Route path="/assignmentStudent">
            <StudentAssignment />
          </Route>
          <Route path="/assignmentStaff">
            <StaffAssignment />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
