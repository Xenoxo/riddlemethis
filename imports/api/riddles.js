import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

// import { Meteor } from 'meteor/mongo';

export const Riddles = new Meteor.Collection('riddles');


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
		}

	});