import React from 'react'
import { render } from 'react-dom'

import Home from './components/HomeComponent';


//FIXME: Shouldn't require this after REACT V1 is released!
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

render((
  <Home />
), document.getElementById('my-component'))
