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
		check(theUser, String)

		if (! this.userId) {
			throw new Meteor.Error('must log in to upvote');
		}
		//if [user has already upvoted] 
		// the current user's listofvoted returns "true" when I plug in (the id of the riddle given) , then decrease riddle's upvote count by 1
		// otherwise increase upvote by 1 AND add this riddle's id to listofvoted and set to 'true'

		// if(Meteor.users.findOne({_id:theUser}))

		Riddles.update({ _id: riddleId }, { $inc: {upvotes:1} });
		
		//
		//	possibly need to rethink whether I'm going to use arrays vs just a list of {lskajdfslakdjfsdakl: true, kjsdhfsakjhsadjh: false}
		//	
		//
		


		// Meteor.users.upsert({listofvoted:{idwouldgohere: 'asdfasfasdfdsafdsa'}});
	},

	'riddlevoted.update'(riddleId, user) {		

		// BELOW STATEMENT WORKS GREAT FOR INSERTING
		// Meteor.users.update({_id: userId._id },{$push:{listofvoted : { riddleid:"kjhdsfkjh13", voted:false, solved:false} }});

		// Work on updating
		// Meteor.users.update({_id: userId._id },{listofvoted})		

		// Meteor.users.upsert({'_id': userId._id}, {'listofvoted':riddleId} );
		let yo = "listofvoted"
		let key = "listofvoted" + ".riddle_id_goeshere.upvoted";
		let query = {} 
		query[key] = false;
		let changequery = {}
		changequery["listofvoted.riddle_id_goeshere.upvoted"] = true;

		let theuser = Meteor.users.findOne({'_id':user._id});
		let theuser2 = Meteor.users.update({'_id':user._id}, {$set : changequery});
		//let theuser3 = theuser2.update()

		console.log(result);

		// console.log("the riddleId = "+riddleId+" and userId = "+ userId._id);
		// console.log(Meteor.users.findOne({_id: userId._id}).listofvoted)
		// console.log("listofvoted = "+ userId.listofvoted);
	},


	//checks to see if the riddle has ever been voted on
	// FUTURE -> slowly turn this block into the actual insert method
	//
	//	-focus on being able to turn on/off for the riddle based on clicking on a button
	//	-wire this up to work with actual riddles
	
	'riddlevote.check'(riddleId, user) {
		let temp = Meteor.users.findOne({'_id':user._id}, query).listofvoted.riddle_id_goeshere.upvoted
		console.log(temp);
		return temp;
	},


	// Work on increasing / decreasing the number ????
	// Work on upserting the riddle with the appropriate information if it doesn't exist


	//preserving this for now, will combine the methods into one after proofing out the upserting part....
	'riddlevote.flip'(riddleId, user) { 
		let tempid = "riddle_id_goeshere";
		console.log(riddleId);
		let key = "listofvoted." + tempid + ".upvoted";
		let query = {};
		query[key] = 1;
		
		function pls(query,riddleId){
			return Meteor.users.findOne({'_id':user._id}, query).listofvoted.riddle_id_goeshere.upvoted
		}

		let isupvoted =	pls(query,riddleId);
		console.log("This is isupvoted BEFORE the flip: " + isupvoted);

		// behavior: the true/flase should flip everytime 
		
		let query2 = {};
		query2[key] = !isupvoted;
		Meteor.users.update({'_id':user._id}, {$set: query2})

		
		// let result2 = ( pls() === true);
		// let result3 = ( pls() === undefined);
		// console.log(key);
		
		// isupvoted =	pls(query,riddleId);
		// console.log("This is isupvoted AFTER the flip: " + isupvoted);
	},



});
