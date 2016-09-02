import React, { Component, PropTypes } from 'react';

import { createContainer } from 'meteor/react-meteor-data';
import HeaderBar from './HeaderBar.jsx';

export default class App extends Component {
 
  render() {
    return (
      <div className="container">
        <HeaderBar />
        { this.props.children }
      </div>
    );
  }
}
