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

	//
	//	Method to insert riddle
	//
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

	//
	// Will test to see if user has ever 
	// interacted with this riddle and upsert if not
	// otherwise method will flip the existing value
	//
	// Also will inc/dec the upvote count for the given riddle
	// 
	'riddlevote.flip'(riddleId, user) { 
		if (! this.userId) {
			throw new Meteor.Error('must log in to upvote');
		}	

		// ADD FEATURE: Check to see if the riddle is in the embedded document
		let currentUser = Meteor.users.findOne(user._id);
		let queryStr = "listofvoted."+riddleId+".upvoted";
		let query = {};
		let num;
		let newResult; //what the method returns to the client -> affects the upvote ui

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


	//	could use significant refactoring
	//	
	'riddleanswer.check'(riddleId, user, userAnswer) { 
		if (! this.userId) {
			throw new Meteor.Error('must log in to upvote');
		}		
		userAnswer = userAnswer.toLowerCase();
		//	test looping through all the answers and returning
		//	true only if answer matches (ignoring case)
		
		let riddle = Riddles.findOne(riddleId);
		let theAnswer = riddle.answers;
		for (var i = theAnswer.length - 1; i >= 0; i--) {
			if ( userAnswer === theAnswer[i] ){ //user answer matches existing answer

				let currentUser = Meteor.users.findOne(user._id);
				let queryStr = "listofvoted."+riddleId+".solved";
				let query = {};
				let newResult;
				query[queryStr] = true;
				Meteor.users.upsert(user._id, {$set:query}); // upserts and updates query
				
				//
				// find the riddle by id and increment solves by 1
				// (+) should only do this if the riddle was previously unsolved to the user
				//

				Riddles.upsert({_id: riddleId}, {$inc:{'solves':1}});
				console.log(Meteor.users.findOne(user._id));

				return true;
			}
		}
		return false;
	},

'riddleanswer.reveal'(riddleId, user) { 
		if (! this.userId) {
			throw new Meteor.Error('must log in to upvote');
		}
		let riddle = Riddles.findOne(riddleId);
		let theAnswer = riddle.answers;
		return theAnswer;
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
