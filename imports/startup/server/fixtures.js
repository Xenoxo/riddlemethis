import { Riddles } from '../../api/riddles';

let now = new Date();
if (Riddles.find().count() === 0) {
	Riddles.insert(	
		{
			riddle:"What is black and white and read all over",
			answers:["a newspaper", "newspaper", "news paper"],
			reveals: 0,
			solves: 0,
			author:'fixture-man',
			username:'Fixture Man',
			email:'yoyoma@yoyoma.com',
			submitted: new Date(now - 7 * 3600 * 1000),
			upvotes:0,
			difficulty:0,
		}		
	);
	Riddles.insert(
		{
			riddle:"This is not a good riddle",
			answers:["yep"],
			reveals: 0,
			solves: 0,
			author:'fixture-man',
			username:'Fixture Man',
			email:'yoyoma@yoyoma.com',
			submitted: new Date(now - 7 * 3600 * 1000),
			upvotes:0,
			difficulty:0,
		}
	);
} else {
	console.log("no need to add fixtures");
}

console.log(Riddles.find().count());