import React, { Component, PropTypes } from 'react';

import HeaderBarContainer from '../../ui/containers/HeaderBarContainer.jsx';

import { createContainer } from 'meteor/react-meteor-data';

import { Riddles } from '../../api/riddles.js';

class App extends Component {
 
  render() {
    return (
      <div className="container">
        <HeaderBarContainer />
        { this.props.children }
      </div>
    );
  }
}

export default createContainer(() => {
  Meteor.subscribe('riddles');
  return {
    currentUser: Meteor.user(),
    riddles: Riddles.find({}).fetch(),
  };
}, App);