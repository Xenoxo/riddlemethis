import React, { Component } from 'react';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';
import { Link } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';

export default class Footer extends Component {
	render() {
		return (
			<div className="footer">
        
        <div className="footer-container">
            <div className="credits">
              <p>Design by</p>
              <p><a href="#">Kathrina Czarny</a></p>
            </div>                    
            <div className="credits">
              <p>Built by</p>
              <p><a href="http://timyanchenwang.com" target="_blank">Tim Yanchen Wang</a></p>
            </div>
            <div className="credits">
              <p>Riddles from</p>
              <p><a href="http://darktowercompendium.com" target="_blank">The Darktower Compendium</a></p>
            </div>
        </div>
			</div>
		);
	}
}

            // <div className="contact-points">
            //   <a href="https://twitter.com/besttimyouknow"><i className="fa fa-2x fa-twitter"></i></a>
            //   <a href="https://github.com/Xenoxo"><i className="fa fa-2x fa-github-alt"></i></a>
            //   <a href="mailto:info@timyanchenwang.com"><i className="fa fa-2x fa-envelope"></i></a>
            // </div>