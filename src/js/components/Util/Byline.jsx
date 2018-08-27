import React, {Component} from 'react';

export class Byline extends Component {
	
	constructor(props){
		super(props);

		this.state = {
			open: true
		}

		this.toggleClick = this.toggleClick.bind(this);
	}

	toggleClick(e){
		e.preventDefault();

		this.setState(prevState => ({
		  open: !prevState.open
		}));
	}

	render(){
		return (
			<div className={`byline ${this.state.open ? 'active' : ''}`}>
				{this.state.open && 
					<p className="byline__content">Data from <a href="https://www.w3.org/Style/CSS/all-properties" target="_blank">W3C</a>, with help from <a href="https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-create-api-step-by-step.html" target="_blank">AWS API Gateway</a>, React, and Webpack. View <a href="https://github.com/carolinerusso/cssprops" target="_blank">source</a>.</p>
				}
				<a className="byline__trigger" onClick={this.toggleClick}></a>
			</div>
		);
	}
}
