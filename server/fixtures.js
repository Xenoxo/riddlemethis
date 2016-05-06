import { Riddles } from '../imports/api/riddles';

let now = new Date();
if (Riddles.find().count() === 0) {
	Riddles.insert(	
		{
			riddle:"What is black and white and read all over",
			answers:["a newspaper", "newspaper", "news paper"],
			reveals: 0,
			solves: 0,
			author:'ME',
			submitted: new Date(now - 7 * 3600 * 1000),
			upvotes:0,
			difficulty:0,
		}		
	);
	Riddles.insert(
		{
				riddle:"This is not a good riddle",
				answers:["a newspaper", "newspaper", "news paper"],
				reveals: 0,
				solves: 0,
				author:'ME',
				submitted: new Date(now - 7 * 3600 * 1000),
				upvotes:0,
				difficulty:0,
			}
	);
} else {
	console.log("no need to add fixtures");
}

console.log(Riddles.find().count());
console.log(Riddles.find().count());