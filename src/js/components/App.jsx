import React, {Component} from 'react';
import {List} from './List/List.jsx';
import {Input} from './Form/Input.jsx';
import {Loading} from './Util/Loading.jsx';
import {Message} from './Util/Message.jsx';
import {Byline} from './Util/Byline.jsx';

const ENDPOINT = 'https://ibxtm1ckej.execute-api.us-east-2.amazonaws.com/prod';

class App extends Component {

	constructor(props){
		super(props);

		this.state = {
			
		}

		this.doFetch = this.doFetch.bind(this);
		this.updateResults = this.updateResults.bind(this);
	}

	componentDidMount(){
		//trigger it when the component mounts
		{this.doFetch()} 
	}

	doFetch(value){
		//set the fetching state to true
		this.setState({
			fetching: true,
			error: undefined
		}, () => {

			//set state callback
			//perform the fetch and store the results in state
			fetch(ENDPOINT)
				.then((response) => {
					if (!response.ok) {
						throw Error(response.statusText);
					} 
					return response.json();
				})
				.then(json => {
					let data = json;

					//create object of objects, key = property name
					//push each instance of property name into array
					let groupedby = data.reduce(function (obj, item) {
					    obj[item.property] = obj[item.property] || [];
					    obj[item.property].push({
					    	status: item.status,
					    	url: item.url,
					    	title: item.title
					    });
					    return obj;
					}, {});

					//map obj to array of objects
					data = Object.keys(groupedby).map(property => ({
					  property: property,
					  specs: groupedby[property]
					}));

					this.setState({
						fetching: false,
						error: undefined,
						data: data,
						filtered: data,
						count: data.length
					});
				})
				.catch(error => {				
					this.setState({
						fetching: false,
						error: error
					});
				});
		});
	}

	updateResults(value){
		//TODO - make this toggle-able? 
		//filter out the results based on the value on change
		let filtered;

		value = value.toLowerCase();

		if (this.state.data.some(e => e.property === value)) {
			//if the value is an exact match, like "flex", only return "flex"
			filtered = this.state.data.filter(i => i.property == value);
		} else {
			//if there's no exact match, show everything that contains the word "flex"
			filtered = this.state.data.filter(i => i.property.includes(value));
		}

		//update the state of the filtered data results
		this.setState({ filtered: filtered });
	}

	render(){
		return ([
			<Byline key={0} />,
			<div className="app" key={1}>
				<div className="app__header">
					<h1 className="app__title">CSS Props</h1>
					<p className="app__description">A filterable list of all {this.state.count} CSS properties, with link references to their relevant specs.</p>
				</div>
				{this.state.fetching == false ? (
					<div className="app__content">
						{ this.state.error ? (
							<Message title="Woops" message={this.state.error} />
						) : ([
					    	<Input placeholder="Filter by property, e.g., border" handleInputValue={this.updateResults} key={0} />,
							<List data={this.state.filtered} key={1} />	
						])}
					</div>
				) : (
					<Loading text="Fetching properties" />
				)}	
			</div>
		]);
	}
}

export default App;
