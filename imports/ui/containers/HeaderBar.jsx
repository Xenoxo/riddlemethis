//could use refactoring

import React, { Component } from 'react';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';
import { Link } from 'react-router';

export class HeaderBar extends Component {
	render() {
		return (
			<div className="jumbotron header-container">
        <div>
          <h2 className="header-text">We got the best riddles</h2>
          Got a good riddle? Login/Sign Up to submit!
        </div>

        <div className="user-options">
          <AccountsUIWrapper/>
          <button className="btn btn-info"><Link to="/submit">New Riddle</Link></button>
        </div>						
			</div>
		);
	}
}
