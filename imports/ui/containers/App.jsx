import React, { Component, PropTypes } from 'react';

import { Riddles } from '../../api/riddles.js';
import Riddle from '../components/Riddle.jsx'

import { createContainer } from 'meteor/react-meteor-data';

import AccountsUIWrapper from './AccountsUIWrapper.jsx';

class App extends Component {
  logMe(){
    console.log(this.props.riddles);
  }

  renderRiddle() {
    return this.props.riddles.map((riddle) => (
      <Riddle riddle={riddle}/>
    ));
  }
 
  render() {
    return (
      <div className="container">
        
        <header className="jumbotron header-container">
          <div>
            <h2 className="header-text">We got the best riddles</h2>
            Got a good riddle? Login/Sign Up to submit!
          </div>

          <div className="user-options">
            <AccountsUIWrapper/>
            <button className="btn btn-info">New Riddle</button>
          </div>
        </header>
        { this.logMe() }
        { this.renderRiddle() }
      </div>
    );
  }
}

App.propTypes = {

}

// This piece of code makes the component take
// reactive data from the underlying MongoDB
export default createContainer(() => {
  return {
    riddles: Riddles.find({}).fetch(),
  };
}, App);

/* 


import RiddleContainer from './RiddleContainer.jsx';
import Riddle from './Riddle.jsx';
 

// App component - represents the whole app
class App extends Component {
 
  renderRiddle() {
    return this.props.riddles.map((riddle) => (
      <Riddle riddle={riddle}/>
    ));
  }
 
  render() {
    return (
      <div className="container">
        
        <header className="jumbotron header-container">
          <div>
            <h2 className="header-text">We got the best riddles</h2>
            Got a good riddle? Login/Sign Up to submit!
          </div>

          <div className="user-options">
            <AccountsUIWrapper/>
            <button className="btn btn-info">New Riddle</button>
          </div>
        </header>

        {this.renderRiddle()}
      </div>
    );
  }
}



*/