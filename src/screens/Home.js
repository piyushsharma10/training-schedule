import React, { Component } from 'react';
import List from './trainingLists/List';

class Home extends Component {

  constructor (props) {
    super(props)
    this.state = {
      trainings: JSON.parse(window.localStorage.getItem('trainings') || "[]"),
    }
  }

  render () {
    const { trainings } = this.state;
    return (
      <div className="main-container">
        {trainings.length ? <List trainings={trainings}/> :
          <div className="text-center">
            <h4>No list yet. Waiting for admin to setup schedule</h4>
          </div>
        }
      </div>
    )
  }

}

export default Home;
