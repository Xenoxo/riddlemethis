import React, { Component } from 'react';
import RiddleList from '../pages/RiddleList.jsx';


import {composeWithTracker} from 'react-komposer';

function composer(props, onData) {
	const handle = Meteor.subscribe('users');
  if (handle.ready()) {
    // console.log('users ready!');
		if (Meteor.user()) {
    const thisuser = Meteor.users.find(Meteor.user()._id).fetch();
    console.log(thisuser);
    onData(null, {thisuser});
    } else{
    	const allusers = Meteor.users.find().fetch();	
    	onData(null, {allusers});
    }
  } else {
  	
  	console.log('not ready yet....this is where you put loading things')
  }
};

export default composeWithTracker(composer)(RiddleList);