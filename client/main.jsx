import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

// import '../imports/ui/body';
import App from '../imports/ui/App.jsx';

Meteor.startup(() => {
  render(<App />, document.getElementById('root'));
});