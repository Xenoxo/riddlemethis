// move most of this to Riddle Container and then separate parts into components

import React, { Component } from 'react';
import { Riddles } from '../../api/riddles';
import { createContainer } from 'meteor/react-meteor-data';


export default class Riddle extends Component {
  
  //in ES6 constructor == componentWillMount()
  constructor(props) {
    super(props);
    console.log();
    this.state = {
      hasVoted: false,
      showAnswerBox: false,
    };
  }

  getVotedStatus() {
  	return this.props.currentUser['listofvoted']
  }

  componentWillMount() {
  	if (this.props.currentUser['listofvoted'][this.props.riddle._id] !== undefined) {
  		let thisUser = this.props.currentUser;
	  	// this.setState({
	  	// 	hasVoted: thisUser['listofvoted'][this.props.riddle._id]['upvoted'];
	  	// }) 
  	}
  }

  componentDidMount() {
  	// if (this.props.currentUser['listofvoted'][this.props.riddle._id] !== undefined){
			// this.setState({
	  // 		hasVoted: this.props.currentUser['listofvoted'][this.props.riddle._id]['upvoted'],
	  // 	})  	
  	// }
  }
  
  toggleShowAnwerBox() {
  	this.setState({
  		showAnswerBox: !this.state.showAnswerBox,
  	})
  }

  //	
  //  If user has never voted on the riddle, then insert 
  //  entry into user collection under listofriddles obj
  //						-					-					-
  //  If already exists, then toggle the status of the 
  //  appropriate 'riddle id entry' and its upvoted value
  //  
	voteOnThisRiddle(){
		let newState;
		Meteor.call('riddlevote.flip', this.props.riddle._id, this.props.currentUser, 
			function(error,result){
				if (error){
					console.log(error);	
				}
				return result;
			}
		);
	}

	deleteThisRiddle(){	//Removes the given riddle from the backend
		Meteor.call('riddles.remove', this.props.riddle._id);
	}

	checkIfVoted(){ //check to see if user has voted at all on the riddle
		return Meteor.call('riddlevote.check', this.props.riddle._id, this.props.currentUser);
	}	

	//use this method to change the state which will dictate what is to be shown
	//regarding the answerbox
	getUpvoted(){
		console.log(this.props.voteStatus[this.props.riddle._id]['upvoted']);
		return this.props.voteStatus[this.props.riddle._id]['upvoted']; 
	}

	testMethod(){
		return true;
	}

	render(){
		return (
			<div className="riddle-object">
			<div className="col-sm-12 riddle-container">
					<div className={"upvote-box " + 
						(this.props.voteStatus[this.props.riddle._id]['upvoted'] ? "upvoted" : "not-upvoted")
					} 
						onClick={this.voteOnThisRiddle.bind(this)}>
						<i className="fa fa-chevron-up"></i>
						<div className="vote-count">
							{this.props.riddle.upvotes}
						</div>
					</div>
					

					<div className="riddle-content">
						<h3>
							{this.props.riddle.riddle}
						</h3>
						<div className="riddle-details">
							Submitted by {this.props.riddle.username} on {this.props.riddle.submitted.toDateString()}
						</div>
					</div>


					<div className="solved-spacer">
						<button className="btn btn-primary" onClick={this.toggleShowAnwerBox.bind(this)}>
							<i className="fa fa-question fa-3x"></i>
						</button>
						{ this.props.currentUserId === this.props.riddle.author ? 
							<div className="delete" onClick={this.deleteThisRiddle.bind(this)}>
								delete
							</div> : ''
						}
					</div>
				

				</div>
			{ this.state.showAnswerBox ? 
				<div className="col-sm-12 answer-box">
					
	      	
	    
	        <input
	        	className="answer-input"
	          type="text"
	          ref="theAnswer"
	          placeholder="Type your answers here!"
	        />
	    	
	      	<button type="submit" className="btn btn-success answer-submit">Submit</button>
	      	<button type="submit" className="btn btn-danger give-up">Give Up</button>
		        
	      	
				</div> : ''
			}
			</div>


			
			);
		}
}

export default theRiddleContainer = createContainer(({ params }) => {
  let theUser = Meteor.user();
  // console.log(Meteor.user()['listofvoted']);
  // console.log("from Riddle " + params);
  return {
  	voteStatus:Meteor.user()['listofvoted'],
	    // currentUserVote: theUser['listofvoted'],
    }

}, Riddle);