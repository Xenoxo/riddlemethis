import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

// import { Meteor } from 'meteor/mongo';

export const Riddles = new Meteor.Collection('riddles');
	
if (Meteor.isServer) {
	Meteor.publish('riddles', function riddlesPublication(){
		return Riddles.find();
	});
	Meteor.publish("users", function(){
  	return Meteor.users.find()
	});
}

Meteor.methods({
	'riddles.insert'(riddle, answer) {
		check(riddle, String);
		check(answer, String);

		// Make sure the user is logged in before inserting
		if (! this.userId) {
			throw new Meteor.Error('not-authorized');
		}

   let riddleId = Riddles.insert({ //adds the Riddle to the riddle collection and returns id
      riddle: riddle,
			answers: answer,
			reveals: 0,
			solves: 0,
			author: this.userId,
			username: Meteor.users.findOne(this.userId).username,
			submitted: new Date(),
			upvotes: 0,
			difficulty: 0,
    });

		let queryStr = "listofvoted."+riddleId+".upvoted";
		let query = {};
		query[queryStr] = false;
		Meteor.users.upsert(this.userId, {$set:query}); // upsert the new query
	},

	'riddles.remove'(riddleId) {
		check(riddleId, String);
		Riddles.remove(riddleId);
	},

	'riddles.upvote'(riddleId, theUser) {
		check(riddleId, String);
		check(theUser, String)

		if (! this.userId) {
			throw new Meteor.Error('must log in to upvote');
		}

		Riddles.update({ _id: riddleId }, { $inc: {upvotes:1} });
	
	},

	
	// Will test to see if user has ever 
	// interacted with this riddle and upsert if not
	// otherwise method will flip the existing value
	// Also will inc/dec the upvote count for the given riddle
	// 
	'riddlevote.flip'(riddleId, user) { 
		if (! this.userId) {
			throw new Meteor.Error('must log in to upvote');
		}		
		// Check to see if the riddle is in the embedded document

		let currentUser = Meteor.users.findOne(user._id);
		let queryStr = "listofvoted."+riddleId+".upvoted";
		let query = {};
		let num;
		let newResult;

		if ( currentUser['listofvoted'][riddleId] === undefined ) { //this is the case only if the riddle has never been interacted with

			query[queryStr] = true;
			newResult = true;
			Meteor.users.upsert(user._id, {$set:query}); // upsert the new query
			num = 1;
		} else { //all other casese

			newResult = !currentUser['listofvoted'][riddleId]['upvoted'];
			if (newResult) { //newResult is already flipped...
				num = 1;
			} else {
				num = -1;
			}
			query[queryStr] = newResult;
			Meteor.users.upsert(user._id, {$set:query})
		}
		Riddles.update(riddleId, {$inc:{"upvotes":num}});
		return newResult;
	},

	// //checks to see if the riddle has ever been voted on
	// // FUTURE -> slowly turn this block into the actual insert method
	// //
	// //	-focus on being able to turn on/off for the riddle based on clicking on a button
	// //	-wire this up to work with actual riddles
	
	// 'riddlevote.check'(riddleId, user) {
	// 	let temp = Meteor.users.findOne({'_id':user._id}, query).listofvoted.riddle_id_goeshere.upvoted
	// 	console.log(temp);
	// 	return temp;
	// },

});
