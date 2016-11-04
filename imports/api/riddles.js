import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Session } from 'meteor/session';

export const Riddles = new Mongo.Collection('riddles');

//	Server side methods to publish the two collections
//	
if (Meteor.isServer) {
	Meteor.publish('riddles', function(){
		// pushing all the riddles....

		return Riddles.find();
	});
	Meteor.publish("users", function(){
  	return Meteor.users.find()
	});
}


Meteor.methods({	

	/*
		Method to insert riddle and subsequently creates a record in the associated user's account
	*/
	'riddles.insert'(riddle, answer) {
		check(riddle, String);
		check(answer, Array);
		if (! this.userId) {// Make sure the user is logged in before inserting
			throw new Meteor.Error('not-authorized');
		}

   let riddleId = Riddles.insert({ //adds the Riddle to the riddle collection and returns id
      riddle: riddle,
			answers: answer,
			reveals: 0,
			solves: 0,
			author_id: this.userId,
			username: Meteor.users.findOne(this.userId).username,
			submitted: new Date(),
			upvotes: 0,
			difficulty: 0,
    });

		let queryStr = "listofvoted."+riddleId+".upvoted";
		let query = {};
		query[queryStr] = false;
		Meteor.users.upsert(this.userId, {$set:query}); //updates user's account with record of this riddle
	},

	/*
		Method removes given riddle
	*/
	'riddles.remove'(riddleId) {
		check(riddleId, String);
		Riddles.remove(riddleId);
	},

	/*
		Method to give a riddle an upvote OR take one away
		if the riddle already has one from this user.	
		
		Tests to see if user has ever interacted with this 
		riddle and upsert a new record if not, otherwise the
		method will increase/decrease existing value by 1

		Returns boolean value
	*/
	'riddlevote.flip'(riddleId, user) { 
		if (! this.userId) {
			throw new Meteor.Error('must log in to upvote');
		}

		// Builds a query
		let currentUser = Meteor.users.findOne(user._id);
		let queryStr = "listofvoted."+riddleId+".upvoted";
		let query = {};
		let num;
		let newResult; //what the method returns to the client -> affects the upvote ui

		if ( currentUser['listofvoted'][riddleId] === undefined ) { //this is the case ONLY if the riddle has never been interacted with
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

	/*
		The method tests the user answer by looping through
		all the answers of the riddle and if a match (ignoring case)
		is found, the method then inserts an entry in the user's
		profile and updates the riddle's solve count.

		Returns true only if answer matches (ignoring case).
	*/
	'riddleanswer.check'(riddleId, user, userAnswer) {
		if (! this.userId) {
			throw new Meteor.Error('must log in to upvote');
		}		
		userAnswer = userAnswer.toLowerCase();
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
				return true;
			}
		}
		
		return false;
	},

	/*
		Method alerts user to the answers of the riddle and then counts
		the riddle as solved. Increase the "reveal" count of the riddle by 1

		Returns the Answer(s) for the given Riddle
	*/
	'riddleanswer.reveal'(riddleId, user) { 
			if (! this.userId) {
				throw new Meteor.Error('must log in to upvote');
			}
			let riddle = Riddles.findOne(riddleId);
			let theAnswer = riddle.answers;
			let currentUser = Meteor.users.findOne(user._id);
			let queryStr = "listofvoted."+riddleId+".solved";
			let query = {};
			let newResult;
			query[queryStr] = false;
			Meteor.users.upsert(user._id, {$set:query});
			Riddles.upsert({_id: riddleId}, {$inc:{'reveals':1}});
			return theAnswer;
		},

});
