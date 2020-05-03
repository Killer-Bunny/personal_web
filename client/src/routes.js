import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Auth from './hoc/auth';
import Layout from './hoc/layout';
import Home from './components/home';
import Contact from './components/contact';
import About from './components/about';
import Login from './components/admin/login';
import Details from './components/admin/details';


const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/contact" exact component={Contact} />
        <Route path="/about" exact component={About} />
        <Route path="/login" exact component={Auth(Login, false)} />
        <Route path="/details" exact component={Auth(Details, true)} />
      </Switch>
    </Layout>
  )
}


export default Routes;
