import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

// import { Meteor } from 'meteor/mongo';

export const Riddles = new Meteor.Collection('riddles');
	
if (Meteor.isServer) {
	Meteor.publish('riddles', function riddlesPublication(){
		return Riddles.find();
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

    Riddles.insert({
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
	},
	'riddles.remove'(riddleId) {
		check(riddleId, String);
		Riddles.remove(riddleId);
	},
	'riddles.upvote'(riddleId, theUser) {
		check(riddleId, String);
		if (! this.userId) {
			throw new Meteor.Error('must log in to upvote');
		}
		//if user has already upvoted, then downvote, otherwise upvote
		Riddles.update({ _id: riddleId }, { $inc: {upvotes:1} });
		// Meteor.users.upsert({listofvoted:{idwouldgohere: 'asdfasfasdfdsafdsa'}});
	},
	'listofvoted.update'(userId) {
		Meteor.users.upsert({_id: userId },{$push : {listofvoted : { riddleid: '12312312312123', voted: false } }});
	}

});
