import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getContent } from '../../actions';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';


import Title from '../../tools/title';
import Content from '../../tools/content';

class Home extends Component  {

  constructor(props) {
    super(props);
    props.dispatch(getContent('home'));
  }

  render() {

    return (
  		<div className="main">
        <div className="menu">
          <ButtonGroup variant="contained" color="primary" aria-label="text primary button group">
            <Button href="/contact">
              Contact
            </Button>
            <Button href="/about">
              about
            </Button>
          </ButtonGroup>
        </div>
        <Title placeholders={this.props.placeholders}/>
        <Content placeholders={this.props.placeholders}/>
  		</div>
  	)
  }
}

export function mapStateToProps(state) {
  return {
    placeholders: state.placeHolders.placeholders
  }
}

export default connect(mapStateToProps)(Home);
