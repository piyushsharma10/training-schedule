import React, { Component } from 'react';
import EmptyList from './trainingLists/EmptyList';
import List from './trainingLists/List';
import { Link } from "react-router-dom";

class Admin extends Component {

  constructor (props) {
    super(props);
    this.state = {
      trainings: JSON.parse(window.localStorage.getItem('trainings') || "[]"),
    }
  }

  render () {
    const { trainings } = this.state;
    if (trainings.length) {
      return (
        <div className="admin">
          <List trainings={trainings}/>
          <Link className="training-btn btn btn-primary" to="/form">Create new schedule</Link>
        </div>
      )
    } else {
      return(
        <EmptyList/>
      )
    }
  }

}

export default Admin;
