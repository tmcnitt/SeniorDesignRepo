import logo from './logo.svg';
import './App.css';
import Inbox from './Inbox'
import Settings from './Settings'
import StudentDash from './StudentDash'
import StaffLesson from './StaffLesson'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


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
        <Route path="/dashStudent">
          <StudentDash />
        </Route>
        <Route path="/lessonStaff">
          <StaffLesson />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
