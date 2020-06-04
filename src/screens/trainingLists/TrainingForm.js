import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import { withRouter } from 'react-router-dom'
import "react-datepicker/dist/react-datepicker.css";


class TrainingForm extends Component {

  constructor(props){
    super(props)
    this.state = {
      training: props.training || {
        title: "",
        startDate: new Date(),
        sections: []
      }
    };
  }

  removeSection(index) {
    const {training} = this.state;
    this.state.training.sections.splice(index, 1);
    this.setState({training});
  }

  addTopic(index){
    const { training } = this.state;
    const topics = training.sections[index].topics;

    topics.push({
        title: ""
    });
    this.setState({training});
  }

  handleChange(e, object, type) {
    const { training } = this.state;

    if (type === 'time' || type === 'startDate') {
      object[type] = e;
    } else {
      object[type] = e.target.value;
    }
    this.setState({training});
 }

 onSubmit(e) {
   e.preventDefault();
   const trainings = JSON.parse(window.localStorage.getItem('trainings') || "[]");
   trainings.push(this.state.training);
   window.localStorage.setItem('trainings', JSON.stringify(trainings));
   this.props.history.push('/admin')
 }

  render () {
    const { training } = this.state;
    return (
      <div className="main-container form">
        <form onSubmit={(e) => this.onSubmit(e)}>
          <div className="form-row">
            <div className="col-md-12 mb-3">
              <label >Title</label>
              <input
                type="text"
                placeholder="Title"
                className="form-control"
                onChange={(e) => this.handleChange(e, training, 'title')}
                value={training.title}
                required
              />
            </div>
            <div className="col-md-12">
              <label >Select Date</label>
              <DatePicker
                selected={training.startDate}
                onChange={(e) => this.handleChange(e, training, 'startDate')}
                minDate={new Date()}
                placeholderText="Click to select a date"
                className='date-field'
              />
            </div>
          </div>

          {training.sections.map((section, sectionIndex) => {
            return (
              <div className="sub-section" key={sectionIndex}>
                <div className="form-row mt-3">
                  <div className="col-md-12 mb-3">
                    <label>Section Form</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Section Name"
                      onChange={(e)=> this.handleChange(e, training.sections[sectionIndex], 'title')}
                      value={section.title}
                      required
                    />
                  </div>
                  <div className="col-md-12">
                    <label>Select Time</label>
                    <DatePicker
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={60}
                      timeCaption="Time"
                      dateFormat="h:mm aa"
                      placeholderText="Click to select a time"
                      selected={section.time}
                      onChange={(e) => this.handleChange(e, training.sections[sectionIndex], 'time')}
                      className='date-field'
                    />
                  </div>
                </div>
                <i
                  onClick={()=> this.removeSection(sectionIndex)}
                  className="close"
                />

                {section.topics.length ? <label className="mt-3">Topics</label> : ''}
                {section.topics.map((topic, topicIndex) => {
                  return (
                    <div key={topicIndex} className="form-row topic-section mt-1 mb-2">
                      <span
                        onClick={()=> {
                          section.topics.splice(topicIndex,1);
                          this.setState({training});
                        }}
                        className="del-topic"
                      >
                        Delete
                      </span>
                      <div className="col-md-11">
                        <input type="text"
                          className="form-control"
                          onChange={(e)=> this.handleChange(e, training.sections[sectionIndex].topics[topicIndex], 'title')}
                          value={topic.title}
                          placeholder="Topic Name"
                          required
                        />
                      </div>
                    </div>
                  )
                })}
                <div className="text-right mt-3 mb-3 ">
                  <span
                    onClick={(e)=>{
                      e.preventDefault();
                      this.addTopic(sectionIndex)}
                    }
                    className="add-topic"
                    title="Add Topic"
                  >
                    Add Topic
                  </span>
                </div>
              </div>
            )
          })}
          <button
            onClick={()=> {
              training.sections.push({
                title: '',
                time: new Date(),
                topics: []
              });
              this.setState({training})
            }}
            className="btn btn-outline-warning add-section mb-3 mt-3"
            title="Add Section"
          >
            Add Section
          </button>
          <button type="submit" className="btn btn-primary submit-btn">Submit</button>
        </form>
      </div>
    )
  }
}

export default withRouter(TrainingForm);
