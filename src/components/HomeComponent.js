import React from 'react'
import { findDOMNode } from 'react-dom';

import '../css/app-styles.css'

class Home extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
    }

    this.myFunction();

    console.log("Home constructor this.props: ", this.props);
  }

  componentWillMount() {
    console.log("Home componentWillMount()");
  }

  componentDidMount() {
    console.log("Home componentDidMount()");
  }

  componentWillUnmount() {
    console.log("Home componentWillUnmount()");
  }

  render() {
    console.log("Home render()", this.state);

    return (

      <div>
        <h1>React Webpack Boilerplate</h1>
      </div>
    )
  }

  myFunction() {
    console.log("Home myFunction()");
  }

}

export default Home