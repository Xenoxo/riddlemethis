import React, { Component } from 'react';
import theRiddleContainer, { Riddle } from '../components/Riddle.jsx';

import RiddleListContainer from './RiddleListContainer.jsx';

export default class RiddlePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortorder: -1,
      sortby: "submitted"
    };
  }

	handleSort(type){
		console.log(type);
  	this.setState({
  		sortorder: ((this.state.sortorder) * -1),
  		sortby: type,
  	});
	}

	render() {
		return (
			<div>
					<div>Sort by...
						<a className="sort-button" onClick={this.handleSort.bind(this, "submitted") } >
							Post Date
						</a>  or  <a className="sort-button" onClick={this.handleSort.bind(this, "upvotes") } >
						Upvotes 
						</a>			
					</div>		
	  		<RiddleListContainer sortorder={ this.state.sortorder } sortby={ this.state.sortby }/>
			</div>
		);
	}
};


RiddlePage.propTypes = {
	//riddles: React.PropTypes.array.isRequired,
}
