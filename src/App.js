import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from './screens/Home';
import Admin from './screens/Admin';
import TrainingForm from './screens/trainingLists/TrainingForm';
import NoScreen from './screens/NoScreen';

function App() {
  return (
    <Router>
        <nav className="navbar navbar-light bg-light">
          <Link className="navbar-brand" to="/">Home</Link>
          <Link className="navbar-brand" to="/admin">Admin</Link>
        </nav>
      <div className="container">
        <Switch>
          <Route startsWith exact strict path="/" render={(props) => <Home/>} />
          <Route path="/admin" render={(props) => <Admin/>} />
          <Route path="/form" render={(props) => <TrainingForm/>} />
          <Route component={NoScreen} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
