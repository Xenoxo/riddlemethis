// import Riddle from './Riddle.jsx';
// import { createContainer } from 'meteor/react-meteor-data';

// export default RiddleContainer = createContainer( () => {
//   let voteStatusBuilder;
//   const userReady = Meteor.user().ready();
//   // console.log("voteStatus is ASDFASDF");
//   if (Meteor.user() && userReady){
//   	voteStatusBuilder = Meteor.user()['listofvoted'];
//   }
//   return {
//   	voteStatus: voteStatusBuilder,
//   	test: "yo",
//   }
// }, Riddle);




// export default ListPageContainer = createContainer(({ params }) => {
//   const { id } = params;
//   const todosHandle = Meteor.subscribe('todos.inList', id);
//   const loading = !todosHandle.ready();
//   const list = Lists.findOne(id);
//   const listExists = !loading && !!list;
//   return {
//     loading,
//     list,
//     listExists,
//     todos: listExists ? list.todos().fetch() : [],
//   };
// }, ListPage);