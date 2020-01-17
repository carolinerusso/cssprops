import React, {Component} from 'react';

export class Input extends Component {
	constructor(props){
		super(props);

		this.state = {
			value: ''
		}

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		this.setState({
			value: e.target.value
		}, () => { 

			//push this value to GTM
			dataLayer.push({'inputValue': this.state.value });

			//pass the state upstream
			this.props.handleInputValue(this.state.value, 'property');
		});
	}

	render(){
		return (
			<input className="input" placeholder={this.props.placeholder} type="text" value={this.state.value} onChange={this.handleChange}  />
		);
	}
}
