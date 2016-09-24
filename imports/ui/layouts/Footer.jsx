import React, { Component } from 'react';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';
import { Link } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';

export default class Footer extends Component {
	render() {
		return (
			<div className="footer">
      Contact me!
      <div className="footer-container">
          <div className="contact-points">
            <i className="fa fa-2x fa-twitter"></i>
          </div>
          <div className="contact-points">
            <i className="fa fa-2x fa-github-alt"></i>
          </div>
          <div className="contact-points">
            <i className="fa fa-2x fa-envelope"></i>
          </div>
        </div>
			</div>
		);
	}
}