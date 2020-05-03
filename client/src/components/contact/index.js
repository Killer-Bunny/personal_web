import React, { Component } from 'react';
import { connect } from 'react-redux';
import validator from 'validator';
import { getContent, submitDetails } from '../../actions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

import Title from '../../tools/title';
import Content from '../../tools/content';


class Contact extends Component {

  constructor(props) {
    super(props);
    props.dispatch(getContent('contact'));
    this.state = {
      email: '',
      phone: '',
      content: '',
      fields: {},
      sentForm: false,
      valid: false,
      formIsValid: false,
      error: '',
      validPhone: false,
      validEmail: false
    }
  }

  submitForm = (e) => {
    e.preventDefault();
    if(this.state.valid) {
      if(this.state.sentForm) {
        this.setState({valid:false, error: 'Contact request was already sent'})
      } else if(this.state.valid) {
        this.props.dispatch(submitDetails({
          email: this.state.email,
          phone: this.state.phone,
          content: this.state.content
        }))
        this.setState({sentForm: true})
      }
    } else {
      this.setState({
        error: 'Email or phone number are not valid'
      })
    }
  }
  inputEmailHandler = (event) => {
    //let testEmail =  new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g)
    if(!validator.isEmail(event.target.value)) {
      this.setState({
        validEmail: false,
        error: 'Invalid Email address'
      })
    } else {
      this.setState({
        validEmail: true,
        error: ''
      })
      this.validForm();
    }
    //console.log(validator.isEmail(event.target.value))
  }

  inputPhoneHandler = (event) => {
    //this.setState({phone: event.target.value})
    console.log(validator.isMobilePhone(event.target.value))
    if(!validator.isMobilePhone(event.target.value)) {
      this.setState({
        validPhone: false,
        error: 'Invalid phone number'
      })
    } else {
      this.setState({
        validPhone: true,
        error: ''
      })
      this.validForm();
    }
  }

  validForm = () => {
    if(this.state.validPhone && this.state.validEmail)
      this.setState({
        valid: true
      })
  }

  inputRequestHandler = (event) => {
    this.setState({content: event.target.value})
  }

  displaySuccess = (contact) => (

    contact ?
      <div className="respons_cn">Sent</div>
    :null
  )

	render() {
		return (
			<div className="container">
        <form onSubmit={this.submitForm}>
          <div className="form-inner">
            <div>
              <Title placeholders={this.props.placeholders}/>
              <Content placeholders={this.props.placeholders}/>
            </div>
            <div className="input_cont">
              <TextField type="email" className="input" id="outlined-basic" label="Email" variant="outlined" onBlur={this.inputEmailHandler} />
            </div>
            <div className="input_cont">
              <TextField className="input" id="outlined-basic" label="Phone" variant="outlined" onBlur={this.inputPhoneHandler} />
            </div>
            <div className="input_cont">
              <TextareaAutosize aria-label="minimum height" rowsMin={3} placeholder="Message" className="textArea input" />
            </div>
            <Button type="submit" variant="contained" color="primary">Submit</Button>
          </div>
          {this.displaySuccess(this.props.contact)}
          <div>
            {
              !this.state.valid ?
                <div>{this.state.error}</div>
              :null
            }
          </div>
        </form>
			</div>
		)
	}
}

export function mapStateToProps(state) {
  return {
    placeholders: state.placeHolders.placeholders,
    contact: state.contact.contact
  }
}

export default connect(mapStateToProps)(Contact);
