import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';
import Main from '../components/Main';
import Sub from '../components/Sub';

class App extends Component{

  render(){
    return(
      <Fragment>
        <Route exact path="/" component={Main} />
        <Route exact path="/Sub" component={Sub}/>
      </Fragment>
    )
  }
}

export default App;
