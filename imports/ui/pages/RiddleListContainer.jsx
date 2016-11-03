// import { Riddles } from '../../api/riddles.js';
// import RiddleList from './RiddleList.jsx';
// import { composeAll } from 'react-komposer'; 
// import { composeWithTracker } from 'react-komposer';
// import Containers from "meteor/utilities:react-list-container";

// /*
//   Props passed in comes from Riddle page and determines the how
//   the collection is accessed such that sorting is implemented
// */
// const riddleComposer = function( props, onData ) {
//   const handle = Meteor.subscribe('riddles');
//   Tracker.autorun(() => {
//     const isReady = handle.ready();
//     console.log(`Handle is ${isReady ? 'ready' : 'not ready'}`);  
//   });

//   if ( handle.ready() ) {
//       let sortby = props.sortby
//       let sortorder = props.sortorder
//       let innerquery = {};
//       innerquery[sortby] = sortorder;
//       let sorttext = "sort";
//       let sortquery = {};
//       sortquery[sorttext] = innerquery;

//       console.log(sortquery);

//     if ( props.sortorder === -1 ){
//       let riddles = Riddles.find({}, sortquery).fetch();
//       console.log("sortquery");
//       onData( null, {riddles} );      
//     } else {
//       let riddles = Riddles.find({}, sortquery).fetch();
//       onData( null, {riddles} );
//     }    
//   } else {
//     console.log( 'not ready yet....this is where you put loading things' )
//   }
//   return () => { console.log( 'Riddle container disposed!') };

// }

// /*
//   The code below takes the newly created reactive
//   data sources above and 'pushes' them to RiddleList
// */
// export default composeWithTracker(riddleComposer)(RiddleList);

// /*
//   POTENTIAL IMPROVEMENTS
//   - can constrain what is being subscribed to for faster loading
// */

// // Composer needed in order for the data being composed
// // to be reactive
// // Code below is not something that is needed
// //
// // const userComposer = function( props, onData ) {
// //  const handle = Meteor.subscribe( 'users' );
// //   console.log("from RidlistCont "+Meteor.user());
// //   if ( handle.ready() ) {
// //    if ( Meteor.user() ) {
// //      const thisUser = Meteor.users.find( Meteor.user()._id ).fetch();
// //       console.log(thisUser);
// //      onData( null, {thisUser} );
// //     } else {
// //      const allUsers = Meteor.users.find().fetch(); 
// //      onData( null, {allUsers} );
// //     }
// //   } else {
// //    console.log( 'not ready yet....from userComposer' )
// //   }
// //   return () => { console.log( 'User container disposed!') };
// // };


// // export default composeAll(
// //   composeWithTracker(userComposer),
// //   composeWithTracker(riddleComposer)
// // )(RiddleList);