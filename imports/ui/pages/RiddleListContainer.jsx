import RiddleList from './RiddleList.jsx';

import { Riddles } from '../../api/riddles.js';

import Containers from "meteor/utilities:react-list-container";
import { composeWithTracker } from 'react-komposer';
import { composeAll } from 'react-komposer'; 


// Composing user data
// currently not used directly, helpful to have everything load
// 
// However - the structure would be helpful in the future for potential other things
// 
const userComposer = function( props, onData ) {
  const handle = Meteor.subscribe( 'users' );
  if ( handle.ready() ) {
    console.log( 'userComposer ready ' );  
    if ( Meteor.user() ) {
      const thisuser = Meteor.users.find( Meteor.user()._id ).fetch();
      onData( null, {thisuser} );
    } else {
      const allusers = Meteor.users.find().fetch(); 
      onData( null, {allusers} );
    }
  } else {
    console.log( 'not ready yet, from userComposer' )
  }
  return () => { console.log( 'User container disposed!') };
};

// Composing the riddles data
const riddleComposer = function( props, onData ) {
  const handle = Meteor.subscribe('riddles');
  // Tracker.autorun(() => {
  //   const isReady = handle.ready();
  //   console.log(`Handle is ${isReady ? 'ready' : 'not ready'}`);  
  // });
  // console.log("handle is ")
  // console.log(handle)
    const isReady = handle.ready();
    console.log(`Handle is ${isReady ? 'ready' : 'not ready'}`);  
  if ( handle.ready() ) {
      let sortby = props.sortby
      let sortorder = props.sortorder
      let innerquery = {};
      innerquery[sortby] = sortorder;
      let sorttext = "sort";
      let sortquery = {};
      sortquery[sorttext] = innerquery;
      // console.log(sortquery);
      let riddles = Riddles.find({}, sortquery).fetch();
      onData( null, {riddles} );      
  } else {
    console.log( 'not ready yet....this is where you put loading things' )
  }
  return () => { console.log( 'Riddle container disposed!') };

}

export default composeAll(
  composeWithTracker(userComposer),
  composeWithTracker(riddleComposer)
)(RiddleList);
