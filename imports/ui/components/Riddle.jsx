// move most of this to Riddle Container and then separate parts into components

import React, { Component } from 'react';
import { Riddles } from '../../api/riddles';

export default class Riddle extends Component {
  
  constructor(props) {
    super(props);
 
    this.state = {
      hasVoted: false,
      showAnswerBox: false,
    };
  }
  
  toggleShowAnwerBox() {
  	this.setState({
  		showAnswerBox: !this.state.showAnswerBox,
  	})
  }

  //	
  //  If user has never voted on the riddle, then insert entry into user collection under listofriddles obj
  //  If already exists, then toggle the status of the appropriate 'riddle id entry' and it's voted value
  //  
	voteOnThisRiddle(){
		Meteor.call('riddlevote.flip', this.props.riddle._id, this.props.currentUser);
		// this.setState({
  //     hasVoted: !this.state.hasVoted,
  //   });

    
		// manipulate the dom using the results from the meteor call - possibly store the results in a state
		// the below code worked (kind of) in the className, removed now for above solution attempt
		// this.checkIfVoted.bind(this) === true ? "not-upvoted" : "upvoted" 
	}

	deleteThisRiddle(){	//Removes the given riddle from the backend
		Meteor.call('riddles.remove', this.props.riddle._id);
	}

	checkIfVoted(){ //check to see if user has voted at all on the riddle
		return Meteor.call('riddlevote.check', this.props.riddle._id, this.props.currentUser);
	}	

	//use this method to change the state which will dictate what is to be shown
	//regarding the answerbox
	changeState(){
		return true;
	}

	render(){
		return (
			<div className="riddle-object">
			<div className="col-sm-12 riddle-container">


					<div className={"upvote-box " + (this.state.hasVoted ? "upvoted" : "not-upvoted")} onClick={this.voteOnThisRiddle.bind(this)}>
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
			{/* Use state here
						
					If the state is in answer mode then render the below thing
					otherwise don't render it



			*/}
			{ this.state.showAnswerBox ? 
				<div className="answer-box">
					Answer box here 
				</div> : ''
			}
			</div>


			
		);
	}
} 