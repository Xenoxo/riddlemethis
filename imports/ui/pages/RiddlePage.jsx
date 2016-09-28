import React, { Component } from 'react';
import Riddle from '../components/Riddle.jsx';
import { Link } from 'react-router';
import RiddleListContainer from './RiddleListContainer.jsx';

export default class RiddlePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortorder: -1,
      sortby: "submitted",
      postlimit: 5,
    };
  }

  componentDidMount(){
  	 // console.log(this.props.params.postlimit);
  }

  componentWillReceiveProps(){
  	console.log("from CWRP "+this.props.params.postlimit);
  	let newlimit = parseInt(this.props.params.postlimit);
  	if (this.props.params.postlimit !== undefined ){
  		this.setState({
	  		postlimit: newlimit,
  		});
  	}
  }


	// componentWillUpdate(){
 //  	console.log("from Com Will Up "+this.props.params.postlimit);
	// }

	handleSort(type){ //passes in either 'submitted' or 'upvotes'
  	this.setState({
  		sortorder: ((this.state.sortorder) * -1),
  		sortby: type,
  	});
	}

	handlePagination(){
		if ( this.props.params.postlimit === undefined ){
			return '/1';
		} else {
			return ('/'+this.props.params.postlimit);
		}
	}

	render() {
		return (
			<div>
					<div>Sort by...
						<a className="sortButton" onClick={this.handleSort.bind(this, "submitted") } >
							Post Date
						</a>  or  <a className="sortButton" onClick={this.handleSort.bind(this, "upvotes") } >
						Upvotes 
						</a>			
					</div>		
	  		<RiddleListContainer 
	  			sortorder={ this.state.sortorder }
	  			sortby={ this.state.sortby }
	  			postlimit= { this.state.postlimit }
	  		/>
	  		<Link to={'/9'}>Show More</Link>
			</div>
		);
	}
};


RiddlePage.propTypes = {
	//riddles: React.PropTypes.array.isRequired,
}
