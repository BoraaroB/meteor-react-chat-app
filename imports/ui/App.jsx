import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Messages } from '../api/messages.js';

// import Task from './Task.jsx';
// import AccountsUIWrapper from './AccountsUIWrapper.jsx';

// App component - represents the whole app
class App extends Component {
  constructor(props) {
    super(props);
  }

  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
    Meteor.call('messages.insert', text);

    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  // Render messages
  renderMessages() {
    let messages = this.props.messages;

    return messages.map((message, index) => {

      return (
        <li key={index} className="media">
          <div className="media-body">
            <div className="media">
              <a className="pull-left" href="#">
                <img className="media-object img-circle img-responsive" src="http://lorempixel.com/60/60/people/" />
              </a>
              <div className="media-body" >
                {message.text}
                <br />
                <small className="text-muted"> | {message.createdAt.toString()}</small>
                <hr />
              </div>
            </div>
          </div>
        </li>
      );
    });
  }

  render() {
    return (
    <div className="container">
      <div className="row">
        <h3 className="text-center" >Simple Chat App</h3>
        <div className="col-md-12 chat-box">
          <div className="panel panel-info">
            <div className="panel-heading">
              Chat
            </div>
            <div className="panel-body">

              <ul className="media-list">
                {this.renderMessages()}
              </ul>
            </div>

            <form className="new-message" onSubmit={this.handleSubmit.bind(this)}>
              <div className="panel-footer">
                <div className="input-group">
                  <input type="text" name="text" ref="textInput" className="form-control" placeholder="Enter Message" />
                  <span className="input-group-btn">
                    <button className="btn btn-info send" type="submit">Send</button>
                  </span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default createContainer(() => {

  Meteor.subscribe('messages');

  return {
    messages: Messages.find({}).fetch(),
  };
}, App);
