import React, {Component} from 'react';
import {ListItem} from './ListItem.jsx';

export class List extends Component {
	render(){
		return (
			<ul>
			{this.props.data.map((obj, i) => 
				<ListItem property={obj.property} specs={obj.specs} key={i.toString()} />
			)}
			</ul>
		);
	}
}
