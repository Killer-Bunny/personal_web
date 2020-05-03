import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getDetails } from '../../actions';

class Details extends Component {
	constructor(props) {
		super(props);

		props.dispatch(getDetails())
	}

	displayDetails = (contact) => {
		console.log(contact)
		return contact ?
				contact.details.map(item => (this.displayUl(item)))
		:null
	}

	displayUl = (item) => {
		return (
				<ul className="vertul" key={item._id}>
					<li className="bulletless">
						{`${item.email} ${item.phone} ${item.content}`}
					</li>
				</ul>
		)
	}

	render() {
		console.log(this.props)
		return (
			<div>
				{this.displayDetails(this.props.contact)}
			</div>
		)
	}
}


export function mapStateToProps(state) {
  return {
    contact: state.contact.contact
  }
}


export default connect(mapStateToProps)(Details);
