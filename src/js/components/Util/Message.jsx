import React, {Component} from 'react';

export class Message extends Component {
	render(){
		return (
			<div className="message">
				<h1>{this.props.title}</h1>
				{this.props.message && 
					<p>{this.props.message}</p>
				}
			</div>
		);
	}
}