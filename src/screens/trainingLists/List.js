import React, { Component } from 'react';

class List extends Component {

  render () {
    const { trainings } = this.props;
    return (
      <div className="main-container lists">
        <div className="heading">List of Schedule</div>
        <div className="list-container p-3 mb-5 bg-white rounded accordion" id="accordionExample">
          <div className="card">
            {trainings.map((training, index) => {
              return (
                <div key={index}>
                  <div
                    className={`card-header ${training.sections.length > 0 ? 'show-pointer' : ''}`}
                    id={index}
                    data-toggle="collapse"
                    data-target={`#collapse${index}`}
                    aria-expanded="false"
                  >
                    <h4 className="mb-0 title">
                      {new Intl.DateTimeFormat('en-GB', {
                          month: 'long',
                          day: '2-digit',
                      }).format(new Date(training.startDate))} - {training.title}
                      {training.sections.length > 0 && <i className="arrow-down"/>}
                    </h4>
                  </div>

                  {training.sections.length > 0 &&
                    <div id={`collapse${index}`} className="collapse lists" data-parent="#accordionExample">
                      <div className="card-body">
                        {training.sections.map((section, sectionIndex) => {
                          return (
                            <div className="section" key={sectionIndex}>
                              <p className="section-title">
                                {new Intl.DateTimeFormat('en-AU', {
                                    hour: 'numeric',
                                }).format(new Date(section.time))} - {section.title}
                              </p>
                              <ul className="topics">
                                {section.topics.map((topic, topicIndex) => {
                                  return (
                                    <li className="title" key={topicIndex}>
                                      {topic.title}
                                    </li>
                                  )
                                })}
                              </ul>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  }
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default List;
