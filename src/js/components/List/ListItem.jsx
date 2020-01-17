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
		//e.preventDefault();

		this.setState(prevState => ({
		  open: !prevState.open
		}));
	}

	render(){
		let listClass = `list-item${this.state.open ? ' active' : ''}`
		return (
			<li id={this.props.property} className={listClass}>
				<a href={`#${this.props.property}`} className="list-item__title" onClick={this.toggleContent}>{this.props.property}</a>
				<ul className="list-item__content">
				{this.props.specs.map((i, index) => 
					<li className={`spec spec--${i.status.toLowerCase()}`} key={index.toString()}>
						<a href={i.url} target="_blank">
							<p className="spec__title">{i.title}</p>
							<p className="spec__status">{i.status}</p>
						</a>
					</li>
				)}
				</ul>
			</li>
		);
	}
}
