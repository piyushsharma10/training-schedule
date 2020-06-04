import React, { Component } from 'react'
import { Link } from "react-router-dom"

class EmptyList extends Component {

  render () {
    return (
      <div className="main-container text-center">
        <h1 className="mb-5">No List yet!!</h1>
        <Link className="btn btn-primary" to="/form">Create new schedule</Link>
      </div>
    )
  }

}

export default EmptyList;
