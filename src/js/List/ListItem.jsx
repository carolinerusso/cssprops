import React, {Component} from 'react';

export class ListItem extends Component {

	constructor(props){
		super(props);

		this.state = {
			open: false
		}

		this.toggleContent = this.toggleContent.bind(this);
	}

	toggleContent(e){
		e.preventDefault();

		this.setState(prevState => ({
		  open: !prevState.open
		}));
	}

	render(){
		return (
			<li className={`list-item ${this.state.open ? 'active' : ''}`}>
				<a className="list-item__title" onClick={this.toggleContent}>{this.props.property}</a>
				<ul className="list-item__content">
				{this.props.specs.map((i, index) => 
					<li className={`spec spec--${i.status.toLowerCase()}`} key={index.toString()}>
						<p className="spec__title"><a href={i.url} target="_blank">{i.title}</a></p>
						<p className="spec__status">{i.status}</p>
					</li>
				)}
				</ul>
			</li>
		);
	}
}
