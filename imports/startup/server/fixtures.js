import { Riddles } from '../../api/riddles';

if ( Meteor.users.find().count() === 0 ) {
    Accounts.createUser({
        username: 'Abel_Vannay',
        email: '',
        password: 'gileadofold',
        listofvoted: {},
    });
}

let defaultRiddles = [
	{
		riddle:"What can burn the eyes, sting the mouth, yet be consumed?",
		answer:"salt",
	},
	{
		riddle:"This crime attempted... shame on thee! This crime commited... thou wilt go free!",
		answer:"suicide",
	},
	{
		riddle:"What is it the more you take, the more you leave behind?",
		answer:"footsteps",
	},
	{
		riddle:"What has four wheels and flies?",
		answer:"a garbage truck",
	},
	{
		riddle:"When is a door not a door?",
		answer:"when it's a jar",
	},
	{
		riddle:"What has eyes yet cannot see? (This has four answers)",
		answer:"a potatoe, a needle, a storm, and a true lover",
	},
	{
		riddle:"What is the difference between a cat and a complex sentence?",
		answer:"a cat has it's claws at the end of it's paws, and a complex sentence has it's pause at the end of it's clause",
	},
	{
		riddle:"Black within and red without. Four corners round about. What am I?",
		answer:"a chimney",
	},
	{
		riddle:"Long legs, crooked thighs, little head, and no eyes. What am I?",
		answer:"tongs",
	},
	{
		riddle:"Nearly bright as the sun, sometimes dark as space. Like a pearl on black velvet, with diamonds twinkling in a case. What am I?",
		answer:"the moon",
	},
	{
		riddle:"I move without wings, between silken strings, I leave as you find, my substance behind. What am I?",
		answer:"a spider",
	},
	{
		riddle:"A little house full of meat, no door to go in and eat. What am I?",
		answer:"a nut",
	},
	{
		riddle:"Riddle me, riddle me, what is that, over the head and under the hat?",
		answer:"hair",
	},
	{
		riddle:"White and thin, red within, with a nail at the end. What is it?",
		answer:"a finger",
	},
	{
		riddle:"A skin have I, more eyes than one. I can be very nice when I am done. What am I?",
		answer:"a potato",
	},
	{
		riddle:"Riddle me, riddle me, riddle me ree, I saw a nut cracker up in a tree. What was it?",
		answer:"a squirrel",
	},
	{
		riddle:"Take off my skin - I won't cry, but you will! What am I?",
		answer:"onion",
	},
	{
		riddle:"What goes up when the rain comes down?",
		answer:"umbrella",
	},
	{
		riddle:"What gets bigger the more you take away from it?",
		answer:"a hole",
	},
	{
		riddle:"What is pronounced like one letter, written with three letters, and belongs to all animals?",
		answer:"EYE",
	},
	{
		riddle:"My first is foremost legaly. My second circles outwardly. My third leads all in vistory. My fourth twice ends a nominee. What am I?",
		answer:"LOVE",
	},
	{
		riddle:"I reach for the sky, but clutch to the ground; sometimes I leave, but I am always around. What am I?",
		answer:"a tree",
	},
	{
		riddle:"Tear one off and scratch my head, what once was red is black instead. What am I?",
		answer:"a match",
	},
	{
		riddle:"What is the beginning of eternity, the end of time and space; the beginning of every end, and the end of every race?",
		answer:"the letter E",
	},
	{
		riddle:"What is not alive but still is?",
		answer:"a ghost",
	},
	{
		riddle:"A warrior amongst the flowers, he bears a thrusting sword. He uses it when'er he must to defend his golden hoard. What is he?",
		answer:"a bee",
	},
	{
		riddle:"If you have it, you want to share it. If you share it, you don't have it. What is it?",
		answer:"a secret",
	},
	{
		riddle:"Face with a tree, skin like the sea. A great beast I am, yet vermin frightens me. What am I?",
		answer:"an elephant",
	},
	{
		riddle:"A wee wee man in a red coat. Staff in my hand, stone in my throat. What am I?",
		answer:"a cherry",
	},
	{
		riddle:"I run around the city, but I never move. What am I?",
		answer:"a wall",
	},
	{
		riddle:"I am not alive, but I grow; I don't have lungs, but I need air; I don't have a mouth, but water kills me. What am I?",
		answer:"fire",
	},
	{
		riddle:"They have not flesh, nor feathers, nor scales, nor bone. Yet they have fingers and thumbs of their own. What are they?",
		answer:"gloves",
	},
	{
		riddle:"In many hallways you would stand, if not with this in hand. What am I?",
		answer:"a key",
	},
	{
		riddle:"I'm the source of all emotion, but I'm caged in a white prison. What am I?",
		answer:"a heart",
	},
	{
		riddle:"By Moon or by Sun, I shall be found. Yet I am undone, if there's no light around.",
		answer:"a shadow",
	},
	{
		riddle:"The more you have of it, the less you see. What is it?",
		answer:"darkness",
	},
	{
		riddle:"Foward I am heavy, but backward I am not. What am I?",
		answer:"a TON",
	},
	{
		riddle:"I have a face, yet no senses. But I don't really care, because time is of the essence.",
		answer:"a clock",
	},
	{
		riddle:"My life is often a volume of grief, your help is needed to turn a new leaf. Stiff is my spine and my body is pale, but I'm always ready to tell a tale.",
		answer:"a book",
	},
	{
		riddle:"Who is he that runs without a leg and his house on his back?",
		answer:"a snail",
	},
	{
		riddle:"My first is twice in apple but not once in tart. My second is in liver but not in heart. My third is in giant and also in ghost. Whole I'm best when I am roast. What am I?",
		answer:"pig",
	},
	{
		riddle:"My maker never wants me, my buyer never uses me, my user never sees me. What am I?",
		answer:"a coffin",
	},
	{
		riddle:"What can be heard and caught but never seen?",
		answer:"a remark",
	},
	{
		riddle:"I sleep by day, I fly by night. I have no feathers to aid my flight.",
		answer:"a bat",
	},
	{
		riddle:"My face is pale, and full and fair, and round it bearly spots there are by day. Indead I seem less bright, I'm only seen sometimes at night. And when the sun has gone to bed I then begin to show my head. What am I?",
		answer:"the moon",
	},
	{
		riddle:"My first is in ocean but never in sea, my second's in wasp but never in bee. My third is in glider and also in flight, my whole is a creature that comes out at night.",
		answer:"owl",
	},
	{
		riddle:"I saw a man in white, he looked quite a sight. He was not old, but he stood in the cold. And when he felt the sun he started to run. Who could he be? Please answer me.",
		answer:"a snowman",
	},
	{
		riddle:"What has six legs, two heads, four ears, two hands, but walks on four feet?",
		answer:"a horse & rider",
	},
	{
		riddle:"I'm a busy active creature, full of mirth and play by nature; nimbly I skip from tree to tree, to get the food that's fit for me; then let me hear, if you can tell, what is my name and where I dwell!",
		answer:"squirrel & tree",
	},
	{
		riddle:"What always goes to bed with his shoes on?",
		answer:"a horse",
	},
	{
		riddle:"What runs around all day then lies under the bed with its tongue hanging out?",
		answer:"your shoe",
	},
	{
		riddle:"What kind of nut has no shell?",
		answer:"a doughnut",
	},
	{
		riddle:"When is a boat not a boat?",
		answer:"when it's a float",
	},
	{
		riddle:"What runs around a city but never moves?",
		answer:"a wall",
	},
	{
		riddle:"I'm very tempting, so it's said, I have a shiny coat of red, and my flesh is white beneath. I smell so sweet, taste good to eat, and help to guard your teeth. What am I?",
		answer:"an apple",
	},
	{
		riddle:"I open wide and tight I shut, sharp am I and paper-cut fingers too, so do take care, I'm good and bad, so best beware.",
		answer:"scissors",
	},
]

if (Riddles.find().count() === 0) {
	let riddleMaster = Meteor.users.findOne({username: 'Abel_Vannay'});
	let now = new Date();
		if (Riddles.find().count() === 0) {
			for (i=0; i<defaultRiddles.length; i++) {
				let theRiddle = defaultRiddles[i];
				Riddles.insert(
					{
						riddle: theRiddle['riddle'],
						answers:[theRiddle['answer']],
						reveals: 0,
						solves: 0,
						author_id: riddleMaster._id,
						username: riddleMaster.username,
						email:'',
						submitted: new Date(now - 7 * 3600 * 1000),
						upvotes:0,
						difficulty:0,
					}		
				);
			}
		} else {
			console.log("no need to add fixtures");
		}
}
