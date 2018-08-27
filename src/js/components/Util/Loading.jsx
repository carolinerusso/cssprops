import React, {Component} from 'react';

export class Loading extends Component {
	render(){
		return (
			<p className="loading">{this.props.text}<span>.</span><span>.</span><span>.</span></p>
		);
	}
}
