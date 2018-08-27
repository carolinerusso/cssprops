import React, {Component} from 'react';
import {ListItem} from './ListItem.jsx';

export class List extends Component {
	
	render(){

		let array = this.props.data;

		//create object of objects, key = property name
		//push each instance of property name into array
		let groupedby = array.reduce(function (obj, item) {
		    obj[item.property] = obj[item.property] || [];
		    obj[item.property].push({
		    	status: item.status,
		    	url: item.url,
		    	title: item.title
		    });
		    return obj;
		}, {});

		//map obj to array of objects
		let groups = Object.keys(groupedby).map(property => ({
		  property: property,
		  specs: groupedby[property]
		}));

		return (
			<ul>
			{groups.map((obj, i) => 
				<ListItem property={obj.property} specs={obj.specs} key={i.toString()} match={this.props.exactMatch} />
			)}
			</ul>
		);
	}
}
