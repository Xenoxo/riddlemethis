
Accounts.onCreateUser(function(options, user) {
  user.listofvoted = {
  	"riddle_id_goeshere":
  		{	
  			"upvoted":false,
  			"solved":false,
  		},
  	
  	"other_riddle_id":
  		{	
  			"upvoted":false,
  			"solved":false,
  		},  	
  };
  return user;
});

  // var d6 = function () { return Math.floor(Random.fraction() * 6) + 1; };
  // user.dexterity = d6() + d6() + d6();
  // // We still want the default hook's 'profile' behavior.
  // if (options.profile)
  //   user.profile = options.profile;
  
