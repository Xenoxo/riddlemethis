import React, { Component, PropTypes } from 'react';

import { HeaderBarContainer } from '../../ui/containers/HeaderBarContainer.jsx';

export default class App extends Component {
 
  render() {
    return (
      <div className="container">
        <HeaderBarContainer />
        { this.props.children }        
      </div>
    );
  }
}
