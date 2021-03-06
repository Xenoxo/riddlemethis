import React, { Component } from 'react';

import RiddleListContainer from '../components/riddlelist/RiddleListContainer.jsx';

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
		return (
			<div>
          <div className="splash-text">
            <h2 className="header-text">riddle me this</h2>
          </div>			
					<div className="sort-container">
						<p>Sort by <a className="sort-button" onClick={this.handleSort.bind(this, "submitted") } >Post Date
							</a>  or  <a className="sort-button" onClick={this.handleSort.bind(this, "upvotes") } >
								Upvotes
							</a>
						</p>
					</div>		
	  		<RiddleListContainer sortorder={ this.state.sortorder } sortby={ this.state.sortby } riddles={ this.props.riddles } />
			</div>
		);
	}
};


RiddlePage.propTypes = {
	//riddles: React.PropTypes.array.isRequired,
}
