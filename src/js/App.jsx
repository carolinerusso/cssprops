import React, {Component} from 'react';
import {List} from './List/List.jsx';
import {Input} from './Form/Input.jsx';
import {Loading} from './Util/Loading.jsx';
import {Message} from './Util/Message.jsx';

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

					this.setState({
						fetching: false,
						error: undefined,
						data: data,
						filtered: data
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
		return (
			<div>
				<div className="app__header">
					<h1 className="app__title">CSS Props</h1>
					<p className="app__description">A filterable list of all CSS properties, with link references to their relevant specs.</p> 
					<p className="app__byline">Data from <a href="https://www.w3.org/Style/CSS/all-properties" target="_blank">W3C</a>, with help from <a href="https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-create-api-step-by-step.html" target="_blank">AWS API Gateway</a>, React, and Webpack. View <a href="https://github.com/carolinerusso/cssprops" target="_blank">source</a> <span role="img" aria-label="woman technologist">👩‍💻</span>.</p>
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
		);
	}
}

export default App;
