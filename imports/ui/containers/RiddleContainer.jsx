import React, { Component } from 'react';
import RiddleList from '../pages/RiddleList.jsx';


import {composeWithTracker} from 'react-komposer';

function composer(props, onData) {
	const handle = Meteor.subscribe('users');
  if (handle.ready()) {
    console.log('users ready!');
    const thisuser = Meteor.users.find(Meteor.user()._id).fetch();
    onData(null, {thisuser});
  } else {
  	console.log('not ready yet....')
  }
};

export default composeWithTracker(composer)(RiddleList);