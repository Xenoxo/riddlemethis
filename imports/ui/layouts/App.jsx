import React, { Component, PropTypes } from 'react';

import { createContainer } from 'meteor/react-meteor-data';
import HeaderBar from './HeaderBar.jsx';
import Footer from './Footer.jsx';


import Alert from 'react-s-alert';
// mandatory
import 'react-s-alert/dist/s-alert-default.css';

// optional - you can choose the effect you want
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import 'react-s-alert/dist/s-alert-css-effects/scale.css';
import 'react-s-alert/dist/s-alert-css-effects/bouncyflip.css';
import 'react-s-alert/dist/s-alert-css-effects/flip.css';
import 'react-s-alert/dist/s-alert-css-effects/genie.css';
import 'react-s-alert/dist/s-alert-css-effects/jelly.css';
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css';

export default class App extends Component {
 
  render() {
    return (
      <div className="container">
        <HeaderBar />
        { this.props.children }
        <br/>
        <Footer />
        <Alert stack={{limit: 3}} />
      </div>
    );
  }
}
