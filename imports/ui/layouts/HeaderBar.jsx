//could use refactoring

import React, { Component } from 'react';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';
import { Link } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';

class HeaderBarContainer extends Component {
	render() {
		return (
			<div className="jumbotron header-container">
        <div>
          
            <Link to="/">
              <h2 className="header-text">We got the best riddles</h2>
            </Link>
            { this.props.currentUser ? 
              <div>Welcome <strong>{this.props.currentUser.username}</strong>, time to be the riddle-champ!</div>
              : "Got a good riddle? Login/Sign Up to submit!"
            }
          </div>

          <div className="user-options">
            <AccountsUIWrapper/>
            { this.props.currentUser ?
              <Link to="/submit-riddle">
                <button className="btn btn-info">
                  New Riddle
                </button>
              </Link>
              : "Login to Submit"
            }
          </div>
			</div>
		);
	}
}

HeaderBarContainer.propTypes = {
  currentUser: React.PropTypes.object,
}

export default createContainer(() => {
  return {
    currentUser: Meteor.user(),
  };
}, HeaderBarContainer);