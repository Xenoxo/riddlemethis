
Accounts.onCreateUser(function(options, user) {
  user.listofvoted = {};
  return user;
});
