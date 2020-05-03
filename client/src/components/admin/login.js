import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions';

class Login extends Component {

	constructor(props) {
    super(props);

    this.state = {
      email: '',
			password: ''
    }
  }
	inputEmailHandler = (e) => {
		this.setState({email: e.target.value})
	}

	inputPasswordHandler = (e) => {
		this.setState({password: e.target.value})
	}

	submitForm = (e) => {
		e.preventDefault();
		this.props.dispatch(login(this.state))

	}
	render() {
		return (
			<div>
				<form onSubmit={this.submitForm}>
					<div className="form-inner">
						<h1>Login</h1>
						<input type="email" placeholder="Enter Email" onBlur={this.inputEmailHandler} />
						<input type="password" placeholder="Enter password" onBlur={this.inputPasswordHandler} />
						<button type="submit">Submit</button>
					</div>
				</form>
			</div>
		)
	}
}

export function mapStateToProps(state) {
  return {
    login: state.user.login,
  }
}

export default connect(mapStateToProps)(Login);
