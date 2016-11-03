import React, { Component } from 'react';
import theRiddleContainer, { Riddle } from '../components/Riddle.jsx';

import RiddleList from './RiddleList.jsx';

export default class RiddlePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortorder: -1,
      sortby: "submitted"
    };
  }

	handleSort(type){
  	this.setState({
  		sortorder: ((this.state.sortorder) * -1),
  		sortby: type,
  	});
	}

	render() {
		// console.log("yo this user is ");
		// console.log(this.props.thisuser);
		return (
			<div>
					<div>Sort by...
						<a className="sort-button" onClick={this.handleSort.bind(this, "submitted") } >
							Post Date
						</a>  or  <a className="sort-button" onClick={this.handleSort.bind(this, "upvotes") } >
						Upvotes 
						</a>			
					</div>		
	  		<RiddleList sortorder={ this.state.sortorder } sortby={ this.state.sortby } riddles={ this.props.riddles } />
			</div>
		);
	}
};


RiddlePage.propTypes = {
	//riddles: React.PropTypes.array.isRequired,
}
