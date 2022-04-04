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
import ForgotPassword from './ForgotPassword';

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { useEffect } from 'react';
import { AppContext, useProvideAppContext, setupLogin } from "./AppContext.js";
import { PrivateRoute } from './PrivateRoute.js'

function App() {
  let context = useProvideAppContext();

  useEffect(() => {
    setupLogin(context);
  }, [])

  if (!context.setup) {
    return <div></div>
  }

  const signout = () => {
    context.signout()
  }

  return (
    <AppContext.Provider value={context}>
      <div className="bg-gray-50 min-h-screen">
        <Router>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/">
              <Login />
            </Route>
            <Route path="/forgot">
              <ForgotPassword />
            </Route>
            <PrivateRoute path="/inbox">
              <Inbox />
            </PrivateRoute>
            <PrivateRoute path="/settings">
              <Settings />
            </PrivateRoute>
            <PrivateRoute path="/createLesson">
              <CreateLesson />
            </PrivateRoute>
            <PrivateRoute path="/createAssignment">
              <CreateAssignment />
            </PrivateRoute>
            <PrivateRoute path="/lessonStudent">
              <StudentLesson />
            </PrivateRoute>
            <PrivateRoute path="/dashStaff">
              <StaffDash />
            </PrivateRoute>
            <PrivateRoute path="/dashStudent">
              <StudentDash />
            </PrivateRoute>
            <PrivateRoute path="/lessonStaff/:lessonid">
              <StaffLesson />
            </PrivateRoute>
            <PrivateRoute path="/assignmentStudent">
              <StudentAssignment />
            </PrivateRoute>
            <PrivateRoute path="/assignmentStaff">
              <StaffAssignment />
            </PrivateRoute>
          </Switch>
        </Router>
      </div>
    </AppContext.Provider>
  );
}

export default App;
