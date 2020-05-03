import React, { Component } from 'react';
import { auth } from '../actions';
import {connect} from 'react-redux';

export default function(ComposedClass,reload){

  class AuthenticationCheck extends Component {


    constructor(props) {
      super(props);
      this.state = {
        loading: true
      }
      props.dispatch(auth())
    }

    UNSAFE_componentWillReceiveProps(nextProps){
      this.setState({loading:false})

      if(!nextProps.user.login.isAuth){
        if(reload){
            this.props.history.push('/login');
        }
      } else {
        if(reload === false) {
            this.props.history.push('/details')
        }
      }
    }

    render() {
      if(this.state.loading){
        return <div className="loader">Loading...</div>
      }

      return(
        <ComposedClass {...this.props} user={this.props.user}/>
      )
    }
  }
  function mapStateToProps(state){
    return{
      user: state.user
    }
  }
  return connect(mapStateToProps)(AuthenticationCheck)
}
