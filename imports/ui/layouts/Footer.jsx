import React, { Component } from 'react';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';
import { Link } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';

export default class Footer extends Component {
	render() {
		return (
			<div className="footer">
        
        <div className="footer-container">
            <div className="contact-points">
              
            </div>
            <div className="contact-points">
              
                <a href="https://twitter.com/besttimyouknow"><i className="fa fa-2x fa-twitter"></i></a>
                <a href="https://github.com/Xenoxo"><i className="fa fa-2x fa-github-alt"></i></a>
                <a href="https://github.com/Xenoxo"><i className="fa fa-2x fa-envelope"></i></a>
              
            </div>
            <div className="contact-points">
              
            </div>
        </div>
			</div>
		);
	}
}